import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_DELIVERY_PARTNERS,
  INITIAL_COUPONS,
  INITIAL_CUSTOMER,
  INITIAL_ORDERS,
  ORDER_STAGES
} from '../mock/initialData';

const AppContext = createContext();

const STORAGE_KEYS = {
  PRODUCTS: 'lax360_rn_products',
  ORDERS: 'lax360_rn_orders',
  CART: 'lax360_rn_cart',
  CUSTOMER: 'lax360_rn_customer'
};

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [partners, setPartners] = useState(INITIAL_DELIVERY_PARTNERS);
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER);

  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [deliveryTip, setDeliveryTip] = useState(20);
  const [deliveryInstructions, setDeliveryInstructions] = useState('Ring bell and leave at door');
  const [selectedAddress, setSelectedAddress] = useState(INITIAL_CUSTOMER.addresses[0]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Load from AsyncStorage on mount
  useEffect(() => {
    const loadStored = async () => {
      try {
        const storedOrders = await AsyncStorage.getItem(STORAGE_KEYS.ORDERS);
        if (storedOrders) setOrders(JSON.parse(storedOrders));

        const storedCart = await AsyncStorage.getItem(STORAGE_KEYS.CART);
        if (storedCart) setCart(JSON.parse(storedCart));

        const storedProds = await AsyncStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (storedProds) setProducts(JSON.parse(storedProds));
      } catch (e) {
        console.warn('AsyncStorage load error:', e);
      }
    };
    loadStored();
  }, []);

  // Save changes
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders)).catch(() => {});
  }, [orders]);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart)).catch(() => {});
  }, [cart]);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products)).catch(() => {});
  }, [products]);

  // Cart operations
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + qty;
        if (newQty <= 0) return prev.filter(item => item.product.id !== product.id);
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: newQty } : item);
      }
      return [...prev, { product, quantity: Math.max(1, qty) }];
    });
  };

  const updateCartQuantity = (productId, qty) => {
    setCart(prev => {
      if (qty <= 0) return prev.filter(item => item.product.id !== productId);
      return prev.map(item => item.product.id === productId ? { ...item, quantity: qty } : item);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart Totals calculation
  const getCartTotals = useCallback(() => {
    const itemsTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const totalOriginalMrp = cart.reduce((sum, item) => sum + (item.product.mrp * item.quantity), 0);
    const productSavings = Math.max(0, totalOriginalMrp - itemsTotal);

    let couponDiscount = 0;
    if (appliedCoupon && itemsTotal >= appliedCoupon.minOrderValue) {
      if (appliedCoupon.discountType === 'flat') {
        couponDiscount = appliedCoupon.discountValue;
      } else if (appliedCoupon.discountType === 'percentage') {
        couponDiscount = (itemsTotal * appliedCoupon.discountValue) / 100;
      }
    }

    const freeDeliveryThreshold = 199;
    const isFreeDelivery = itemsTotal >= freeDeliveryThreshold || appliedCoupon?.code === 'FREEDEL';
    const deliveryFee = itemsTotal === 0 ? 0 : (isFreeDelivery ? 0 : 25);
    const handlingFee = itemsTotal === 0 ? 0 : 5;
    const tip = itemsTotal === 0 ? 0 : deliveryTip;

    const grandTotal = Math.max(0, Math.round(itemsTotal - couponDiscount + deliveryFee + handlingFee + tip));

    return {
      itemsTotal,
      totalOriginalMrp,
      productSavings,
      couponDiscount,
      deliveryFee,
      handlingFee,
      tip,
      grandTotal,
      freeDeliveryThreshold,
      amountNeededForFreeDelivery: Math.max(0, freeDeliveryThreshold - itemsTotal),
      itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    };
  }, [cart, appliedCoupon, deliveryTip]);

  const applyCoupon = (code) => {
    const match = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (!match) return { success: false, message: 'Invalid coupon' };
    setAppliedCoupon(match);
    return { success: true, message: 'Coupon applied!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Order creation
  const createOrder = (orderOptions = {}) => {
    const totals = getCartTotals();
    const orderId = `LX-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();

    const newOrder = {
      id: orderId,
      createdAt: now.toISOString(),
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email
      },
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        unit: item.product.unit,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      })),
      deliveryAddress: selectedAddress || customer.addresses[0],
      deliveryPartner: partners[0],
      status: 'Placed',
      paymentMethod: orderOptions.paymentMethod || 'UPI (Instant)',
      paymentStatus: 'Paid',
      billSummary: {
        itemsTotal: totals.itemsTotal,
        deliveryFee: totals.deliveryFee,
        handlingFee: totals.handlingFee,
        tip: totals.tip,
        discount: totals.couponDiscount,
        couponCode: appliedCoupon ? appliedCoupon.code : null,
        grandTotal: totals.grandTotal
      },
      deliveryInstructions: deliveryInstructions,
      estimatedDeliveryTime: 'Arriving in 10-12 mins',
      trackingSimulation: {
        progress: 5,
        etaMinutes: 11,
        currentStreet: 'LAX Dark Store 01 (Bandra West Fulfillment Center)',
        isPlaying: true
      },
      timeline: [
        { status: 'Placed', timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
        { status: 'Confirmed', timestamp: 'Pending', done: false },
        { status: 'Preparing', timestamp: 'Pending', done: false },
        { status: 'Packed', timestamp: 'Pending', done: false },
        { status: 'Ready for Pickup', timestamp: 'Pending', done: false },
        { status: 'Partner Assigned', timestamp: 'Pending', done: false },
        { status: 'Picked Up', timestamp: 'Pending', done: false },
        { status: 'Out for Delivery', timestamp: 'Pending', done: false },
        { status: 'Delivered', timestamp: 'Pending', done: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const stageIndex = ORDER_STAGES.indexOf(newStatus);
      const updatedTimeline = order.timeline.map((step, idx) => {
        if (idx <= stageIndex) {
          return { ...step, done: true, timestamp: step.timestamp === 'Pending' ? nowTime : step.timestamp };
        }
        return { ...step, done: false, timestamp: 'Pending' };
      });

      return {
        ...order,
        status: newStatus,
        timeline: updatedTimeline,
        trackingSimulation: {
          ...order.trackingSimulation,
          progress: newStatus === 'Delivered' ? 100 : newStatus === 'Out for Delivery' ? 75 : 30,
          etaMinutes: newStatus === 'Delivered' ? 0 : 4,
          isPlaying: newStatus !== 'Delivered' && newStatus !== 'Cancelled'
        }
      };
    }));
  };

  const stepSimulation = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const nextProg = Math.min(100, (order.trackingSimulation?.progress || 0) + 20);
    const isDone = nextProg >= 100;

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: isDone ? 'Delivered' : nextProg > 60 ? 'Out for Delivery' : o.status,
          trackingSimulation: {
            ...o.trackingSimulation,
            progress: nextProg,
            etaMinutes: Math.max(0, Math.ceil((100 - nextProg) / 10)),
            isPlaying: !isDone
          }
        };
      }
      return o;
    }));
  };

  const toggleSimulationPlay = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          trackingSimulation: {
            ...o.trackingSimulation,
            isPlaying: !o.trackingSimulation.isPlaying
          }
        };
      }
      return o;
    }));
  };

  const resetOrderSimulation = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Out for Delivery',
          trackingSimulation: {
            ...o.trackingSimulation,
            progress: 30,
            etaMinutes: 8,
            isPlaying: true
          }
        };
      }
      return o;
    }));
  };

  // Background simulation ticker for mobile app
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => {
        let changed = false;
        const updated = prev.map(order => {
          if (order.status !== 'Delivered' && order.status !== 'Cancelled' && order.trackingSimulation?.isPlaying) {
            changed = true;
            const nextProg = Math.min(100, (order.trackingSimulation.progress || 0) + 2);
            return {
              ...order,
              status: nextProg >= 100 ? 'Delivered' : order.status,
              trackingSimulation: {
                ...order.trackingSimulation,
                progress: nextProg,
                etaMinutes: Math.max(0, Math.ceil((100 - nextProg) / 10)),
                isPlaying: nextProg < 100
              }
            };
          }
          return order;
        });
        return changed ? updated : prev;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const resetAllDemoData = async () => {
    try {
      await AsyncStorage.clear();
      setProducts(INITIAL_PRODUCTS);
      setCategories(INITIAL_CATEGORIES);
      setOrders(INITIAL_ORDERS);
      setPartners(INITIAL_DELIVERY_PARTNERS);
      setCoupons(INITIAL_COUPONS);
      setCustomer(INITIAL_CUSTOMER);
      setCart([]);
      setAppliedCoupon(null);
    } catch (e) {
      console.warn('AsyncStorage clear error:', e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        orders,
        partners,
        coupons,
        customer,
        cart,
        appliedCoupon,
        deliveryTip,
        setDeliveryTip,
        deliveryInstructions,
        setDeliveryInstructions,
        selectedAddress,
        setSelectedAddress,
        isAuthenticated,
        setIsAuthenticated,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        getCartTotals,
        applyCoupon,
        removeCoupon,
        createOrder,
        updateOrderStatus,
        stepSimulation,
        toggleSimulationPlay,
        resetOrderSimulation,
        resetAllDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
