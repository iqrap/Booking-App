import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons or use react-native-vector-icons

export default function HotelBookingScreen({ route, navigation }) {
  const { hotel } = route.params;
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState('1');

  const numericPrice = parseInt(hotel.price.replace(/[^\d]/g, ''));
  const totalPrice = numericPrice * parseInt(rooms || 1);

  const handleBooking = () => {
    if (!checkIn || !checkOut || !rooms) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }

    navigation.navigate('HotelPaymentt', {
      hotel,
      checkIn,
      checkOut,
      rooms,
      totalPrice,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={hotel.image} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.name}>{hotel.name}</Text>
        <Text style={styles.location}>
          <Ionicons name="location-sharp" size={16} color="#6C7A89" /> {hotel.location}
        </Text>
        <Text style={styles.price}>Price: {hotel.price}</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Check-in Date</Text>
          <View style={styles.inputRow}>
            <MaterialIcons name="date-range" size={20} color="#6C7A89" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={checkIn}
              onChangeText={setCheckIn}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Check-out Date</Text>
          <View style={styles.inputRow}>
            <MaterialIcons name="date-range" size={20} color="#6C7A89" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={checkOut}
              onChangeText={setCheckOut}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number of Rooms</Text>
          <View style={styles.inputRow}>
            <Ionicons name="bed-outline" size={20} color="#6C7A89" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. 2"
              keyboardType="numeric"
              value={rooms}
              onChangeText={setRooms}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <Text style={styles.totalPrice}>Total: Rs {totalPrice.toLocaleString()}</Text>

        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F4F8',
    paddingBottom: 30,
  },
  image: {
    width: '100%',
    height: 220,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  details: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -3 },
    elevation: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1B1F3B',
  },
  location: {
    fontSize: 15,
    color: '#6C7A89',
    marginTop: 4,
  },
  price: {
    fontSize: 17,
    color: '#0077B6',
    marginVertical: 14,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2F7',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    color: '#000',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0077B6',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#1E90FF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
