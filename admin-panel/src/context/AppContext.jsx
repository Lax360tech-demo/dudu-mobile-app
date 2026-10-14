import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
  PRODUCTS: 'lax360_products',
  CATEGORIES: 'lax360_categories',
  ORDERS: 'lax360_orders',
  PARTNERS: 'lax360_partners',
  COUPONS: 'lax360_coupons',
  CUSTOMER: 'lax360_customer',
  CART: 'lax360_cart',
  ADMIN_AUTH: 'lax360_admin_auth',
  CUST_AUTH: 'lax360_cust_auth',
  PHONE_FRAME: 'lax360_phone_frame'
};

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error('Storage read error:', e);
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error:', e);
  }
};

export const AppProvider = ({ children }) => {
  // State initialization
  const [products, setProducts] = useState(() => getStored(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS));
  const [categories, setCategories] = useState(() => getStored(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES));
  const [orders, setOrders] = useState(() => getStored(STORAGE_KEYS.ORDERS, INITIAL_ORDERS));
  const [partners, setPartners] = useState(() => getStored(STORAGE_KEYS.PARTNERS, INITIAL_DELIVERY_PARTNERS));
  const [coupons, setCoupons] = useState(() => getStored(STORAGE_KEYS.COUPONS, INITIAL_COUPONS));
  const [customer, setCustomer] = useState(() => getStored(STORAGE_KEYS.CUSTOMER, INITIAL_CUSTOMER));
  
  // Cart state
  const [cart, setCart] = useState(() => getStored(STORAGE_KEYS.CART, []));
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [deliveryTip, setDeliveryTip] = useState(20);
  const [deliveryInstructions, setDeliveryInstructions] = useState('Ring bell and leave at doorstep');
  const [selectedAddress, setSelectedAddress] = useState(() => {
    const cust = getStored(STORAGE_KEYS.CUSTOMER, INITIAL_CUSTOMER);
    return cust.addresses.find(a => a.isDefault) || cust.addresses[0];
  });

  // Auth states
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => getStored(STORAGE_KEYS.ADMIN_AUTH, true));
  const [isCustomerAuthenticated, setIsCustomerAuthenticated] = useState(() => getStored(STORAGE_KEYS.CUST_AUTH, true));
  
  // UI Presentation Settings
  const [isPhoneFrame, setIsPhoneFrame] = useState(() => getStored(STORAGE_KEYS.PHONE_FRAME, true));
  const [simulationSpeed, setSimulationSpeed] = useState(1); // 1x, 2x, 5x

  // Sync to localStorage
  useEffect(() => { setStored(STORAGE_KEYS.PRODUCTS, products); }, [products]);
  useEffect(() => { setStored(STORAGE_KEYS.CATEGORIES, categories); }, [categories]);
  useEffect(() => { setStored(STORAGE_KEYS.ORDERS, orders); }, [orders]);
  useEffect(() => { setStored(STORAGE_KEYS.PARTNERS, partners); }, [partners]);
  useEffect(() => { setStored(STORAGE_KEYS.COUPONS, coupons); }, [coupons]);
  useEffect(() => { setStored(STORAGE_KEYS.CUSTOMER, customer); }, [customer]);
  useEffect(() => { setStored(STORAGE_KEYS.CART, cart); }, [cart]);
  useEffect(() => { setStored(STORAGE_KEYS.ADMIN_AUTH, isAdminAuthenticated); }, [isAdminAuthenticated]);
  useEffect(() => { setStored(STORAGE_KEYS.CUST_AUTH, isCustomerAuthenticated); }, [isCustomerAuthenticated]);
  useEffect(() => { setStored(STORAGE_KEYS.PHONE_FRAME, isPhoneFrame); }, [isPhoneFrame]);

  // Product management actions
  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: `prod-${Date.now().toString().slice(-4)}`,
      rating: 4.8,
      ratingCount: 1,
      stock: parseInt(newProduct.stock, 10) || 10,
      price: parseFloat(newProduct.price) || 99,
      mrp: parseFloat(newProduct.mrp) || 120,
      discountPercent: Math.round(((newProduct.mrp - newProduct.price) / newProduct.mrp) * 100) || 10
    };
    setProducts(prev => [product, ...prev]);
    return product;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const merged = { ...p, ...updatedFields };
        if (updatedFields.price !== undefined || updatedFields.mrp !== undefined) {
          const price = parseFloat(merged.price);
          const mrp = parseFloat(merged.mrp);
          merged.discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
        }
        return merged;
      }
      return p;
    }));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, stock: Math.max(0, parseInt(newStock, 10)) } : p)));
  };

  // Category management
  const addCategory = (categoryData) => {
    const newCat = {
      ...categoryData,
      id: `cat-${Date.now().toString().slice(-4)}`,
      itemCount: 0,
      isActive: true
    };
    setCategories(prev => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = (id, fields) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...fields } : c)));
  };

  const toggleCategoryActive = (id) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
  };

  // Cart operations
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + qty;
        if (newQty <= 0) {
          return prev.filter(item => item.product.id !== product.id);
        }
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: newQty } : item);
      }
      return [...prev, { product, quantity: Math.max(1, qty) }];
    });
  };

  const updateCartQuantity = (productId, qty) => {
    setCart(prev => {
      if (qty <= 0) {
        return prev.filter(item => item.product.id !== productId);
      }
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
        const calculated = (itemsTotal * appliedCoupon.discountValue) / 100;
        couponDiscount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
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

  // Coupon application
  const applyCoupon = (code) => {
    const match = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (!match) {
      return { success: false, message: 'Invalid or inactive coupon code.' };
    }
    const { itemsTotal } = getCartTotals();
    if (itemsTotal < match.minOrderValue) {
      return { success: false, message: `Minimum cart value of ₹${match.minOrderValue} required for this coupon.` };
    }
    setAppliedCoupon(match);
    return { success: true, message: `Coupon ${match.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Order creation and lifecycle
  const createOrder = (orderOptions = {}) => {
    const totals = getCartTotals();
    const orderId = `LX-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();

    // Default assigned partner
    const assignedPartner = partners[0];

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
      deliveryPartner: assignedPartner,
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
        distanceRemainingKm: 1.8,
        isPlaying: true,
        speed: 1
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

    // Deduct stock for ordered items
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(ci => ci.product.id === p.id);
      if (cartItem) {
        return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
      }
      return p;
    }));

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
          return {
            ...step,
            done: true,
            timestamp: step.timestamp === 'Pending' ? nowTime : step.timestamp
          };
        }
        return { ...step, done: false, timestamp: 'Pending' };
      });

      let simProgress = order.trackingSimulation.progress;
      let eta = order.trackingSimulation.etaMinutes;
      let street = order.trackingSimulation.currentStreet;

      if (newStatus === 'Placed') { simProgress = 5; eta = 12; street = 'Order received at Dark Store'; }
      else if (newStatus === 'Confirmed') { simProgress = 15; eta = 11; street = 'Fulfillment station assigned'; }
      else if (newStatus === 'Preparing') { simProgress = 25; eta = 10; street = 'Store team picking & scanning items'; }
      else if (newStatus === 'Packed') { simProgress = 40; eta = 8; street = 'Packed in thermal insulated bag'; }
      else if (newStatus === 'Ready for Pickup') { simProgress = 50; eta = 7; street = 'Waiting at dispatch dock'; }
      else if (newStatus === 'Partner Assigned') { simProgress = 55; eta = 6; street = 'Partner arriving at dock'; }
      else if (newStatus === 'Picked Up') { simProgress = 65; eta = 5; street = 'Bag collected, exiting facility'; }
      else if (newStatus === 'Out for Delivery') { simProgress = 75; eta = 3; street = 'En route on Linking Road'; }
      else if (newStatus === 'Delivered') { simProgress = 100; eta = 0; street = 'Delivered at customer address'; }

      return {
        ...order,
        status: newStatus,
        timeline: updatedTimeline,
        trackingSimulation: {
          ...order.trackingSimulation,
          progress: simProgress,
          etaMinutes: eta,
          currentStreet: street,
          isPlaying: newStatus !== 'Delivered' && newStatus !== 'Cancelled'
        }
      };
    }));
  };

  const assignDeliveryPartner = (orderId, partnerId) => {
    const partner = partners.find(p => p.id === partnerId);
    if (!partner) return;

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          deliveryPartner: partner,
          status: order.status === 'Placed' || order.status === 'Preparing' || order.status === 'Packed'
            ? 'Partner Assigned'
            : order.status
        };
      }
      return order;
    }));
  };

  const cancelOrder = (orderId, reason = 'Cancelled by Customer') => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: 'Cancelled',
          cancelReason: reason,
          trackingSimulation: {
            ...order.trackingSimulation,
            isPlaying: false,
            currentStreet: 'Order delivery cancelled'
          }
        };
      }
      return order;
    }));
  };

  // Controllable tracking simulation runner
  const updateOrderTracking = (orderId, trackingUpdates) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          trackingSimulation: {
            ...order.trackingSimulation,
            ...trackingUpdates
          }
        };
      }
      return order;
    }));
  };

  const toggleSimulationPlay = (orderId) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          trackingSimulation: {
            ...order.trackingSimulation,
            isPlaying: !order.trackingSimulation.isPlaying
          }
        };
      }
      return order;
    }));
  };

  const stepSimulation = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const currentProgress = order.trackingSimulation?.progress || 0;
    const nextProgress = Math.min(100, currentProgress + 15);
    
    // Automatically transition order status based on progress milestones
    let newStatus = order.status;
    let street = order.trackingSimulation.currentStreet;
    let eta = Math.max(0, Math.ceil((100 - nextProgress) / 10));

    if (nextProgress >= 100) {
      newStatus = 'Delivered';
      street = 'Handed over to customer';
      eta = 0;
    } else if (nextProgress >= 70) {
      newStatus = 'Out for Delivery';
      street = 'Navigating neighborhood avenue (400m away)';
    } else if (nextProgress >= 50) {
      newStatus = 'Picked Up';
      street = 'Partner departed dark store with order';
    } else if (nextProgress >= 30) {
      newStatus = 'Packed';
      street = 'Order packed & barcode verified';
    }

    updateOrderStatus(orderId, newStatus);
    updateOrderTracking(orderId, {
      progress: nextProgress,
      etaMinutes: eta,
      currentStreet: street
    });
  };

  const resetOrderSimulation = (orderId) => {
    updateOrderStatus(orderId, 'Preparing');
    updateOrderTracking(orderId, {
      progress: 20,
      etaMinutes: 10,
      currentStreet: 'Fulfillment Dark Store Dock 01',
      isPlaying: true
    });
  };

  // Automated background simulation ticker for active orders marked isPlaying
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => {
        let hasChanges = false;
        const updated = prevOrders.map(order => {
          if (
            order.status !== 'Delivered' &&
            order.status !== 'Cancelled' &&
            order.trackingSimulation?.isPlaying
          ) {
            hasChanges = true;
            const currentProg = order.trackingSimulation.progress || 0;
            const inc = 1.5 * simulationSpeed;
            const nextProg = Math.min(100, currentProg + inc);
            const eta = Math.max(0, Math.ceil((100 - nextProg) / 8.5));

            let currentStreet = order.trackingSimulation.currentStreet;
            if (nextProg < 30) currentStreet = 'Store staff completing quality check';
            else if (nextProg < 50) currentStreet = 'Order dispatched to rider at terminal';
            else if (nextProg < 75) currentStreet = 'Navigating S.V. Road traffic pulse';
            else if (nextProg < 95) currentStreet = 'Turning into 14th Road corner';
            else currentStreet = 'Rider at your gate';

            let newStatus = order.status;
            if (nextProg >= 100) {
              newStatus = 'Delivered';
              currentStreet = 'Delivered safely!';
            } else if (nextProg >= 65 && order.status !== 'Out for Delivery') {
              newStatus = 'Out for Delivery';
            }

            return {
              ...order,
              status: newStatus,
              trackingSimulation: {
                ...order.trackingSimulation,
                progress: nextProg,
                etaMinutes: eta,
                currentStreet,
                isPlaying: nextProg < 100
              }
            };
          }
          return order;
        });
        return hasChanges ? updated : prevOrders;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [simulationSpeed]);

  // Customer Profile Management
  const addCustomerAddress = (newAddr) => {
    const addr = {
      ...newAddr,
      id: `addr-${Date.now().toString().slice(-4)}`,
      isDefault: false
    };
    setCustomer(prev => ({ ...prev, addresses: [...prev.addresses, addr] }));
    return addr;
  };

  const setDefaultAddress = (addressId) => {
    setCustomer(prev => ({
      ...prev,
      addresses: prev.addresses.map(a => ({ ...a, isDefault: a.id === addressId }))
    }));
    const found = customer.addresses.find(a => a.id === addressId);
    if (found) setSelectedAddress(found);
  };

  // Coupons management
  const addCoupon = (couponData) => {
    const newCoupon = {
      ...couponData,
      isActive: true,
      minOrderValue: parseFloat(couponData.minOrderValue) || 199,
      discountValue: parseFloat(couponData.discountValue) || 50
    };
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const toggleCouponActive = (code) => {
    setCoupons(prev => prev.map(c => c.code === code ? { ...c, isActive: !c.isActive } : c));
  };

  // Demo Reset System
  const resetAllDemoData = () => {
    localStorage.clear();
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setOrders(INITIAL_ORDERS);
    setPartners(INITIAL_DELIVERY_PARTNERS);
    setCoupons(INITIAL_COUPONS);
    setCustomer(INITIAL_CUSTOMER);
    setCart([]);
    setAppliedCoupon(null);
    setDeliveryTip(20);
    setSelectedAddress(INITIAL_CUSTOMER.addresses[0]);
    setIsAdminAuthenticated(true);
    setIsCustomerAuthenticated(true);
  };

  const value = {
    // Data
    products,
    categories,
    orders,
    partners,
    coupons,
    customer,
    cart,
    appliedCoupon,
    deliveryTip,
    deliveryInstructions,
    selectedAddress,
    
    // Auth
    isAdminAuthenticated,
    isCustomerAuthenticated,
    setIsAdminAuthenticated,
    setIsCustomerAuthenticated,
    
    // Presentation
    isPhoneFrame,
    setIsPhoneFrame,
    simulationSpeed,
    setSimulationSpeed,

    // Product actions
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,

    // Category actions
    addCategory,
    updateCategory,
    toggleCategoryActive,

    // Cart actions
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotals,
    applyCoupon,
    removeCoupon,
    setDeliveryTip,
    setDeliveryInstructions,
    setSelectedAddress,

    // Order actions
    createOrder,
    updateOrderStatus,
    assignDeliveryPartner,
    cancelOrder,
    updateOrderTracking,
    toggleSimulationPlay,
    stepSimulation,
    resetOrderSimulation,

    // Customer & address actions
    addCustomerAddress,
    setDefaultAddress,

    // Coupon actions
    addCoupon,
    toggleCouponActive,

    // Reset
    resetAllDemoData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
