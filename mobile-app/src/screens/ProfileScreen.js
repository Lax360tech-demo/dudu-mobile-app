import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const ProfileScreen = ({ navigation }) => {
  const { customer, resetAllDemoData, setIsAuthenticated } = useApp();

  const handleReset = () => {
    resetAllDemoData();
    alert('Demo data has been reset to defaults.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>RV</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{customer.name}</Text>
            <Text style={styles.userPhone}>{customer.phone}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⚡ LAX VIP MEMBER</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconBg, { backgroundColor: '#EDE9FE' }]}>
                <Ionicons name="location" size={16} color="#7C3AED" />
              </View>
              <Text style={styles.menuTitle}>Saved Addresses ({customer.addresses?.length || 2})</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => alert('Demo Support: 10-Minute Dark Store Active across Bandra.')}
            style={styles.menuItem}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconBg, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="help-buoy" size={16} color="#059669" />
              </View>
              <Text style={styles.menuTitle}>Customer Support FAQ</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Presentation Demo Controls */}
        <View style={styles.menuCard}>
          <Text style={styles.cardHeader}>Demo Presentation Controls</Text>

          <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
            <Ionicons name="refresh" size={16} color="#EF4444" />
            <Text style={styles.resetBtnText}>Reset All Demo Data</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={16} color="#64748B" />
            <Text style={styles.logoutText}>Sign Out (Demo)</Text>
          </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A'
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 40
  },
  userCard: {
    backgroundColor: '#7C3AED',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900'
  },
  userInfo: {
    flex: 1
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900'
  },
  userPhone: {
    color: '#DDD6FE',
    fontSize: 11,
    marginTop: 2
  },
  badge: {
    backgroundColor: '#FBBF24',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6
  },
  badgeText: {
    color: '#0F172A',
    fontSize: 9,
    fontWeight: '800'
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 14,
    marginBottom: 12
  },
  cardHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    marginBottom: 10
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC'
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuIconBg: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  menuTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A'
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 6
  },
  resetBtnText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 4
  },
  logoutText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4
  }
});
