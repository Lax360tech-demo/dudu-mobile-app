import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { SchematicTrackingMap } from '../components/SchematicTrackingMap';

export const DeliveryTrackingScreen = ({ route, navigation }) => {
  const { orderId } = route.params || {};
  const { orders } = useApp();

  const order = orders.find(o => o.id === orderId) || orders[0];
  const partner = order?.deliveryPartner || {
    name: 'Vikram Sharma',
    phone: '+91 98201 54321',
    vehicle: 'Honda Activa 6G (MH 02 CD 4192)',
    rating: 4.9,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
  };

  const isDelivered = order?.status === 'Delivered';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Delivery Tracking</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Schematic SVG Map */}
        <SchematicTrackingMap order={order} height={260} />

        {/* ETA & Status Header */}
        <View style={styles.statusCard}>
          <View>
            <Text style={styles.etaLabel}>{isDelivered ? 'COMPLETED' : 'ESTIMATED ARRIVAL'}</Text>
            <Text style={styles.etaText}>
              {isDelivered ? 'Delivered safely!' : `Arriving in ${order?.trackingSimulation?.etaMinutes || 4} mins`}
            </Text>
            <Text style={styles.currentStreet}>
              {order?.trackingSimulation?.currentStreet || 'Navigating neighborhood avenue'}
            </Text>
          </View>

          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>{order?.status}</Text>
          </View>
        </View>

        {/* Delivery Partner Profile Card */}
        <View style={styles.partnerCard}>
          <View style={styles.partnerLeft}>
            <Image source={{ uri: partner.photo }} style={styles.partnerPhoto} />
            <View>
              <View style={styles.nameRow}>
                <Text style={styles.partnerName}>{partner.name}</Text>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={10} color="#D97706" />
                  <Text style={styles.ratingText}>{partner.rating}</Text>
                </View>
              </View>
              <Text style={styles.partnerVehicle}>{partner.vehicle}</Text>
              <Text style={styles.partnerPhone}>{partner.phone}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => alert(`Calling ${partner.name}... (Demo Simulation)`)}
              style={styles.callBtn}
            >
              <Ionicons name="call" size={16} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert(`Messaging ${partner.name}... (Demo Simulation)`)}
              style={styles.msgBtn}
            >
              <Ionicons name="chatbubble-ellipses" size={16} color="#475569" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Details Accordion */}
        <View style={styles.itemsCard}>
          <Text style={styles.itemsTitle}>Items in this Order ({order?.items?.length || 0})</Text>
          {order?.items?.map((item, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Text style={styles.itemName} numberOfLines={1}>{item.quantity}x {item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
            </View>
          ))}
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
    paddingBottom: 40
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 14,
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  etaLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1
  },
  etaText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 2
  },
  currentStreet: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    maxWidth: 220
  },
  statusPill: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusPillText: {
    color: '#7C3AED',
    fontSize: 11,
    fontWeight: '800'
  },
  partnerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  partnerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  partnerPhoto: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
    backgroundColor: '#F1F5F9'
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  partnerName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginRight: 6
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
    marginLeft: 2
  },
  partnerVehicle: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2
  },
  partnerPhone: {
    fontSize: 10,
    color: '#94A3B8'
  },
  actionButtons: {
    flexDirection: 'row'
  },
  callBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6
  },
  msgBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 14
  },
  itemsTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4
  },
  itemName: {
    fontSize: 11,
    color: '#475569',
    maxWidth: 220
  },
  itemPrice: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A'
  }
});
