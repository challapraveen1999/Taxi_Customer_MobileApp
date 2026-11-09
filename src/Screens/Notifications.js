import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const notificationsData = [
  {
    id: '1',
    type: 'ride_success',
    title: 'Ride Completed',
    message: 'Your ride to Hitech City has been successfully completed.',
    time: '10:30 AM',
    read: false,
  },
  {
    id: '2',
    type: 'promo',
    title: '50% OFF on your next ride!',
    message: 'Use code: RIDE50 to get a discount on your next trip.',
    time: 'Yesterday',
    read: false,
  },
  {
    id: '3',
    type: 'driver_assigned',
    title: 'Driver Assigned',
    message: 'Ramesh is on his way to pick you up.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'Account Update',
    message: 'Your profile information has been updated successfully.',
    time: 'Mar 20, 2024',
    read: true,
  },
    {
    id: '5',
    type: 'ride_canceled',
    title: 'Ride Canceled',
    message: 'Your ride to Ameerpet Metro Station has been canceled.',
    time: 'Mar 19, 2024',
    read: true,
  },
];

const Notifications = ({ navigation }) => {

  const getIconForType = (type) => {
    switch (type) {
      case 'ride_success':
        return { name: 'checkmark-circle', color: '#22C55E' };
      case 'promo':
        return { name: 'pricetag', color: '#F59E0B' };
      case 'driver_assigned':
        return { name: 'car-sport', color: '#3B82F6' };
      case 'ride_canceled':
        return { name: 'close-circle', color: '#EF4444' };
      default:
        return { name: 'notifications', color: '#6B7280' };
    }
  };

  const renderNotificationItem = ({ item }) => {
    const icon = getIconForType(item.type);
    return (
      <TouchableOpacity style={[styles.notificationItem, !item.read && styles.unreadItem]}>
        <View style={[styles.iconContainer, { backgroundColor: `${icon.color}20` }]}>
          <Icon name={icon.name} size={24} color={icon.color} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage} numberOfLines={2}>{item.message}</Text>
        </View>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={notificationsData}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}><Text style={styles.emptyText}>You have no notifications yet.</Text></View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  listContainer: { padding: 16 },
  notificationItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  unreadItem: { backgroundColor: '#EFF6FF', borderLeftWidth: 4, borderLeftColor: '#3B82F6' },
  iconContainer: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  textContainer: { flex: 1 },
  notificationTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  notificationMessage: { fontSize: 14, color: '#4B5563', marginTop: 2 },
  notificationTime: { fontSize: 12, color: '#6B7280', alignSelf: 'flex-start', marginLeft: 8 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '50%' },
  emptyText: { fontSize: 16, color: '#6B7280' },
});

export default Notifications;