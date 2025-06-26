import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const hotels = [
  {
    id: '1',
    name: 'Serena Hotel',
    location: 'Islamabad',
    price: 'Rs 25,000/night',
    image: require('../assets/hotel1.jpg'),
  },
  {
    id: '2',
    name: 'PC Bhurban',
    location: 'Murree',
    price: 'Rs 18,000/night',
    image: require('../assets/hotel2.jpg'),
  },
  {
    id: '3',
    name: 'Pearl Continental Karachi',
    location: 'Karachi',
    price: 'Rs 22,000/night',
    image: require('../assets/hotel3.jpg'),
  },
  {
    id: '4',
    name: 'Avari Towers',
    location: 'Karachi',
    price: 'Rs 20,000/night',
    image: require('../assets/hotel4.jpg'),
  },
  {
    id: '5',
    name: 'Nishat Hotel',
    location: 'Lahore',
    price: 'Rs 15,000/night',
    image: require('../assets/hotel5.jpg'),
  },
  {
    id: '6',
    name: 'Pearl Continental Lahore',
    location: 'Lahore',
    price: 'Rs 23,000/night',
    image: require('../assets/hotel6.jpg'),
  },
  {
    id: '7',
    name: 'Beach Luxury Hotel',
    location: 'Gwadar',
    price: 'Rs 12,000/night',
    image: require('../assets/hotel7.jpg'),
  },
  {
    id: '8',
    name: 'Hotel One Islamabad',
    location: 'Islamabad',
    price: 'Rs 14,000/night',
    image: require('../assets/hotel8.jpg'),
  },
  {
    id: '9',
    name: 'The Centaurus Hotel',
    location: 'Islamabad',
    price: 'Rs 19,000/night',
    image: require('../assets/hotel9.jpg'),
  },
  {
    id: '10',
    name: 'Hill View Hotel',
    location: 'Murree',
    price: 'Rs 10,000/night',
    image: require('../assets/hotel10.jpg'),
  },
  {
    id: '11',
    name: 'Pearl Continental Peshawar',
    location: 'Peshawar',
    price: 'Rs 17,000/night',
    image: require('../assets/hotel11.jpg'),
  },
  {
    id: '12',
    name: 'Marriott Hotel Karachi',
    location: 'Karachi',
    price: 'Rs 24,000/night',
    image: require('../assets/hotel12.jpg'),
  },
  {
    id: '13',
    name: 'Hotel Margala',
    location: 'Islamabad',
    price: 'Rs 16,000/night',
    image: require('../assets/hotel13.jpg'),
  },
  {
    id: '14',
    name: 'Serena Hotel Swat',
    location: 'Swat',
    price: 'Rs 21,000/night',
    image: require('../assets/hotel14.jpg'),
  },
  {
    id: '15',
    name: 'Faletti’s Hotel',
    location: 'Lahore',
    price: 'Rs 18,000/night',
    image: require('../assets/hotel15.jpg'),
  },
];

const HotelsList = () => {
  const navigation = useNavigation();

  const renderHotel = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('HotelDetails', { hotel: item })}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id}
        renderItem={renderHotel}
        contentContainerStyle={{ padding: 15 }}
      />
    </SafeAreaView>
  );
};

export default HotelsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1D37', // Deep navy blue background
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: 120,
    height: 100,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  textContainer: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A1D37', // Dark navy text for readability on white
  },
  location: {
    fontSize: 15,
    color: '#495867', // Cool gray-blue
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0077B6', // Accent blue
  },
});
