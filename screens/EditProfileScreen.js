import React from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, ScrollView,
} from 'react-native';
import { useProfile } from './ProfileContext'; // Adjust path as needed

export default function EditProfileScreen({ navigation }) {
  const { profile, setProfile } = useProfile();

  const handleSave = () => {
    Alert.alert('Success', 'Your profile has been updated!');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={() => Alert.alert('Feature coming soon!')}>
          <Text style={styles.changePhoto}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={profile.name}
        onChangeText={(text) => setProfile({ ...profile, name: text })}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={profile.email}
        onChangeText={(text) => setProfile({ ...profile, email: text })}
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={profile.phone}
        onChangeText={(text) => setProfile({ ...profile, phone: text })}
      />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
        multiline
        numberOfLines={4}
        value={profile.bio}
        onChangeText={(text) => setProfile({ ...profile, bio: text })}
      />

      <View style={styles.saveButton}>
        <Button title="Save Changes" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  profileImageContainer: { alignItems: 'center', marginBottom: 30 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  changePhoto: { color: '#1E90FF', marginTop: 8, fontWeight: '600' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 6,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  saveButton: { marginTop: 30 },
});
