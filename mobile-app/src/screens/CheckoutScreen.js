import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const CheckoutScreen = ({ navigation }) => {
  const {
    selectedAddress,
    deliveryInstructions,
    setDeliveryInstructions,
    getCartTotals,
    createOrder
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const totals = getCartTotals();

  const handlePlaceOrder = () => {
    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (simulateFailure) {
        setErrorMessage('Demo Payment Declined: Test Failure Mode is active.');
        return;
      }

      const order = createOrder({
        paymentMethod: paymentMethod === 'UPI' ? 'UPI (GPay / PhonePe)' : 'Credit Card (Mock)'
      });

      navigation.replace('OrderConfirmation', { orderId: order.id });
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Delivery Address Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.row}>
              <Ionicons name="location" size={16} color="#7C3AED" />
              <Text style={styles.cardTitle}>Delivery Address</Text>
            </View>
          </View>

          <View style={styles.addressBox}>
            <Text style={styles.addressTag}>{selectedAddress?.tag || 'Home'}</Text>
            <Text style={styles.addressLine}>{selectedAddress?.flat}, {selectedAddress?.street}</Text>
            <Text style={styles.addressCity}>{selectedAddress?.area}, {selectedAddress?.city}</Text>
          </View>
        </View>

        {/* Delivery Instructions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Instructions</Text>
          <View style={styles.instructionsGrid}>
            {['Leave at door', 'Do not ring bell', 'Call upon arrival'].map(inst => (
              <TouchableOpacity
                key={inst}
                onPress={() => setDeliveryInstructions(inst)}
                style={[styles.instBtn, deliveryInstructions === inst && styles.instBtnActive]}
              >
                <Text style={[styles.instText, deliveryInstructions === inst && styles.instTextActive]}>
                  {inst}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method (Demo Mock)</Text>

          {/* UPI */}
          <TouchableOpacity
            onPress={() => setPaymentMethod('UPI')}
            style={[styles.paymentOption, paymentMethod === 'UPI' && styles.paymentOptionActive]}
          >
            <View style={styles.paymentLeft}>
              <View style={[styles.paymentIcon, { backgroundColor: '#059669' }]}>
                <Text style={styles.paymentIconText}>UPI</Text>
              </View>
              <View>
                <Text style={styles.paymentTitle}>Instant UPI (Mock)</Text>
                <Text style={styles.paymentSub}>Google Pay, PhonePe, Paytm</Text>
              </View>
            </View>
            <Ionicons
              name={paymentMethod === 'UPI' ? 'radio-button-on' : 'radio-button-off'}
              size={18}
              color={paymentMethod === 'UPI' ? '#7C3AED' : '#94A3B8'}
            />
          </TouchableOpacity>

          {/* Card */}
          <TouchableOpacity
            onPress={() => setPaymentMethod('CARD')}
            style={[styles.paymentOption, paymentMethod === 'CARD' && styles.paymentOptionActive]}
          >
            <View style={styles.paymentLeft}>
              <View style={[styles.paymentIcon, { backgroundColor: '#4F46E5' }]}>
                <Ionicons name="card" size={14} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.paymentTitle}>Credit / Debit Card</Text>
                <Text style={styles.paymentSub}>Visa •••• 4242</Text>
              </View>
            </View>
            <Ionicons
              name={paymentMethod === 'CARD' ? 'radio-button-on' : 'radio-button-off'}
              size={18}
              color={paymentMethod === 'CARD' ? '#7C3AED' : '#94A3B8'}
            />
          </TouchableOpacity>

          {/* Simulation Toggle */}
          <View style={styles.simRow}>
            <Text style={styles.simLabel}>Demo Simulation Mode:</Text>
            <View style={styles.simBtns}>
              <TouchableOpacity
                onPress={() => { setSimulateFailure(false); setErrorMessage(''); }}
                style={[styles.simBtn, !simulateFailure && styles.simBtnActive]}
              >
                <Text style={[styles.simBtnText, !simulateFailure && styles.simBtnTextActive]}>
                  Success
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSimulateFailure(true)}
                style={[styles.simBtn, simulateFailure && styles.simBtnFailActive]}
              >
                <Text style={[styles.simBtnText, simulateFailure && styles.simBtnTextActive]}>
                  Failure
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {errorMessage.length > 0 && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Place Order Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={handlePlaceOrder}
          disabled={loading}
          style={styles.placeOrderBtn}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <View style={styles.placeOrderRow}>
              <Text style={styles.placeOrderText}>Pay ₹{totals.grandTotal} & Place Order</Text>
              <Ionicons name="flash" size={16} color="#FFFFFF" />
            </View>
          )}
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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  backBtn: {
    marginRight: 10
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A'
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 90
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 14,
    marginBottom: 12
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginLeft: 6
  },
  addressBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  addressTag: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A'
  },
  addressLine: {
    fontSize: 11,
    color: '#475569',
    marginTop: 2
  },
  addressCity: {
    fontSize: 10,
    color: '#94A3B8'
  },
  instructionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8
  },
  instBtn: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 6,
    marginBottom: 6
  },
  instBtnActive: {
    backgroundColor: '#F5F3FF',
    borderColor: '#7C3AED'
  },
  instText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B'
  },
  instTextActive: {
    color: '#7C3AED',
    fontWeight: '800'
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 8
  },
  paymentOptionActive: {
    backgroundColor: '#F5F3FF',
    borderColor: '#7C3AED'
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  paymentIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  paymentIconText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900'
  },
  paymentTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A'
  },
  paymentSub: {
    fontSize: 10,
    color: '#94A3B8'
  },
  simRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    marginTop: 12
  },
  simLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B'
  },
  simBtns: {
    flexDirection: 'row'
  },
  simBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginLeft: 4
  },
  simBtnActive: {
    backgroundColor: '#059669',
    borderColor: '#059669'
  },
  simBtnFailActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444'
  },
  simBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B'
  },
  simBtnTextActive: {
    color: '#FFFFFF'
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 10,
    borderRadius: 10,
    marginTop: 8
  },
  errorText: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '600'
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9'
  },
  placeOrderBtn: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeOrderRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    marginRight: 6
  }
});
