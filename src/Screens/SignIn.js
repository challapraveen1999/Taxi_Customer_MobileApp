import React, {useState} from 'react';

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

// import Colors from '../Helpers/colorCodes';
// import CustomButton from '../Components/CustomButton';

const SignIn = ({navigation}) => {

  const [mobile, setMobile] =
    useState('');

  const [mobileError, setMobileError] =
    useState('');

  const validateMobile = () => {

    const mobileRegex =
      /^[6-9]\d{9}$/;

    if (!mobile.trim()) {

      setMobileError(
        'Mobile number is required',
      );

      return false;
    }

    if (!mobileRegex.test(mobile)) {

      setMobileError(
        'Enter valid mobile number',
      );

      return false;
    }

    setMobileError('');

    return true;
  };

  const handleContinue = () => {

    if (validateMobile()) {

      navigation.navigate(
        'OTPVerificationScreen',
        {
          mobile,
        },
      );

    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
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
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/5063/5063994.png'}}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.heading}>
            Your Ride Awaits!
          </Text>

          <Text style={styles.subHeading}>
            Enter your mobile number to book a ride
          </Text>

          <TextInput
            placeholder="Enter Mobile Number"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={text => {

              const formattedText =
                text.replace(
                  /[^0-9]/g,
                  '',
                );

              setMobile(
                formattedText,
              );

              if (
                mobileError
              ) {
                setMobileError(
                  '',
                );
              }
            }}
            style={[
              styles.input,

              mobileError && {
                borderColor: 'red',
              },
            ]}
          />

          {mobileError ? (
            <Text
              style={
                styles.errorText
              }>
              {mobileError}
            </Text>
          ) : null}

          <TouchableOpacity style={styles.buttonContainer} onPress={handleContinue}>
            <Text
              style={styles.buttonText}
            >Continue</Text>
          </TouchableOpacity>
          
          </ScrollView>
          </SafeAreaView>
        </LinearGradient>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
    marginTop: 10,
    marginBottom: 30,
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },

  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 5,
  },

  buttonContainer: {
    marginTop: 25,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000000',
  },
  buttonText: {
    color: '#007BB5',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});