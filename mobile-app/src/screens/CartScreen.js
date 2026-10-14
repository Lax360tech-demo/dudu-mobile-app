import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const CartScreen = ({ navigation }) => {
  const {
    cart,
    updateCartQuantity,
    clearCart,
    getCartTotals,
    coupons,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    deliveryTip,
    setDeliveryTip
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const totals = getCartTotals();

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconBg}>
          <Ionicons name="cart-outline" size={48} color="#7C3AED" />
        </View>
        <Text style={styles.emptyHeading}>Your Cart is Empty</Text>
        <Text style={styles.emptyText}>Add farm fresh groceries and snacks delivered in 10 minutes</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.shopNowBtn}
        >
          <Text style={styles.shopNowText}>Browse Store</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Cart ({totals.itemCount} items)</Text>
        </View>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearCartText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Free Delivery Bar */}
        <View style={styles.freeDelCard}>
          <Text style={styles.freeDelText}>
            {totals.amountNeededForFreeDelivery === 0
              ? '🎉 Unlocked 100% FREE 10-Min Delivery!'
              : `Add ₹${totals.amountNeededForFreeDelivery} more for FREE delivery`}
          </Text>
        </View>

        {/* Itemized List */}
        <View style={styles.itemsCard}>
          {cart.map(({ product, quantity }) => (
            <View key={product.id} style={styles.cartRow}>
              <Image source={{ uri: product.image }} style={styles.cartItemImg} resizeMode="contain" />
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.cartItemUnit}>{product.unit}</Text>
                <Text style={styles.cartItemPrice}>₹{product.price * quantity}</Text>
              </View>

              <View style={styles.stepperContainer}>
                <TouchableOpacity
                  onPress={() => updateCartQuantity(product.id, quantity - 1)}
                  style={styles.stepperBtn}
                >
                  <Ionicons name="remove" size={14} color="#7C3AED" />
                </TouchableOpacity>
                <Text style={styles.stepperQty}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateCartQuantity(product.id, quantity + 1)}
                  style={styles.stepperBtn}
                >
                  <Ionicons name="add" size={14} color="#7C3AED" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Coupon Selector */}
        <View style={styles.couponCard}>
          <Text style={styles.cardHeader}>Coupons & Offers</Text>
          {appliedCoupon ? (
            <View style={styles.appliedCouponRow}>
              <View>
                <Text style={styles.appliedCode}>{appliedCoupon.code} Applied</Text>
                <Text style={styles.savedText}>You saved ₹{totals.couponDiscount}!</Text>
              </View>
              <TouchableOpacity onPress={removeCoupon}>
                <Text style={styles.removeCouponText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.couponInputRow}>
              <TextInput
                value={inputCoupon}
                onChangeText={t => setInputCoupon(t.toUpperCase())}
                placeholder="Enter Coupon (e.g. LAXFIRST)"
                placeholderTextColor="#94A3B8"
                style={styles.couponInput}
              />
              <TouchableOpacity
                onPress={() => {
                  applyCoupon(inputCoupon);
                  setInputCoupon('');
                }}
                style={styles.applyBtn}
              >
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Tip Selector */}
        <View style={styles.couponCard}>
          <Text style={styles.cardHeader}>Delivery Partner Tip</Text>
          <View style={styles.tipRow}>
            {[0, 10, 20, 50].map(tip => (
              <TouchableOpacity
                key={tip}
                onPress={() => setDeliveryTip(tip)}
                style={[styles.tipBtn, deliveryTip === tip && styles.tipBtnActive]}
              >
                <Text style={[styles.tipText, deliveryTip === tip && styles.tipTextActive]}>
                  {tip === 0 ? 'No Tip' : `₹${tip}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bill Breakdown */}
        <View style={styles.couponCard}>
          <Text style={styles.cardHeader}>Bill Details</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Items Total</Text>
            <Text style={styles.billVal}>₹{totals.itemsTotal}</Text>
          </View>

          {totals.couponDiscount > 0 && (
            <View style={styles.billRow}>
              <Text style={styles.discountLabel}>Coupon Discount</Text>
              <Text style={styles.discountVal}>-₹{totals.couponDiscount}</Text>
            </View>
          )}

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Fee</Text>
            <Text style={styles.billVal}>
              {totals.deliveryFee === 0 ? 'FREE' : `₹${totals.deliveryFee}`}
            </Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Handling Fee</Text>
            <Text style={styles.billVal}>₹{totals.handlingFee}</Text>
          </View>

          {totals.tip > 0 && (
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Partner Tip</Text>
              <Text style={styles.billVal}>₹{totals.tip}</Text>
            </View>
          )}

          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Grand Total</Text>
            <Text style={styles.grandTotalVal}>₹{totals.grandTotal}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Checkout')}
          style={styles.checkoutBtn}
        >
          <View>
            <Text style={styles.checkoutTotalLabel}>TOTAL</Text>
            <Text style={styles.checkoutTotalVal}>₹{totals.grandTotal}</Text>
          </View>

          <View style={styles.checkoutBtnRight}>
            <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backBtn: {
    marginRight: 10
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A'
  },
  clearCartText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444'
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 90
  },
  freeDelCard: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    padding: 10,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: 'center'
  },
  freeDelText: {
    color: '#065F46',
    fontSize: 11,
    fontWeight: '700'
  },
  itemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 12,
    marginBottom: 12
  },
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC'
  },
  cartItemImg: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    marginRight: 10
  },
  cartItemDetails: {
    flex: 1
  },
  cartItemName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A'
  },
  cartItemUnit: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1
  },
  cartItemPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE9FE',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C4B5FD'
  },
  stepperBtn: {
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  stepperQty: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7C3AED',
    minWidth: 16,
    textAlign: 'center'
  },
  couponCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 14,
    marginBottom: 12
  },
  cardHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10
  },
  appliedCouponRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD6FE'
  },
  appliedCode: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6D28D9'
  },
  savedText: {
    fontSize: 10,
    color: '#7C3AED',
    marginTop: 1
  },
  removeCouponText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EF4444'
  },
  couponInputRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  couponInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    height: 40,
    fontSize: 11,
    color: '#0F172A',
    fontWeight: '700'
  },
  applyBtn: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 14,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800'
  },
  tipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tipBtn: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 3
  },
  tipBtnActive: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED'
  },
  tipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569'
  },
  tipTextActive: {
    color: '#FFFFFF'
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4
  },
  billLabel: {
    fontSize: 11,
    color: '#64748B'
  },
  billVal: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A'
  },
  discountLabel: {
    fontSize: 11,
    color: '#7C3AED',
    fontWeight: '600'
  },
  discountVal: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7C3AED'
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 8,
    paddingTop: 8
  },
  grandTotalLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A'
  },
  grandTotalVal: {
    fontSize: 15,
    fontWeight: '900',
    color: '#7C3AED'
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9'
  },
  checkoutBtn: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16
  },
  checkoutTotalLabel: {
    fontSize: 9,
    color: '#DDD6FE',
    fontWeight: '700'
  },
  checkoutTotalVal: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF'
  },
  checkoutBtnRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginRight: 6
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  emptyIconBg: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  emptyHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A'
  },
  emptyText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 240
  },
  shopNowBtn: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 20
  },
  shopNowText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800'
  }
});
