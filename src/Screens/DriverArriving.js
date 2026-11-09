import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  Linking,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, AnimatedRegion } from 'react-native-maps';

const DriverArrivingScreen = ({navigation}) => {
  const mapRef = useRef(null);

  const pickupCoords = { latitude: 37.78825, longitude: -122.4324 };
  const initialDriverCoords = { latitude: 37.76825, longitude: -122.4124 };

  const driver = {
    name: 'Marcus Thompson',
    rating: '4.9',
    rideType: 'RAPID XL',
    vehicleNumber: '7XRP920',
    vehicleName: 'Tesla Model 3',
    vehicleColor: 'Midnight Silver',
    eta: '3 mins',
    otp: '4582',
  };

  const driverCoordsAnimated = useRef(
    new AnimatedRegion({
      latitude: initialDriverCoords.latitude,
      longitude: initialDriverCoords.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  ).current;

  useEffect(() => {
    // Animate the marker from driver coordinates to pickup coordinates over 15 seconds
    driverCoordsAnimated.timing({
      latitude: pickupCoords.latitude,
      longitude: pickupCoords.longitude,
      duration: 15000,
      useNativeDriver: false, // AnimatedRegion does not support native driver
    }).start();
  }, [driverCoordsAnimated]);

  const fitMapToRoute = () => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates([pickupCoords, initialDriverCoords], {
        // Add padding so the markers are not hidden behind the top header or bottom card
        edgePadding: { top: 100, right: 50, bottom: 450, left: 50 },
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.map}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.mapView}
          initialRegion={{
            latitude: (pickupCoords.latitude + initialDriverCoords.latitude) / 2,
            longitude: (pickupCoords.longitude + initialDriverCoords.longitude) / 2,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onMapLoaded={fitMapToRoute}
        >
          <Polyline 
            coordinates={[initialDriverCoords, pickupCoords]}
            strokeColor="#0a6c7b"
            strokeWidth={4}
          />
          <Marker coordinate={pickupCoords}>
            <View style={styles.pickupMarkerIcon}>
              <Text style={styles.pickupText}>Pickup Point</Text>
            </View>
          </Marker>
          <Marker.Animated coordinate={driverCoordsAnimated}>
            <View style={styles.driverMarkerIcon}>
              <Ionicons name="car" size={24} color="#fff" />
            </View>
          </Marker.Animated>
        </MapView>

        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#000"
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>
              En Route
            </Text>

            <Text style={styles.headerSub}>
              Tracking RapidRide
            </Text>
          </View>

          <TouchableOpacity>
            <Ionicons
              name="help-circle-outline"
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        {/* ETA CARD */}

        <View style={styles.etaContainer}>
          <Ionicons
            name="time"
            size={24}
            color="#00D4FF"
          />

          <Text style={styles.etaText}>
            Arriving in {driver.eta}
          </Text>
        </View>

        {/* BOTTOM CARD */}

        <View style={styles.bottomCard}>
          <View style={styles.dragger} />

          <View style={styles.driverRow}>
            <Image
              source={{
                uri: 'https://randomuser.me/api/portraits/men/32.jpg',
              }}
              style={styles.driverImage}
            />

            <View style={{flex: 1}}>
              <Text style={styles.driverName}>
                {driver.name}
              </Text>

              <View style={styles.infoRow}>
                <View style={styles.ratingBadge}>
                  <Ionicons
                    name="star"
                    size={12}
                    color="#fff"
                  />

                  <Text
                    style={styles.ratingText}>
                    {driver.rating}
                  </Text>
                </View>

                <View style={styles.typeBadge}>
                  <Text
                    style={styles.typeText}>
                    {driver.rideType}
                  </Text>
                </View>
              </View>
            </View>

            <View>
              <Text style={styles.vehicleName}>
                {driver.vehicleName}
              </Text>

              <Text
                style={styles.vehicleColor}>
                {driver.vehicleColor}
              </Text>
            </View>
          </View>

          {/* VEHICLE NUMBER */}

          <View style={styles.vehicleOtpRow}>
            <View>
              <Text style={styles.vehicleNumberLabel}>Vehicle No.</Text>
              <Text style={styles.vehicleNumber}>
                {driver.vehicleNumber}
              </Text>
            </View>
            <View style={styles.otpContainerBadge}>
              <Text style={styles.otpLabel}>Start OTP</Text>
              <Text style={styles.otpValue}>{driver.otp}</Text>
            </View>
          </View>

          {/* ACTIONS */}

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate('ChatScreen', { driverName: driver.name })
              }>
              <Ionicons
                name="chatbubble-outline"
                size={22}
                color="#111"
              />

              <Text
                style={styles.actionText}>
                Message
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                Linking.openURL('tel:0409889888988')
              }>
              <Ionicons
                name="call-outline"
                size={22}
                color="#111"
              />

              <Text
                style={styles.actionText}>
                Call
              </Text>
            </TouchableOpacity>
          </View>

          {/* FOOTER BUTTONS */}

          <View style={styles.footerRow}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Cancel Ride',
                )
              }>
              <Text
                style={styles.cancelText}>
                Cancel Ride
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareBtn}
              onPress={() =>
                Alert.alert(
                  'Share Trip',
                )
              }>
              <Ionicons
                name="share-social-outline"
                size={18}
                color="#fff"
              />

              <Text
                style={styles.shareText}>
                Share Trip
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DriverArrivingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
    justifyContent: 'space-between',
  },

  mapView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  header: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: '#fff',
    height: 70,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },

  headerSub: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },

  etaContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
  },

  etaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },

  pickupMarkerIcon: {
    backgroundColor: '#0B1736',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },

  pickupText: {
    color: '#fff',
    fontWeight: '600',
  },

  driverMarkerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00D4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },

  dragger: {
    width: 60,
    height: 5,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },

  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },

  driverName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },

  infoRow: {
    flexDirection: 'row',
    marginTop: 5,
  },

  ratingBadge: {
    flexDirection: 'row',
    backgroundColor: '#00C2FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignItems: 'center',
  },

  ratingText: {
    color: '#fff',
    marginLeft: 4,
    fontWeight: '700',
  },

  typeBadge: {
    backgroundColor: '#E7ECF5',
    marginLeft: 8,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  typeText: {
    color: '#555',
    fontWeight: '600',
  },

  vehicleName: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
  },

  vehicleColor: {
    fontSize: 13,
    color: '#666',
    textAlign: 'right',
  },

  vehicleOtpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },

  vehicleNumberLabel: {
    fontSize: 12,
    color: '#666',
  },

  vehicleNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },

  otpContainerBadge: {
    backgroundColor: '#E7ECF5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },

  otpLabel: {
    fontSize: 12,
    color: '#555',
  },

  otpValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a6c7b',
    letterSpacing: 2,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
  },

  actionButton: {
    width: '48%',
    backgroundColor: '#EAF0FB',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  actionText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },

  footerRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  cancelText: {
    color: '#D62828',
    fontSize: 18,
    fontWeight: '700',
  },

  shareBtn: {
    backgroundColor: '#0B1736',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },

  shareText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '700',
  },
});