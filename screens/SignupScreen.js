import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  Alert, KeyboardAvoidingView, Platform, ScrollView, Dimensions,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SignupScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextPassword, setSecureTextPassword] = useState(true);
  const [secureTextConfirm, setSecureTextConfirm] = useState(true);

  const handleSignup = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const userExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        Alert.alert('Account Exists', 'Email is already registered.');
        return;
      }

      const newUser = { name, email, phone, password };
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      Alert.alert('Success', 'Account created! You can now log in.');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.scrollContent}>
          {/* LOGO ADDED HERE */}
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Sign Up</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            placeholderTextColor="#B0C4DB"
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#B0C4DB"
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#B0C4DB"
            returnKeyType="next"
          />

          {/* Password Input with Eye Icon */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextPassword}
              placeholderTextColor="#B0C4DB"
              returnKeyType="next"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setSecureTextPassword(!secureTextPassword)}
            >
              <Ionicons
                name={secureTextPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#7B8BBE"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input with Eye Icon */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={secureTextConfirm}
              placeholderTextColor="#B0C4DB"
              returnKeyType="done"
              onSubmitEditing={handleSignup}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setSecureTextConfirm(!secureTextConfirm)}
            >
              <Ionicons
                name={secureTextConfirm ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#7B8BBE"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignup}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SCREEN_WIDTH * 0.07,
  },
  scrollWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#243E8B',
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 18,
    fontSize: 16,
    color: '#243E8B',
    borderWidth: 1.5,
    borderColor: '#4466CC',
    shadowColor: '#4466CC',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 18,
  },
  passwordInput: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    fontSize: 16,
    color: '#243E8B',
    borderWidth: 1.5,
    borderColor: '#4466CC',
    shadowColor: '#4466CC',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  button: {
    backgroundColor: '#243E8B',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#1A2D73',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
