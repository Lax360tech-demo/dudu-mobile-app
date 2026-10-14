import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoBadge}>
          <Ionicons name="flash" size={32} color="#FBBF24" />
        </View>

        <Text style={styles.brandTitle}>LAX360</Text>
        <Text style={styles.tagline}>Groceries & Essentials in 10 Minutes</Text>

        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Ionicons name="time" size={16} color="#A78BFA" />
            <Text style={styles.featureText}>Superfast 10-12 min doorstep delivery</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="leaf" size={16} color="#34D399" />
            <Text style={styles.featureText}>100% farm fresh organic produce</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="shield-checkmark" size={16} color="#60A5FA" />
            <Text style={styles.featureText}>Interactive order & rider tracking</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.replace('MainTabs')}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Start Shopping</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Sign In with Mobile</Text>
        </TouchableOpacity>

        <Text style={styles.demoNote}>⚡ Demo Prototype for LAX360 Presentation</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'space-between',
    padding: 24
  },
  content: {
    alignItems: 'center',
    marginTop: 80
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2
  },
  tagline: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 6,
    textAlign: 'center'
  },
  featuresList: {
    marginTop: 40,
    width: '100%',
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155'
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  featureText: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 10
  },
  bottomSection: {
    marginBottom: 20
  },
  primaryButton: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginRight: 6
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8
  },
  secondaryButtonText: {
    color: '#C4B5FD',
    fontSize: 13,
    fontWeight: '700'
  },
  demoNote: {
    color: '#64748B',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8
  }
});
