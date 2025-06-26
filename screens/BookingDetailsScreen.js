import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('bookings');
      const savedBookings = jsonValue ? JSON.parse(jsonValue) : [];
      setBookings(savedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  useEffect(() => {
    // Load bookings every time screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      loadBookings();
    });
    return unsubscribe;
  }, []);

  const renderBooking = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.info}>Type: {item.type}</Text>
      <Text style={styles.info}>Class: {item.seatClass}</Text>
      <Text style={styles.info}>Price: Rs {item.price}</Text>
      <Text style={styles.info}>Date: {item.date}</Text>
      <Text style={styles.info}>Passenger: {item.name}</Text>
      <Text style={styles.info}>Email: {item.email}</Text>
      <Text style={styles.info}>Phone: {item.phone}</Text>
      <Text style={styles.info}>Payment Method: {item.paymentMethod}</Text>

      {/* Payment details */}
      {item.paymentMethod === 'Credit Card' && (
        <>
          <Text style={styles.info}>Card Number: **** **** **** {item.paymentDetails.cardNumber.slice(-4)}</Text>
          <Text style={styles.info}>Expiry: {item.paymentDetails.expiry}</Text>
        </>
      )}
      {item.paymentMethod === 'PayPal' && (
        <Text style={styles.info}>PayPal Email: {item.paymentDetails.paypalEmail}</Text>
      )}
      {item.paymentMethod === 'Bank Transfer' && (
        <>
          <Text style={styles.info}>Bank: {item.paymentDetails.bankName}</Text>
          <Text style={styles.info}>Account Number: {item.paymentDetails.accountNumber}</Text>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {bookings.length === 0 ? (
        <Text style={styles.emptyText}>No bookings yet.</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBooking}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </SafeAreaView>
  );
};

export default MyBookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F6F2',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#023047',
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
});
