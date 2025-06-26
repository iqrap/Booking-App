import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const HotelDetailsScreen = ({ route, navigation }) => {
  const { hotel } = route.params;

  // Booking info
  const [checkIn, setCheckIn] = useState('2025-06-01');
  const [checkOut, setCheckOut] = useState('2025-06-03');
  const [rooms, setRooms] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  // Payment details
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankName, setBankName] = useState('');

  // *** New user info fields ***
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const hotelDetailsData = {
    'Serena Hotel': {
      description: 'Serena Hotel Islamabad offers luxury accommodations...',
      amenities: ['Free Wi-Fi', 'Spa & Wellness', 'Outdoor Pool', '24/7 Room Service'],
      rating: 4.8,
      pricePerRoom: 15000,
    },
    'PC Bhurban': {
      description: 'Nestled in the hills of Murree...',
      amenities: ['Mountain Views', 'Conference Rooms', 'Fitness Center', 'Restaurant'],
      rating: 4.5,
      pricePerRoom: 12000,
    },
  };

  const details = hotelDetailsData[hotel.name] || {
    description: 'Enjoy your stay...',
    amenities: ['Free Wi-Fi', 'Room Service', 'Parking', 'Restaurant'],
    rating: 4.0,
    pricePerRoom: 10000,
  };

  const parsedRooms = parseInt(rooms) || 1;
  const totalPrice = details.pricePerRoom * parsedRooms;

  const icons = {
    'Credit Card': <FontAwesome5 name="credit-card" size={20} color="#001F54" />,
    PayPal: <MaterialCommunityIcons name="paypal" size={20} color="#001F54" />,
    'Bank Transfer': <Entypo name="bank" size={20} color="#001F54" />,
  };

  const handlePaymentConfirm = () => {
    // Validate user info
    if (!userName.trim() || !userEmail.trim() || !userPhone.trim()) {
      Alert.alert('Missing Info', 'Please enter your name, email, and phone number.');
      return;
    }

    // Validate booking info
    if (!checkIn || !checkOut || parsedRooms <= 0) {
      Alert.alert('Invalid Input', 'Please enter valid booking details.');
      return;
    }

    // Validate payment info depending on method
    if (paymentMethod === 'Credit Card' && (!cardNumber || !expiry || !cvv)) {
      Alert.alert('Missing Info', 'Please enter your credit card details.');
      return;
    }

    if (paymentMethod === 'PayPal' && !paypalEmail) {
      Alert.alert('Missing Info', 'Please enter your PayPal email.');
      return;
    }

    if (paymentMethod === 'Bank Transfer' && (!bankAccount || !bankName)) {
      Alert.alert('Missing Info', 'Please enter your bank details.');
      return;
    }

    Alert.alert(
      'Payment Success',
      `Thank you ${userName}!\nYour payment for ${parsedRooms} room(s) at ${hotel.name} is confirmed.\nTotal: Rs ${totalPrice.toLocaleString()}`,
      [{ text: 'OK', onPress: () => navigation.navigate('MyBookings') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={hotel.image} style={styles.image} resizeMode="cover" />

        <View style={styles.card}>
          <Text style={styles.name}>{hotel.name}</Text>
          <Text style={styles.location}>{hotel.location}</Text>
          <Text style={styles.price}>Rs {details.pricePerRoom.toLocaleString()} / night</Text>
          <Text style={styles.description}>{details.description}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            {details.amenities.map((amenity, idx) => (
              <Text key={idx} style={styles.amenity}>• {amenity}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rating</Text>
            <Text style={styles.rating}>{details.rating} ★</Text>
          </View>
        </View>

        {/* User Info Section */}
        <View style={styles.paymentCard}>
          <Text style={styles.title}>Your Information</Text>

          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={userName}
            onChangeText={setUserName}
          />

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={userEmail}
            onChangeText={setUserEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={userPhone}
            onChangeText={setUserPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Booking & Payment Section */}
        <View style={styles.paymentCard}>
          <Text style={styles.title}>Booking & Payment</Text>

          <Text style={styles.inputLabel}>Check-in Date</Text>
          <TextInput style={styles.input} value={checkIn} onChangeText={setCheckIn} placeholder="YYYY-MM-DD" />

          <Text style={styles.inputLabel}>Check-out Date</Text>
          <TextInput style={styles.input} value={checkOut} onChangeText={setCheckOut} placeholder="YYYY-MM-DD" />

          <Text style={styles.inputLabel}>Number of Rooms</Text>
          <TextInput style={styles.input} value={rooms} onChangeText={setRooms} keyboardType="numeric" />

          <Text style={styles.detail}>
            <Text style={styles.label}>Total Price:</Text> Rs {totalPrice.toLocaleString()}
          </Text>

          <Text style={styles.selectTitle}>Select Payment Method</Text>
          <View style={styles.paymentMethods}>
            {['Credit Card', 'PayPal', 'Bank Transfer'].map((method) => (
              <TouchableOpacity
                key={method}
                style={[styles.methodButton, paymentMethod === method && styles.methodSelected]}
                onPress={() => setPaymentMethod(method)}
              >
                <View style={styles.iconWrapper}>{icons[method]}</View>
                <Text style={[styles.methodText, paymentMethod === method && styles.methodTextSelected]}>
                  {method}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Conditional Inputs */}
          {paymentMethod === 'Credit Card' && (
            <>
              <TextInput style={styles.input} placeholder="Card Number" value={cardNumber} onChangeText={setCardNumber} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="Expiry Date (MM/YY)" value={expiry} onChangeText={setExpiry} />
              <TextInput style={styles.input} placeholder="CVV" value={cvv} onChangeText={setCvv} keyboardType="numeric" />
            </>
          )}

          {paymentMethod === 'PayPal' && (
            <TextInput style={styles.input} placeholder="PayPal Email" value={paypalEmail} onChangeText={setPaypalEmail} keyboardType="email-address" />
          )}

          {paymentMethod === 'Bank Transfer' && (
            <>
              <TextInput style={styles.input} placeholder="Account Number" value={bankAccount} onChangeText={setBankAccount} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="Bank Name" value={bankName} onChangeText={setBankName} />
            </>
          )}

          <TouchableOpacity style={styles.confirmButton} onPress={handlePaymentConfirm}>
            <Text style={styles.confirmButtonText}>Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 20 },
  image: { width: '100%', height: 200 },
  card: { padding: 16 },
  name: { fontSize: 24, fontWeight: '700', color: '#001F54' },
  location: { fontSize: 14, color: '#666', marginVertical: 4 },
  price: { fontSize: 18, fontWeight: '600', color: '#E94F37', marginVertical: 8 },
  description: { fontSize: 14, color: '#444', marginBottom: 8 },
  section: { marginVertical: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#001F54', marginBottom: 4 },
  amenity: { fontSize: 14, color: '#333', marginLeft: 8, marginVertical: 2 },
  rating: { fontSize: 16, fontWeight: '600', color: '#E9B425' },
  paymentCard: {
    backgroundColor: '#F9F9F9',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: '700', color: '#001F54', marginBottom: 12 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#001F54', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 14,
    color: '#001F54',
  },
  detail: { fontSize: 16, marginVertical: 8 },
  label: { fontWeight: '700', color: '#001F54' },
  selectTitle: { fontSize: 16, fontWeight: '700', marginVertical: 8, color: '#001F54' },
  paymentMethods: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  methodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 6,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  methodSelected: { borderColor: '#001F54', backgroundColor: '#D7E3F4' },
  iconWrapper: { marginRight: 6 },
  methodText: { fontSize: 12, color: '#001F54' },
  methodTextSelected: { fontWeight: '700' },
  confirmButton: {
    backgroundColor: '#001F54',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  confirmButtonText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
});

export default HotelDetailsScreen;
