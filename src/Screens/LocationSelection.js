import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    StatusBar,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import Ionicons from 'react-native-vector-icons/Ionicons';

const LocationSelection = ({ navigation }) => {
    const [destination, setDestination] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [pickup, setPickup] = useState('Current Location');
    const [pickupCoords, setPickupCoords] = useState({ latitude: 17.4483, longitude: 78.3915 });
    const [isMapVisible, setIsMapVisible] = useState(false);
    const [tempPickupCoords, setTempPickupCoords] = useState({ latitude: 17.4483, longitude: 78.3915 });
    const mapRef = useRef(null);

    const suggestions = [
        {
            id: '1',
            title: 'Ameerpet Metro Station',
            address: 'Ameerpet, Hyderabad',
            latitude: 17.4355,
            longitude: 78.4443,
        },
        {
            id: '2',
            title: 'Hitech City',
            address: 'Madhapur, Hyderabad',
            latitude: 17.4435,
            longitude: 78.3772,
        },
        {
            id: '3',
            title: 'RGIA Airport',
            address: 'Shamshabad, Hyderabad',
            latitude: 17.2403,
            longitude: 78.4294,
        },
        {
            id: '4',
            title: 'KPHB Colony',
            address: 'Kukatpally, Hyderabad',
            latitude: 17.4843,
            longitude: 78.3889,
        },
        {
            id: '5',
            title: 'Inorbit Mall',
            address: 'Madhapur, Hyderabad',
            latitude: 17.4337,
            longitude: 78.3868,
        },
        {
            id: '6',
            title: 'Secunderabad Railway Station',
            address: 'Secunderabad, Hyderabad',
            latitude: 17.4330,
            longitude: 78.5016,
        },
        {
            id: '7',
            title: 'Nexus Mall',
            address: 'Kukatpally, Hyderabad',
            latitude: 17.4844,
            longitude: 78.3897,
        },
        {
            id: '8',
            title: 'Sarath City Capital Mall',
            address: 'Kondapur, Hyderabad',
            latitude: 17.4576,
            longitude: 78.3640,
        },
        {
            id: '9',
            title: 'GVK One Mall',
            address: 'Banjara Hills, Hyderabad',
            latitude: 17.4193,
            longitude: 78.4485,
        },
    ];

    const recentSearches = [
        {
            id: '101',
            title: 'Home',
            address: 'Miyapur, Hyderabad',
            latitude: 17.4968,
            longitude: 78.3614,
        },
        {
            id: '102',
            title: 'Office',
            address: 'Hitech City, Hyderabad',
            latitude: 17.4435,
            longitude: 78.3772,
        },
        {
            id: '103',
            title: 'Airport',
            address: 'RGIA Airport',
            latitude: 17.2403,
            longitude: 78.4294,
        },
    ];

    const filteredSuggestions = suggestions.filter(item =>
        item.title.toLowerCase().includes(destination.toLowerCase()),
    );

    const handleLocationSelect = item => {
        setDestination(item.title);
        setSelectedLocation(item);
        
        const pickupData = {
            title: pickup,
            latitude: pickupCoords.latitude,
            longitude: pickupCoords.longitude,
        };

        navigation.navigate('RideSelection', {
            pickupLocation: pickupData,
            dropLocation: item,
        });
    };

    const renderSuggestion = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleLocationSelect(item)}>
            <LinearGradient colors={['#0a6c7b', '#80DEEA']} style={styles.locationCard}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Ionicons
                    name="location-outline"
                    size={22}
                    color="#FFF"
                />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={[styles.locationTitle, { color: '#FFF' }]}>
                    {item.title}
                </Text>

                <Text style={[styles.locationAddress, { color: '#E0F7FA' }]}>
                    {item.address}
                </Text>
            </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    const renderHistory = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleLocationSelect(item)}>
            <LinearGradient colors={['#0a6c7b', '#80DEEA']} style={styles.locationCard}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Ionicons
                    name="time-outline"
                    size={22}
                    color="#FFF"
                />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={[styles.locationTitle, { color: '#FFF' }]}>
                    {item.title}
                </Text>

                <Text style={[styles.locationAddress, { color: '#E0F7FA' }]}>
                    {item.address}
                </Text>
            </View>
            </LinearGradient>
        </TouchableOpacity>
    );

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
                    onPress={() => navigation.goBack()}>
                    <Ionicons
                        name="arrow-back"
                        size={25}
                        color="#FFF"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    RapidRide
                </Text>

                <TouchableOpacity>
                    <Ionicons
                        name="help-circle-outline"
                        size={25}
                        color="#FFF"
                    />
                </TouchableOpacity>
            </View>

            {/* SEARCH CARD */}

            <LinearGradient colors={['#0a6c7b', '#80DEEA']} style={styles.searchCard}>
                <View style={styles.row}>
                    <View style={styles.leftIndicator}>
                        <View style={[styles.pickupDot, { borderColor: '#FFF' }]} />

                        <View style={[styles.verticalLine, { backgroundColor: 'rgba(255,255,255,0.4)' }]} />

                        <Ionicons
                            name="location"
                            size={18}
                            color="#FFF"
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <TextInput
                            value={pickup}
                            onChangeText={setPickup}
                            placeholder="Pickup Location"
                            placeholderTextColor="#E0F7FA"
                            style={styles.pickupInput}
                        />

                        <View style={[styles.destinationInputContainer, { borderColor: 'rgba(255,255,255,0.5)' }]}>
                            <TextInput
                                placeholder="Where to?"
                                placeholderTextColor="#E0F7FA"
                                value={destination}
                                onChangeText={(text) => {
                                    setDestination(text);
                                    setSelectedLocation(null);
                                }}
                                style={styles.destinationInput}
                            />
                            {destination.length > 0 && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setDestination('');
                                        setSelectedLocation(null);
                                    }}>
                                    <Ionicons name="close-circle" size={20} color="#E0F7FA" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </LinearGradient>

            {/* CURRENT LOCATION */}

            <TouchableOpacity onPress={() => setIsMapVisible(true)}>
                <LinearGradient colors={['#0a6c7b', '#80DEEA']} style={styles.currentLocationBtn}>
                <Ionicons
                    name="locate"
                    size={20}
                    color="#FFF"
                />

                <Text style={[styles.currentLocationText, { color: '#FFF' }]}>
                    Pick Current Location
                </Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* SUGGESTIONS */}

            {destination.length > 0 && !selectedLocation ? (<>
                <Text style={styles.sectionTitle}>
                    SUGGESTIONS
                </Text>

                <FlatList
                    data={filteredSuggestions}
                    keyExtractor={item => item.id}
                    renderItem={renderSuggestion}
                    showsVerticalScrollIndicator={false}
                />
            </>
            ) : (
                <>
                    <Text style={styles.sectionTitle}>
                        RECENT SEARCHES
                    </Text>

                    <FlatList
                        data={recentSearches}
                        keyExtractor={item => item.id}
                        renderItem={renderHistory}
                        showsVerticalScrollIndicator={false}
                    />
                </>

            )}
            </SafeAreaView>

            {/* MAP PICKER MODAL */}
            <Modal visible={isMapVisible} animationType="slide">
                <View style={{ flex: 1 }}>
                    <MapView
                        ref={mapRef}
                        provider={PROVIDER_GOOGLE}
                        style={{ flex: 1 }}
                        initialRegion={{
                            ...pickupCoords,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        onRegionChangeComplete={(region) => {
                            console.log('Map Dragged to:', region.latitude, region.longitude);
                            setTempPickupCoords({ latitude: region.latitude, longitude: region.longitude });
                        }}
                    />
                    <View style={styles.centerPointer}>
                        <Ionicons name="location" size={40} color="#D62828" />
                    </View>
                    <SafeAreaView style={styles.mapModalHeader}>
                        <TouchableOpacity onPress={() => setIsMapVisible(false)} style={styles.mapCloseBtn}>
                            <Ionicons name="arrow-back" size={24} color="#111" />
                        </TouchableOpacity>
                        <Text style={styles.mapModalTitle}>Set Pickup Location</Text>
                    </SafeAreaView>
                    <TouchableOpacity 
                        style={styles.mapCurrentLocBtn}
                        onPress={() => {
                            const staticCurrent = { latitude: 17.4483, longitude: 78.3915 }; // Madhapur mock
                            mapRef.current?.animateToRegion({ ...staticCurrent, latitudeDelta: 0.01, longitudeDelta: 0.01 });
                        }}>
                        <Ionicons name="locate" size={24} color="#00BCD4" />
                    </TouchableOpacity>
                    <View style={styles.mapConfirmContainer}>
                        <TouchableOpacity style={styles.mapConfirmBtn} onPress={() => {
                            console.log('Confirmed Pinned Location Coordinates:', tempPickupCoords);
                            setPickupCoords(tempPickupCoords);
                            setPickup('Pinned Location');
                            setIsMapVisible(false);
                        }}>
                            <Text style={styles.mapConfirmText}>Confirm Location</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};

export default LocationSelection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },

    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFF',
    },

    searchCard: {
        margin: 15,
        borderRadius: 16,
        padding: 15,
        elevation: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },

    row: {
        flexDirection: 'row',
    },

    leftIndicator: {
        width: 30,
        alignItems: 'center',
        marginTop: 12,
    },

    pickupDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#7B8DFF',
    },

    verticalLine: {
        width: 2,
        height: 40,
        backgroundColor: '#D9D9D9',
        marginVertical: 5,
    },

    pickupInput: {
        height: 50,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 15,
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
    },

    destinationInputContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 55,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#00BCD4',
        paddingHorizontal: 15,
    },
    
    destinationInput: {
        flex: 1,
        fontSize: 16,
        color: '#FFF',
    },

    currentLocationBtn: {
        marginHorizontal: 15,
        borderRadius: 12,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },

    currentLocationText: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: '600',
        color: '#00BCD4',
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#E0F7FA',
        paddingHorizontal: 15,
        marginVertical: 10,
    },

    locationCard: {
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 12,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },

    iconCircle: {
        width: 45,
        height: 45,
        borderRadius: 22,
        backgroundColor: '#F1F3F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    locationTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
    },

    locationAddress: {
        fontSize: 13,
        color: '#777',
        marginTop: 3,
    },

    centerPointer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -20,
        marginTop: -40,
        zIndex: 2,
    },
    mapModalHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFF',
        elevation: 4,
    },
    mapCloseBtn: {
        padding: 5,
        marginRight: 10,
    },
    mapModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
    },
    mapCurrentLocBtn: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        backgroundColor: '#FFF',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    mapConfirmContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    mapConfirmBtn: {
        backgroundColor: '#0a6c7b',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 5,
    },
    mapConfirmText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});