import React, { useState, useEffect, useRef } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const OtpVerification = ({navigation,route,}) => {

  const mobile =
    route?.params?.mobile;

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const [otpError, setOtpError] =
    useState('');

  const [timer, setTimer] = useState(180);
  const [resendCount, setResendCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCount]);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleResendOtp = () => {
    setTimer(60);
    setResendCount(prev => prev + 1);
  };

  const handleChange = (text, index) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = formattedText;
    setOtp(newOtp);
    setOtpError('');

    if (formattedText && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    const otpString = newOtp.join('');
    if (otpString.length === 4) {
      validateAndNavigate(otpString);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const validateAndNavigate = (otpString) => {
    if (otpString === '1234') {
      setOtpError('');
      navigation.replace('BottomTabs');
    } else {
      setOtpError('Invalid OTP');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }>

      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}>

        <LinearGradient
          colors={['#80DEEA', '#0a6c7b']}
          style={styles.container}>
          <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6195/6195696.png' }}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.heading}>
              OTP Verification
            </Text>

            <View style={styles.resendContainer}>
              <View style={styles.mobileRow}>
                <Text style={styles.subHeading}>
                  OTP sent to {mobile}
                </Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.editIcon}>
                  <Icon name="pencil" size={18} color="#E0F7FA" />
                </TouchableOpacity>
              </View>
              {timer > 0 ? (
                <Text style={styles.timerText}>
                  {formatTime()}
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text style={styles.resendButtonText}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => inputRefs.current[index] = ref}
                  style={[styles.otpInput, otpError ? styles.otpInputError : null]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={text => handleChange(text, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                />
              ))}
            </View>

            {otpError ? (
              <Text
                style={
                  styles.errorText
                }>
                {otpError}
              </Text>
            ) : null}

            <Text style={styles.demo}>
              Demo OTP : 1234
            </Text>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    padding: 20,
  },

  image: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    marginBottom: 40,
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
  },

  subHeading: {
    fontSize: 16,
    color: '#E0F7FA',
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  otpInput: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },

  otpInputError: {
    borderColor: 'red',
  },

  errorText: {
    color:
      'red',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
  },

  timerText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  mobileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  editIcon: {
    marginLeft: 8,
    padding: 4,
  },

  resendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  demo: {
    marginTop: 20,
    textAlign: 'center',
    color: '#E0F7FA',
  },

});