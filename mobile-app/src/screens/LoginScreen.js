import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const LoginScreen = ({ navigation }) => {
  const { setIsAuthenticated } = useApp();
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setOtp('4321');
    }, 600);
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsAuthenticated(true);
      navigation.replace('MainTabs');
    }, 600);
  };

  const handleGuest = () => {
    setIsAuthenticated(true);
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.heading}>Welcome to LAX360</Text>
        <Text style={styles.subheading}>Groceries delivered in 10 minutes to Bandra West</Text>

        <View style={styles.card}>
          {step === 'phone' ? (
            <View>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.countryCode}>🇮🇳 +91</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  maxLength={10}
                  placeholder="Enter 10-digit number"
                  placeholderTextColor="#64748B"
                  style={styles.textInput}
                />
              </View>

              <TouchableOpacity
                onPress={handleSendOtp}
                disabled={loading || phone.length < 10}
                style={[styles.primaryBtn, { opacity: phone.length < 10 ? 0.5 : 1 }]}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryBtnText}>Continue with OTP</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={styles.otpHeader}>
                <Text style={styles.label}>Enter 4-Digit Demo OTP</Text>
                <TouchableOpacity onPress={() => setStep('phone')}>
                  <Text style={styles.changePhoneText}>Change</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={4}
                placeholder="4 3 2 1"
                placeholderTextColor="#64748B"
                style={styles.otpInput}
              />
              <Text style={styles.otpHint}>✨ Auto-filled demo OTP: 4321</Text>

              <TouchableOpacity
                onPress={handleVerifyOtp}
                disabled={loading || otp.length < 4}
                style={styles.primaryBtn}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryBtnText}>Verify & Enter</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity onPress={handleGuest} style={styles.guestBtn}>
            <Ionicons name="sparkles" size={14} color="#FBBF24" />
            <Text style={styles.guestBtnText}>Explore Demo as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footerText}>🔒 Demo Environment • No real SMS or charge</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 24,
    justifyContent: 'space-between'
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF'
  },
  subheading: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
    marginBottom: 24
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155'
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 8
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    height: 48
  },
  countryCode: {
    fontSize: 13,
    fontWeight: '700',
    color: '#CBD5E1',
    marginRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#334155',
    paddingRight: 10
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  primaryBtn: {
    backgroundColor: '#7C3AED',
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800'
  },
  otpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  changePhoneText: {
    color: '#A78BFA',
    fontSize: 11,
    fontWeight: '700'
  },
  otpInput: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#7C3AED',
    height: 48,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 8
  },
  otpHint: {
    color: '#34D399',
    fontSize: 10,
    marginTop: 6,
    textAlign: 'center'
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155'
  },
  dividerText: {
    color: '#64748B',
    fontSize: 11,
    marginHorizontal: 8
  },
  guestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#334155',
    height: 44,
    borderRadius: 14
  },
  guestBtnText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6
  },
  footerText: {
    color: '#64748B',
    fontSize: 11,
    textAlign: 'center'
  }
});
