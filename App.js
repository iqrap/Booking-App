import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import SplashScreen from './screens/SplashScreen';
import ExploreScreen from './screens/ExploreScreen';
import FlightsList from './screens/FlightsList';
import HotelsList from './screens/HotelsList';
import HotelDetailsScreen from './screens/HotelDetailsScreen';
import HotelBookingScreen from './screens/HotelBookingScreen';
import HotelPaymentScreen from './screens/HotelPaymentScreen';
import FlightPaymentScreen from './screens/FlightPaymentScreen';
import MyBookingScreen from './screens/MyBookingScreen';
import BookingDetailsScreen from './screens/BookingDetailsScreen';

// Profile-related Screens
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import AccountSettingsScreen from './screens/AccountSettingsScreen';
import HelpSupportScreen from './screens/HelpSupportScreen';

// Auth Screens
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';

// Context
import { ProfileProvider } from './screens/ProfileContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1E90FF',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Explore') iconName = 'search-outline';
          else if (route.name === 'MyBookings') iconName = 'clipboard-outline';

          else if (route.name === 'Profile') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="MyBookings" component={MyBookingScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerTitleAlign: 'center' }}
        >
          {/* Splash screen */}
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          {/* Auth Screens */}
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PasswordResetScreen"
            component={PasswordResetScreen}
            options={{ title: 'Reset Password' }}
          />

          {/* Main App Tabs */}
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />

          {/* Other Screens */}
          <Stack.Screen name="FlightsList" component={FlightsList} options={{ title: 'Flights' }} />
          <Stack.Screen name="HotelsList" component={HotelsList} options={{ title: 'Hotels' }} />
          <Stack.Screen name="HotelDetails" component={HotelDetailsScreen} options={{ title: 'Hotel Details' }} />
          <Stack.Screen name="HotelBooking" component={HotelBookingScreen} options={{ title: 'Book Hotel' }} />
          <Stack.Screen name="HotelPayment" component={HotelPaymentScreen} options={{ title: 'Hotel Payment' }} />
          <Stack.Screen name="FlightPaymentScreen" component={FlightPaymentScreen} options={{ title: 'Payment' }} />
          <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} options={{ title: 'Booking Details' }} />
          {/* Profile Screens */}
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
          <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} options={{ title: 'Account Settings' }} />
          <Stack.Screen name="HelpSupport" component={HelpSupportScreen} options={{ title: 'Help & Support' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
}
