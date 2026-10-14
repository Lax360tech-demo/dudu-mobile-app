import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const OrdersScreen = ({ navigation }) => {
  const { orders } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <Text style={styles.headerCount}>{orders.length} orders</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isActive = item.status !== 'Delivered' && item.status !== 'Cancelled';
          const isDelivered = item.status === 'Delivered';

          return (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
              style={styles.orderCard}
            >
              <View style={styles.orderTop}>
                <View style={styles.orderTopLeft}>
                  <View style={[styles.statusIcon, { backgroundColor: isActive ? '#FEF3C7' : '#ECFDF5' }]}>
                    <Ionicons
                      name={isActive ? 'navigate' : 'checkmark-done'}
                      size={14}
                      color={isActive ? '#D97706' : '#059669'}
                    />
                  </View>
                  <View>
                    <Text style={styles.orderId}>Order #{item.id}</Text>
                    <Text style={styles.orderDate}>
                      {new Date(item.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                </View>

                <View style={[styles.statusBadge, { backgroundColor: isActive ? '#FEF3C7' : isDelivered ? '#ECFDF5' : '#FEF2F2' }]}>
                  <Text style={[styles.statusBadgeText, { color: isActive ? '#B45309' : isDelivered ? '#047857' : '#B91C1C' }]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.orderItemsPreview}>
                <Text style={styles.itemsPreviewText} numberOfLines={1}>
                  {item.items?.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                </Text>
              </View>

              <View style={styles.orderBottom}>
                <View>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalVal}>₹{item.billSummary?.grandTotal}</Text>
                </View>

                <View style={styles.actionsRow}>
                  {isActive && (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('DeliveryTracking', { orderId: item.id })}
                      style={styles.trackBtn}
                    >
                      <Ionicons name="navigate" size={12} color="#FFFFFF" />
                      <Text style={styles.trackBtnText}>Track</Text>
                    </TouchableOpacity>
                  )}
                  <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A'
  },
  headerCount: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600'
  },
  listContent: {
    padding: 14
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 14,
    marginBottom: 10
  },
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  orderTopLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  orderId: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A'
  },
  orderDate: {
    fontSize: 10,
    color: '#94A3B8'
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800'
  },
  orderItemsPreview: {
    marginVertical: 10,
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 10
  },
  itemsPreviewText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500'
  },
  orderBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
    paddingTop: 8
  },
  totalLabel: {
    fontSize: 9,
    color: '#94A3B8'
  },
  totalVal: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A'
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  trackBtn: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 6
  },
  trackBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 3
  }
});
