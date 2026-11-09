import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Alert,
    StatusBar,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';

import Ionicons from 'react-native-vector-icons/Ionicons';

const RideSelectionScreen = ({ navigation, route }) => {
    const mapRef = useRef(null);

    const pickupLocation =
        route?.params?.pickupLocation?.title ||
        'Current Location';

    const dropLocation =
        route?.params?.dropLocation?.title ||
        'Destination';

    const [selectedVehicle, setSelectedVehicle] =
        useState(null);

    const vehicles = [
        {
            id: '1',
            name: 'Bike',
            price: '₹50',
            eta: '2 min',
            icon: 'bicycle-outline',
        },
        {
            id: '2',
            name: 'Auto',
            price: '₹80',
            eta: '3 min',
            icon: 'car-outline',
        },
        {
            id: '3',
            name: 'Mini Car',
            price: '₹120',
            eta: '4 min',
            icon: 'car-sport-outline',
        },
        {
            id: '4',
            name: 'Taxi 4',
            price: '₹150',
            eta: '5 min',
            icon: 'car-sport',
        },
        {
            id: '5',
            name: 'Taxi 7',
            price: '₹220',
            eta: '7 min',
            icon: 'bus-outline',
        },
        {
            id: '6',
            name: 'Big Taxi',
            price: '₹300',
            eta: '10 min',
            icon: 'bus',
        },
    ];

    // Dynamically retrieve the coordinates passed from LocationSelection, with a fallback
    const pickupCoords = {
        latitude: route?.params?.pickupLocation?.latitude || 17.4483,
        longitude: route?.params?.pickupLocation?.longitude || 78.3915,
    };
    const dropCoords = {
        latitude: route?.params?.dropLocation?.latitude || 17.4355,
        longitude: route?.params?.dropLocation?.longitude || 78.4443,
    };

    const fitMapToRoute = () => {
        console.log('Map has finished loading tiles in RideSelection');
        if (mapRef.current) {
            mapRef.current.fitToCoordinates([pickupCoords, dropCoords], {
                edgePadding: { top: 50, right: 50, bottom: 120, left: 50 },
                animated: true,
            });
        }
    };

    useEffect(() => {
        console.log('RideSelectionScreen mounted, map should render.');
    }, []);

    const handleConfirm = () => {
        if (!selectedVehicle) {
            Alert.alert(
                'Select Vehicle',
                'Please select a vehicle first',
            );
            return;
        }

        navigation.navigate('RideAccept', {
            vehicle: selectedVehicle,
        });
    };

    const renderVehicle = ({ item }) => {
        const isSelected =
            selectedVehicle?.id === item.id;

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                    setSelectedVehicle(item)
                }
                style={[
                    styles.vehicleCard,
                    isSelected &&
                    styles.selectedVehicle,
                ]}>
                <View style={styles.vehicleIcon}>
                    <Ionicons
                        name={item.icon}
                        size={24}
                        color="#333"
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.vehicleName}>{item.name}</Text>
                    <Text style={styles.vehicleEta}>{item.eta}</Text>
                </View>

                <Text style={styles.price}>
                    {item.price}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <LinearGradient colors={['#80DEEA', '#0a6c7b']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    barStyle="light-content"
                />
                {/* HEADER */}

                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.goBack()
                        }>
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="#FFF"
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        RapidRide
                    </Text>

                    <TouchableOpacity>
                        <Ionicons
                            name="help-circle-outline"
                            size={22}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                </View>

                {/* MAP AREA */}

                <View style={styles.mapContainer}>
                    <MapView
                        ref={mapRef}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: (pickupCoords.latitude + dropCoords.latitude) / 2,
                            longitude: (pickupCoords.longitude + dropCoords.longitude) / 2,
                            latitudeDelta: 0.08,
                            longitudeDelta: 0.08,
                        }}
                        onMapReady={() => console.log('Map is ready in RideSelection')}
                        onMapLoaded={fitMapToRoute}
                    >
                        <Polyline
                            coordinates={[pickupCoords, dropCoords]}
                            strokeColor="#0a6c7b"
                            strokeWidth={4}
                            lineDashPattern={[0]}
                        />
                        <Marker coordinate={pickupCoords} title={pickupLocation}>
                            <View style={styles.customPickupMarker}>
                                <View style={styles.customPickupMarkerInner} />
                            </View>
                        </Marker>
                        <Marker coordinate={dropCoords} title={dropLocation}>
                            <Ionicons name="location" size={36} color="#D62828" />
                        </Marker>
                    </MapView>
                    <View style={styles.locationCard}>
                        <View style={styles.locationRow}>
                            <View style={styles.leftIndicator}>
                                <View style={styles.pickupDot} />
                                <View style={styles.verticalLine} />
                                <Ionicons name="location" size={16} color="#ff3b30" />
                            </View>
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Text style={styles.locationText}>{pickupLocation}</Text>
                                <View style={styles.divider} />
                                <Text style={styles.locationText}>{dropLocation}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* BOTTOM SHEET */}

                <View style={styles.bottomSheet}>
                    <View style={styles.dragLine} />

                    <Text style={styles.chooseRide}>
                        Choose a ride
                    </Text>
                    <ScrollView>

                        <FlatList
                            data={vehicles}
                            keyExtractor={item => item.id}
                            renderItem={renderVehicle}
                            showsVerticalScrollIndicator={false}
                            style={{ flex: 1, marginBottom: 10 }}
                            contentContainerStyle={{ paddingVertical: 5, paddingBottom: 10 }}
                        />

                    </ScrollView>

                </View>
                <View style={{ padding: 15}}>
                    <TouchableOpacity
                        style={[
                            styles.confirmButton,
                            !selectedVehicle && {
                                backgroundColor:
                                    '#7A7A7A',
                            },
                        ]}
                        onPress={handleConfirm}>
                        <Text
                            style={styles.confirmText}>
                            {selectedVehicle
                                ? 'Confirm Booking'
                                : 'Select Vehicle'}
                        </Text>

                        <Ionicons
                            name="arrow-forward"
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default RideSelectionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },

    header: {
        height: 60,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:
            'space-between',
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
    },

    mapContainer: {
        flex: 1.2,
    },
    map: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },

    customPickupMarker: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(10, 108, 123, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customPickupMarkerInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#0a6c7b',
        borderWidth: 2,
        borderColor: '#fff',
    },

    locationCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 18,
        elevation: 5,
        margin: 15,
    },

    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    leftIndicator: {
        width: 20,
        alignItems: 'center',
    },

    verticalLine: {
        width: 2,
        height: 30,
        backgroundColor: '#D9D9D9',
        marginVertical: 4,
    },

    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 15,
    },

    pickupDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#7B8DFF',
    },

    locationText: {
        fontSize: 15,
        color: '#222',
        flex: 1,
    },

    bottomSheet: {
        flex: 1,
        // backgroundColor: '#a7dfd6',
        padding: 15,
        marginhorizontal: 20,
        marginvertical: 10,
        borderRadius: 20,
    },

    dragLine: {
        width: 50,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#D0D0D0',
        alignSelf: 'center',
    },

    chooseRide: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fcf7f7',
        marginTop: 15,
        marginBottom: 15,
    },

    vehicleCard: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E6E6E6',
    },

    selectedVehicle: {
        borderWidth: 2,
        borderColor: '#111',
        backgroundColor: '#EEF4FF',
    },

    vehicleIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#F1F4F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    vehicleName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
    },

    vehicleEta: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },

    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
    },

    paymentRow: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

    paymentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    paymentText: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
    },

    switchText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#00A6C7',
    },

    confirmButton: {
        height: 56,
        backgroundColor: '#000',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    confirmText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
        marginRight: 8,
    },
});