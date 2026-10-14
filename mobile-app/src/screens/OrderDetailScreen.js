import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const OrderDetailScreen = ({ route, navigation }) => {
  const { orderId } = route.params || {};
  const { orders } = useApp();

  const order = orders.find(o => o.id === orderId) || orders[0];
  const isActive = order?.status !== 'Delivered' && order?.status !== 'Cancelled';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order #{order?.id}</Text>
        {isActive && (
          <TouchableOpacity
            onPress={() => navigation.navigate('DeliveryTracking', { orderId: order?.id })}
            style={styles.mapBtn}
          >
            <Ionicons name="navigate" size={12} color="#FFFFFF" />
            <Text style={styles.mapBtnText}>Map</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Status Card */}
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>STATUS</Text>
          <Text style={styles.statusValue}>{order?.status}</Text>
          <Text style={styles.etaText}>{order?.estimatedDeliveryTime}</Text>
        </View>

        {/* Timeline Stepper */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Progress</Text>
          <View style={styles.timeline}>
            {order?.timeline?.map((step, idx) => (
              <View key={step.status} style={styles.timelineRow}>
                <View style={[styles.timelineNode, step.done && styles.timelineNodeDone]}>
                  {step.done ? (
                    <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                  ) : (
                    <Text style={styles.nodeText}>{idx + 1}</Text>
                  )}
                </View>
                <View style={styles.timelineInfo}>
                  <Text style={[styles.timelineStep, step.done && styles.timelineStepDone]}>
                    {step.status}
                  </Text>
                  <Text style={styles.timelineTime}>{step.timestamp}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Ordered Items */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Items ({order?.items?.length || 0})</Text>
          {order?.items?.map((item, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Image source={{ uri: item.image }} style={styles.itemImg} resizeMode="contain" />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.itemUnit}>{item.unit} • Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
            </View>
          ))}
        </View>

        {/* Bill Receipt */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bill Summary</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Items Total</Text>
            <Text style={styles.billVal}>₹{order?.billSummary?.itemsTotal}</Text>
          </View>
          {order?.billSummary?.discount > 0 && (
            <View style={styles.billRow}>
              <Text style={styles.discountLabel}>Coupon Discount</Text>
              <Text style={styles.discountVal}>-₹{order?.billSummary?.discount}</Text>
            </View>
          )}
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Taxes & Fees</Text>
            <Text style={styles.billVal}>
              ₹{(order?.billSummary?.deliveryFee || 0) + (order?.billSummary?.handlingFee || 5)}
            </Text>
          </View>
          <View style={styles.grandRow}>
            <Text style={styles.grandLabel}>Total Paid</Text>
            <Text style={styles.grandVal}>₹{order?.billSummary?.grandTotal}</Text>
          </View>
        </View>
      </ScrollView>
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
  backBtn: {
    marginRight: 10
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1
  },
  mapBtn: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8
  },
  mapBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 3
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 40
  },
  statusCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FDE68A'
  },
  statusLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#92400E',
    letterSpacing: 1
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#78350F',
    marginTop: 2
  },
  etaText: {
    fontSize: 11,
    color: '#B45309',
    marginTop: 2
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 14,
    marginBottom: 12
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10
  },
  timeline: {
    paddingLeft: 4
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4
  },
  timelineNode: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  timelineNodeDone: {
    backgroundColor: '#059669'
  },
  nodeText: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '700'
  },
  timelineInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timelineStep: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8'
  },
  timelineStepDone: {
    color: '#0F172A',
    fontWeight: '700'
  },
  timelineTime: {
    fontSize: 10,
    color: '#94A3B8'
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC'
  },
  itemImg: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    marginRight: 10
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A'
  },
  itemUnit: {
    fontSize: 10,
    color: '#94A3B8'
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A'
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3
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
    color: '#7C3AED'
  },
  discountVal: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7C3AED'
  },
  grandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 8,
    paddingTop: 8
  },
  grandLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A'
  },
  grandVal: {
    fontSize: 15,
    fontWeight: '900',
    color: '#7C3AED'
  }
});
