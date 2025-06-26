import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const paymentMethods = [
  { name: 'Credit Card', icon: <Ionicons name="card-outline" size={24} color="#001F54" /> },
  { name: 'PayPal', icon: <Ionicons name="logo-paypal" size={24} color="#001F54" /> },
  { name: 'Bank Transfer', icon: <FontAwesome5 name="university" size={24} color="#001F54" /> },
];

const flightClasses = ['Economy', 'Business'];

const FlightPaymentScreen = ({ route, navigation }) => {
  const { flight } = route.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].name);
  const [selectedClass, setSelectedClass] = useState(flightClasses[0]);

  // Payment details state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankName, setBankName] = useState('');

  // Parse numeric price from flight.price string (e.g., "Rs. 10,000" -> 10000)
  const numericPrice = Number(flight.price.replace(/[^\d]/g, ''));

  // Calculate price with 50% increase if Business class is selected
  const adjustedPrice =
    selectedClass === 'Business' ? Math.round(numericPrice * 1.5) : numericPrice;

  // Format price with Rs. and commas
  const formattedPrice = `Rs. ${adjustedPrice.toLocaleString()}`;

  const handleBooking = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Error', 'Please fill all your personal information fields');
      return;
    }

    if (paymentMethod === 'Credit Card') {
      if (!cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) {
        Alert.alert('Error', 'Please fill all credit card details');
        return;
      }
    } else if (paymentMethod === 'PayPal') {
      if (!paypalEmail.trim()) {
        Alert.alert('Error', 'Please enter your PayPal email');
        return;
      }
    } else if (paymentMethod === 'Bank Transfer') {
      if (!bankAccount.trim() || !bankName.trim()) {
        Alert.alert('Error', 'Please enter your bank account details');
        return;
      }
    }

    Alert.alert(
      'Booking Confirmed',
      `Thank you ${name}! Your flight from ${flight.route} has been booked.\nClass: ${selectedClass}\nPayment Method: ${paymentMethod}\nPrice: ${formattedPrice}`,
      [{ text: 'OK', onPress: () => navigation.navigate('FlightsList') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Confirm Your Booking</Text>

        {/* Flight info card */}
        <View style={styles.card}>
          <Text style={styles.flightTitle}>{flight.airline}</Text>
          <Text style={styles.flightRoute}>{flight.route}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>DepartureTime:</Text>
            <Text style={styles.detailValue}>
              {flight.departureTime ? flight.departureTime : ''}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ArrivalTime:</Text>
            <Text style={styles.detailValue}>
              {flight.arrivalTime ? flight.arrivalTime : ''}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration:</Text>
            <Text style={styles.detailValue}>{flight.duration || ''}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Class:</Text>
            <Text style={styles.detailValue}>{selectedClass}</Text>
          </View>

          {/* Updated Price display */}
          <Text style={styles.price}>{formattedPrice}</Text>
          {selectedClass === 'Business' && (
            <Text style={styles.priceIncrease}>
              Business class price increases by 50%
            </Text>
          )}
        </View>

        {/* User info and payment card */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Your Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#6b7a8f"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#6b7a8f"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#6b7a8f"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          {/* Class selection with radio buttons */}
          <Text style={[styles.sectionHeader, { marginTop: 24 }]}>Select Class</Text>
          <View style={styles.classOptions}>
            {flightClasses.map(cls => (
              <TouchableOpacity
                key={cls}
                style={styles.classOption}
                onPress={() => setSelectedClass(cls)}
                activeOpacity={0.7}
              >
                <View style={[styles.radioOuter, selectedClass === cls && styles.radioSelected]}>
                  {selectedClass === cls && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.classText}>{cls}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionHeader, { marginTop: 24 }]}>Select Payment Method</Text>
          <View style={styles.paymentMethods}>
            {paymentMethods.map(({ name: methodName, icon }) => (
              <TouchableOpacity
                key={methodName}
                style={[
                  styles.methodButton,
                  paymentMethod === methodName && styles.methodSelected,
                ]}
                onPress={() => setPaymentMethod(methodName)}
                activeOpacity={0.8}
              >
                <View style={styles.iconWrapper}>
                  {React.cloneElement(icon, {
                    color: paymentMethod === methodName ? '#fff' : '#001F54',
                  })}
                </View>
                <Text
                  style={[
                    styles.methodText,
                    paymentMethod === methodName && styles.methodTextSelected,
                  ]}
                >
                  {methodName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Conditional payment inputs */}
          {paymentMethod === 'Credit Card' && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                placeholderTextColor="#6b7a8f"
                keyboardType="number-pad"
                value={cardNumber}
                onChangeText={setCardNumber}
                maxLength={16}
              />
              <TextInput
                style={styles.input}
                placeholder="Expiry Date (MM/YY)"
                placeholderTextColor="#6b7a8f"
                value={expiryDate}
                onChangeText={setExpiryDate}
                maxLength={5}
              />
              <TextInput
                style={styles.input}
                placeholder="CVV"
                placeholderTextColor="#6b7a8f"
                keyboardType="number-pad"
                value={cvv}
                onChangeText={setCvv}
                maxLength={4}
                secureTextEntry
              />
            </>
          )}

          {paymentMethod === 'PayPal' && (
            <TextInput
              style={styles.input}
              placeholder="PayPal Email"
              placeholderTextColor="#6b7a8f"
              keyboardType="email-address"
              value={paypalEmail}
              onChangeText={setPaypalEmail}
              autoCapitalize="none"
            />
          )}

          {paymentMethod === 'Bank Transfer' && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Bank Account Number"
                placeholderTextColor="#6b7a8f"
                keyboardType="number-pad"
                value={bankAccount}
                onChangeText={setBankAccount}
              />
              <TextInput
                style={styles.input}
                placeholder="Bank Name"
                placeholderTextColor="#6b7a8f"
                value={bankName}
                onChangeText={setBankName}
              />
            </>
          )}

          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBooking}
            activeOpacity={0.9}
          >
            <Text style={styles.bookButtonText}>Book Flight</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlightPaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#001F54',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f7f9fc',
    borderRadius: 14,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#001F54',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 5,
  },
  flightTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#001F54',
    marginBottom: 4,
  },
  flightRoute: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#374151',
  },
  detailValue: {
    color: '#4b5563',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#001F54',
    textAlign: 'right',
    marginTop: 12,
  },
  priceIncrease: {
    color: '#d13434',
    fontWeight: '700',
    marginTop: 6,
    fontSize: 14,
    textAlign: 'right',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#001F54',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#001F54',
    marginBottom: 14,
  },
  classOptions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  classOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#001F54',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioSelected: {
    borderColor: '#001F54',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#001F54',
  },
  classText: {
    fontSize: 16,
    color: '#001F54',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#001F54',
    width: '30%',
    justifyContent: 'center',
  },
  methodSelected: {
    backgroundColor: '#001F54',
  },
  iconWrapper: {
    marginRight: 8,
  },
  methodText: {
    color: '#001F54',
    fontWeight: '600',
    fontSize: 14,
  },
  methodTextSelected: {
    color: '#fff',
  },
  bookButton: {
    backgroundColor: '#001F54',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 28,
    shadowColor: '#001F54',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
