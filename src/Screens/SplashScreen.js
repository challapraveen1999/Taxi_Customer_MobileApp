import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate auth check and loading transition
    const timer = setTimeout(() => {
      navigation.replace('OnboardingScreen');
    }, 6600);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground 
      source={require('../assets/videoframe_10186.png')}
      style={styles.container}
      resizeMode='cover'
    >
      <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    bottom: 50,
  },
});

export default SplashScreen;