import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function PasswordResetScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextNewPassword, setSecureTextNewPassword] = useState(true);
  const [secureTextConfirmPassword, setSecureTextConfirmPassword] = useState(true);

  const handleReset = async () => {
    if (!email || !newPassword || !confirmPassword) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 8 characters and include a letter, a number, and a special character.'
      );
      return;
    }

    try {
      const usersData = await AsyncStorage.getItem('users');
      let users = usersData ? JSON.parse(usersData) : [];

      const userIndex = users.findIndex(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (userIndex === -1) {
        Alert.alert('Not Found', 'No account found with this email.');
        return;
      }

      console.log('Before update:', users[userIndex]);

      users[userIndex].password = newPassword;

      console.log('After update:', users[userIndex]);

      await AsyncStorage.setItem('users', JSON.stringify(users));

      Alert.alert('Success', 'Password updated successfully!');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#B0C4DB"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={secureTextNewPassword}
          placeholderTextColor="#B0C4DB"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureTextNewPassword(!secureTextNewPassword)}
        >
          <Ionicons
            name={secureTextNewPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#7B8BBE"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={secureTextConfirmPassword}
          placeholderTextColor="#B0C4DB"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureTextConfirmPassword(!secureTextConfirmPassword)}
        >
          <Ionicons
            name={secureTextConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#7B8BBE"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', paddingHorizontal: 30 },
  title: { fontSize: 28, fontWeight: '700', color: '#243E8B', marginBottom: 30, textAlign: 'center' },
  input: {
    backgroundColor: '#FFFFFF', paddingVertical: 14, paddingHorizontal: 20,
    borderRadius: 14, marginBottom: 18, fontSize: 16, color: '#243E8B',
    borderWidth: 1.5, borderColor: '#4466CC',
    shadowColor: '#4466CC', shadowOpacity: 0.1, shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 }, elevation: 3,
  },
  passwordContainer: { position: 'relative', marginBottom: 18 },
  passwordInput: {
    backgroundColor: '#FFFFFF', paddingVertical: 14, paddingHorizontal: 20,
    borderRadius: 14, fontSize: 16, color: '#243E8B',
    borderWidth: 1.5, borderColor: '#4466CC',
    shadowColor: '#4466CC', shadowOpacity: 0.1, shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 }, elevation: 3,
  },
  eyeIcon: { position: 'absolute', right: 20, top: 16 },
  button: {
    backgroundColor: '#243E8B', paddingVertical: 14, borderRadius: 14,
    alignItems: 'center', marginTop: 10,
    shadowColor: '#1A2D73', shadowOpacity: 0.3, shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 }, elevation: 6,
  },
  buttonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 18, letterSpacing: 0.5 },
});
