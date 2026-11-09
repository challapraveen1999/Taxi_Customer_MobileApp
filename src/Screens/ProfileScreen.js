import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const MENU_ITEMS = [
  { id: '1', title: 'Wallet & Payments', icon: 'wallet-outline', route: 'Wallet' },
  { id: '2', title: 'Settings', icon: 'settings-outline', route: 'Settings' },
  { id: '3', title: 'Help & Support', icon: 'help-buoy-outline', route: 'Help' },
  { id: '4', title: 'Privacy Policy', icon: 'shield-checkmark-outline', route: 'PrivacyPolicy' },
];

const ProfileScreen = ({ navigation }) => {
  
  const handleLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        
        {/* Gradient Profile Header */}
        <LinearGradient colors={['#80DEEA', '#0a6c7b']} style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <Icon name="person" size={40} color="#0EA5E9" />
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.phone}>+1 987 654 3210</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Icon name="pencil" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Menu List */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.menuLeft}>
                <View style={styles.iconWrapper}>
                  <Icon name={item.icon} size={22} color="#2563EB" />
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
            <View style={styles.menuLeft}>
              <View style={[styles.iconWrapper, { backgroundColor: '#FEF2F2' }]}>
                <Icon name="log-out-outline" size={22} color="#EF4444" />
              </View>
              <Text style={styles.logoutText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { padding: 24, paddingTop: 40, paddingBottom: 40, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  profileInfo: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  textInfo: { flex: 1, marginLeft: 16 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  phone: { fontSize: 14, color: '#E0F2FE' },
  editButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  
  menuContainer: { padding: 20, marginTop: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  iconWrapper: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  menuText: { fontSize: 16, fontWeight: '600', color: '#111827' },
  logoutItem: { marginTop: 20 },
  logoutText: { fontSize: 16, fontWeight: '600', color: '#EF4444' },
});

export default ProfileScreen;