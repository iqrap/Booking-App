import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const flights = [
  { id: '1', airline: 'PIA', route: 'Islamabad to Skardu', price: 'Rs 15,000', 
    departureTime: '08:00 AM', arrivalTime: '09:30 AM', duration: '1h 30m',
    image: require('../assets/flight1.jpg') },
    
  { id: '2', airline: 'AirBlue', route: 'Karachi to Naran', price: 'Rs 12,000', 
    departureTime: '07:15 AM', arrivalTime: '09:00 AM', duration: '1h 45m',
    image: require('../assets/flight2.jpg') }, 
    
  { id: '3', airline: 'SereneAir', route: 'Lahore to Hunza', price: 'Rs 18,000',
    departureTime: '10:00 AM', arrivalTime: '12:30 PM', duration: '2h 30m',
    image: require('../assets/flight3.jpg') },
    
  { id: '4', airline: 'PIA', route: 'Islamabad to Gilgit', price: 'Rs 16,500',
    departureTime: '01:00 PM', arrivalTime: '02:45 PM', duration: '1h 45m',
    image: require('../assets/flight4.jpg') },
    
  { id: '5', airline: 'AirBlue', route: 'Karachi to Chitral', price: 'Rs 20,000',
    departureTime: '03:30 PM', arrivalTime: '05:15 PM', duration: '1h 45m',
    image: require('../assets/flight5.jpg') },
    
  { id: '6', airline: 'SereneAir', route: 'Peshawar to Swat', price: 'Rs 10,000',
    departureTime: '06:00 AM', arrivalTime: '06:45 AM', duration: '45m',
    image: require('../assets/flight6.jpg') },
    
  { id: '7', airline: 'PIA', route: 'Islamabad to Muzaffarabad', price: 'Rs 14,000',
    departureTime: '09:30 AM', arrivalTime: '10:45 AM', duration: '1h 15m',
    image: require('../assets/flight7.jpg') },
    
  { id: '8', airline: 'AirBlue', route: 'Quetta to Ziarat', price: 'Rs 13,000',
    departureTime: '11:00 AM', arrivalTime: '11:50 AM', duration: '50m',
    image: require('../assets/flight8.jpg') },
    
  { id: '9', airline: 'SereneAir', route: 'Lahore to Murree', price: 'Rs 9,000',
    departureTime: '02:00 PM', arrivalTime: '03:00 PM', duration: '1h',
    image: require('../assets/flight9.jpg') },
    
  { id: '10', airline: 'PIA', route: 'Karachi to Gwadar', price: 'Rs 19,000',
    departureTime: '05:00 PM', arrivalTime: '07:00 PM', duration: '2h',
    image: require('../assets/flight10.jpg') },
    
  { id: '11', airline: 'AirBlue', route: 'Islamabad to Skardu', price: 'Rs 15,500',
    departureTime: '08:30 AM', arrivalTime: '10:00 AM', duration: '1h 30m',
    image: require('../assets/flight1.jpg') },
    
  { id: '12', airline: 'SereneAir', route: 'Lahore to Skardu', price: 'Rs 17,500',
    departureTime: '09:00 AM', arrivalTime: '11:30 AM', duration: '2h 30m',
    image: require('../assets/flight3.jpg') },
    
  { id: '13', airline: 'PIA', route: 'Karachi to Islamabad', price: 'Rs 12,500',
    departureTime: '07:00 AM', arrivalTime: '09:15 AM', duration: '2h 15m',
    image: require('../assets/flight10.jpg') },
    
  { id: '14', airline: 'AirBlue', route: 'Peshawar to Naran', price: 'Rs 13,500',
    departureTime: '12:00 PM', arrivalTime: '13:30 PM', duration: '1h 30m',
    image: require('../assets/flight6.jpg') },
    
  { id: '15', airline: 'SereneAir', route: 'Quetta to Chagai', price: 'Rs 21,000',
    departureTime: '04:00 PM', arrivalTime: '06:15 PM', duration: '2h 15m',
    image: require('../assets/flight8.jpg') },
];


const FlightsList = () => {
  const navigation = useNavigation();

  const renderFlight = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('FlightPaymentScreen', { flight: item, selectedClass: 'Economy' })}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.airline}>{item.airline}</Text>
        <Text style={styles.route}>{item.route}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={flights}
        keyExtractor={(item) => item.id}
        renderItem={renderFlight}
        contentContainerStyle={{ padding: 15 }}
      />
    </SafeAreaView>
  );
};

export default FlightsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF6FF', // soft sky blue background
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // white card
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#1E90FF',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: 120,
    height: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  textContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  airline: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007ACC', // sky blue dark text
  },
  route: {
    fontSize: 15,
    color: '#333333',
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00A6FB', // brighter blue
  },
});
