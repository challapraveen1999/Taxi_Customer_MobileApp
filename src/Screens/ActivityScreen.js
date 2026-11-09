import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const rideHistoryData = [
  {
    id: '1',
    from: 'Hitech City',
    to: 'Ameerpet Metro Station',
    date: 'Mar 22, 2024, 10:30 AM',
    price: '₹185',
    status: 'Completed',
    vehicle: 'Mini Car'
  },
  {
    id: '2',
    from: 'Inorbit Mall',
    to: 'Home',
    date: 'Mar 21, 2024, 8:15 PM',
    price: '₹120',
    status: 'Canceled',
    vehicle: 'Auto'
  },
  {
    id: '3',
    from: 'Office',
    to: 'Secunderabad Railway Station',
    date: 'Mar 20, 2024, 9:00 AM',
    price: '₹250',
    status: 'Completed',
    vehicle: 'Taxi 4'
  },
  {
    id: '4',
    from: 'RGIA Airport',
    to: 'KPHB Colony',
    date: 'Mar 19, 2024, 11:00 PM',
    price: '₹750',
    status: 'Completed',
    vehicle: 'Big Taxi'
  },
];

const ActivityScreen = () => {

  const renderRideItem = ({ item }) => (
    <TouchableOpacity style={styles.rideItem}>
      <View style={styles.rideDetails}>
        <View style={styles.locationRow}>
          <Icon name="radio-button-on" size={16} color="#22C55E" />
          <Text style={styles.locationText} numberOfLines={1}>{item.from}</Text>
        </View>
        <View style={styles.locationRow}>
          <Icon name="location" size={16} color="#EF4444" />
          <Text style={styles.locationText} numberOfLines={1}>{item.to}</Text>
        </View>
      </View>
      <View style={styles.rideMeta}>
        <Text style={styles.rideDate}>{item.date}</Text>
        <Text style={styles.ridePrice}>{item.price}</Text>
      </View>
      <View style={styles.rideFooter}>
        <Text style={[styles.status, item.status === 'Completed' ? styles.statusCompleted : styles.statusCanceled]}>
          {item.status}
        </Text>
        <TouchableOpacity style={styles.rebookButton}>
          <Text style={styles.rebookText}>Rebook</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ride History</Text>
      </View>
      <FlatList
        data={rideHistoryData}
        renderItem={renderRideItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.content}>
            <Text style={styles.placeholderText}>No ride history yet.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  listContainer: {
    padding: 16,
  },
  rideItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  rideDetails: {
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
    fontWeight: '600',
  },
  rideMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  rideDate: {
    fontSize: 13,
    color: '#6B7280',
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statusCompleted: {
    color: '#16A34A',
    backgroundColor: '#DCFCE7',
  },
  statusCanceled: {
    color: '#DC2626',
    backgroundColor: '#FEE2E2',
  },
  rebookButton: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  rebookText: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '50%',
  },
  placeholderText: {
    fontSize: 16,
    color: '#6B7280',
  },
});
export default ActivityScreen;