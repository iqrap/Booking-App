import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const flights = [
  {
    id: '1',
    airline: 'PIA',
    route: 'Islamabad to Skardu',
    price: 'Rs 15,000',
    image: require('../assets/flight1.jpg'),
  },
  {
    id: '2',
    airline: 'AirBlue',
    route: 'Karachi to Naran',
    price: 'Rs 12,000',
    image: require('../assets/flight2.jpg'),
  },
];

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
];

const flightsIcon = require('../assets/flights-icon.png');
const hotelsIcon = require('../assets/hotels-icon.png');
const headerBanner = require('../assets/banner.jpg');

const ExploreScreen = () => {
  const navigation = useNavigation();

  const renderFlight = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('FlightDetails', { flight: item })}
      activeOpacity={0.85}
    >
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.airline}</Text>
      <Text style={styles.cardSubtitle}>{item.route}</Text>
      <Text style={styles.cardPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  const renderHotel = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('HotelDetails', { hotel: item })}
      activeOpacity={0.85}
    >
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubtitle}>{item.location}</Text>
      <Text style={styles.cardPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={headerBanner} style={styles.bannerImage} />

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => navigation.navigate('FlightsList')}
          >
            <Image source={flightsIcon} style={styles.optionIcon} />
            <Text style={styles.optionText}>Flights</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => navigation.navigate('HotelsList')}
          >
            <Image source={hotelsIcon} style={styles.optionIcon} />
            <Text style={styles.optionText}>Hotels</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Popular Flights</Text>
        <FlatList
          data={flights}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderFlight}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 15, paddingBottom: 10 }}
        />

        <Text style={styles.sectionTitle}>Recommended Hotels</Text>
        <FlatList
          data={hotels}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderHotel}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 15, paddingBottom: 30 }}
        />

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Why Book With Us?</Text>
          <Text style={styles.infoText}>
            ✓ Best prices guaranteed.{'\n'}
            ✓ Easy cancellation and refunds.{'\n'}
            ✓ 24/7 customer support.{'\n'}
            ✓ Trusted by thousands of travelers across Pakistan.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bannerImage: {
    width: screenWidth,
    height: 180,
    resizeMode: 'cover',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  optionCard: {
    backgroundColor: '#0A0F29',
    width: 140,
    height: 140,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
  },
  optionIcon: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginHorizontal: 20,
    marginBottom: 12,
    color: '#0A0F29',
    borderLeftWidth: 4,
    borderColor: '#0A0F29',
    paddingLeft: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 18,
    padding: 14,
    width: 220,
    shadowColor: '#132043',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
    borderWidth: 1,
    borderColor: '#E3E8F0',
    alignItems: 'center',
  },card: {
  backgroundColor: '#F9FAFB', // changed from '#FFFFFF'
  borderRadius: 16,
  marginRight: 18,
  padding: 14,
  width: 220,
  shadowColor: '#132043',
  shadowOpacity: 0.3,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 6 },
  elevation: 10,
  borderWidth: 1,
  borderColor: '#E3E8F0',
  alignItems: 'center',
},

  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A0F29',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#4C5C77',
    marginTop: 4,
    fontWeight: '500',
  },
  cardPrice: {
    marginTop: 10,
    fontWeight: '700',
    fontSize: 16,
    color: '#0A0F29',
  },
  infoSection: {
    marginTop: 30,
    backgroundColor: '#F0F4FA',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
    color: '#0A0F29',
  },
  infoText: {
    fontSize: 16,
    color: '#1C2A46',
    lineHeight: 28,
    fontWeight: '500',
  },
});
