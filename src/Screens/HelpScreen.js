import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>How can we help you?</Text>

        <TouchableOpacity style={styles.contactCard}>
          <Icon name="chatbubbles" size={24} color="#2563EB" />
          <View style={styles.contactDetails}>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactDesc}>Typically replies within 5 minutes</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard}>
          <Icon name="call" size={24} color="#0EA5E9" />
          <View style={styles.contactDetails}>
            <Text style={styles.contactTitle}>Call Support</Text>
            <Text style={styles.contactDesc}>Available 24/7 for emergencies</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#FFFFFF' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 24 },
  
  contactCard: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', 
    padding: 20, borderRadius: 16, marginBottom: 16, 
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 
  },
  contactDetails: { marginLeft: 16 },
  contactTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  contactDesc: { fontSize: 14, color: '#6B7280' },
});
export default HelpScreen;