import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const OrderConfirmationScreen = ({ route, navigation }) => {
  const { orderId } = route.params || {};
  const { orders } = useApp();

  const order = orders.find(o => o.id === orderId) || orders[0];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIconBg}>
          <Ionicons name="checkmark-circle" size={54} color="#059669" />
        </View>

        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>Our dark store team is already packing your items</Text>

        <View style={styles.orderIdBadge}>
          <Text style={styles.orderIdText}>Order ID: #{order?.id || orderId}</Text>
        </View>

        <View style={styles.etaCard}>
          <View style={styles.etaHeader}>
            <Ionicons name="flash" size={14} color="#FBBF24" />
            <Text style={styles.etaHeaderText}>Express 10-Minute Dispatch</Text>
          </View>
          <Text style={styles.etaTime}>{order?.estimatedDeliveryTime || 'Arriving in 10-12 mins'}</Text>
          <Text style={styles.etaAddress}>
            Delivering to: {order?.deliveryAddress?.flat || 'Home'}
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DeliveryTracking', { orderId: order?.id })}
          style={styles.trackBtn}
        >
          <Ionicons name="navigate" size={16} color="#FFFFFF" />
          <Text style={styles.trackBtnText}>Track Live on Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('MainTabs')}
          style={styles.continueBtn}
        >
          <Text style={styles.continueBtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    padding: 24
  },
  content: {
    alignItems: 'center',
    marginTop: 60
  },
  successIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 240
  },
  orderIdBadge: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  orderIdText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    fontFamily: 'monospace'
  },
  etaCard: {
    backgroundColor: '#F5F3FF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    padding: 16,
    width: '100%',
    marginTop: 24
  },
  etaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  etaHeaderText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#5B21B6',
    marginLeft: 4
  },
  etaTime: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A'
  },
  etaAddress: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2
  },
  bottomSection: {
    marginBottom: 20
  },
  trackBtn: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16
  },
  trackBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 6
  },
  continueBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8
  },
  continueBtnText: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '700'
  }
});
