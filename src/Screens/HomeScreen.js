import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    console.log('HomeScreen mounted, attempting to render map...');
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location to show your position on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const goToMyLocation = () => {
    if (userLocation && mapRef.current) {
      console.log('Animating map to user location:', userLocation);
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    } else {
      Alert.alert(
        "Location Unavailable",
        "Waiting for GPS signal. Make sure your device location is turned on."
      );
    }
  };

  return (
    <LinearGradient
      colors={['#80DEEA', '#0a6c7b']}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarPlaceholder} />
            <Text style={styles.greeting}>Good Morning, User!</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Icon name="notifications-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            showsMyLocationButton={false}
            onMapReady={() => console.log('Map is ready on HomeScreen!')}
            onMapLoaded={() => console.log('Map has finished loading tiles on HomeScreen!')}
            onUserLocationChange={(e) => {
              console.log('User location updated:', e.nativeEvent.coordinate);
              setUserLocation(e.nativeEvent.coordinate);
            }}
          />
          
          {/* Custom Location Button */}
          <TouchableOpacity style={styles.myLocationBtn} onPress={goToMyLocation}>
            <Icon name="locate" size={24} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Bottom Action Sheet */}
        <View style={styles.bottomSheet}>
          <Text style={styles.sheetTitle}>Where to?</Text>

          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('LocationSelection')}
          >
            <View style={styles.searchDot} />
            <Text style={styles.searchText}>Enter Destination</Text>
          </TouchableOpacity>

          {/* Quick Actions
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionChip}>
              <Icon name="home" size={16} color="#374151" style={styles.actionIcon} />
              <Text style={styles.actionText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionChip}>
              <Icon name="briefcase" size={16} color="#374151" style={styles.actionIcon} />
              <Text style={styles.actionText}>Work</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    zIndex: 1, // Keep header above map
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationIcon: {
    padding: 8,
  },
  bellPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  myLocationBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapText: {
    color: '#6B7280',
    fontWeight: '600',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    elevation: 5,
    paddinghorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 20,
    marginTop: 10,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111827',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981', // Secondary color
    marginRight: 12,
  },
  searchText: {
    fontSize: 16,
    color: '#6B7280',
  },
  quickActions: {
    flexDirection: 'row',
  },
  actionChip: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});

export default HomeScreen;