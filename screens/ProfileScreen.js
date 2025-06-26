import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { useProfile } from './ProfileContext'; // Adjust path if needed
import { useNavigation, CommonActions } from '@react-navigation/native';

export default function ProfileScreen() {
  const { setProfile, profile } = useProfile();
  const navigation = useNavigation();

  const handleLogout = () => {
    setProfile({
      name: '',
      email: '',
      phone: '',
      bio: '',
    });

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      })
    );
  };

  const showAbout = () => {
    Alert.alert(
      'About Us',
      'Welcome to FlyBook — your one-stop app for booking flights and hotels across Pakistan. Discover, book, and explore with ease!'
    );
  };

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Can't open this URL: ${url}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{profile.name || 'Guest User'}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editProfile}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Settings */}
      <View style={styles.settingsSection}>
        <TouchableOpacity
          style={styles.settingBtn}
          onPress={() => navigation.navigate('AccountSettings')}
        >
          <Text style={styles.settingText}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingBtn}
          onPress={() => navigation.navigate('HelpSupport')}
        >
          <Text style={styles.settingText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingBtn} onPress={showAbout}>
          <Text style={styles.settingText}>About Us</Text>
        </TouchableOpacity>
      </View>

      {/* Follow Us */}
      <View style={styles.socialSection}>
        <Text style={styles.socialTitle}>Follow Us</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity
            onPress={() => openLink('https://instagram.com/yourapp')}
            activeOpacity={0.7}
          >
            <Image
              source={require('../assets/instagram.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openLink('https://twitter.com/yourapp')}
            activeOpacity={0.7}
          >
            <Image
              source={require('../assets/twitter.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openLink('https://facebook.com/yourapp')}
            activeOpacity={0.7}
          >
            <Image
              source={require('../assets/facebook.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout */}
      <View style={styles.logoutSection}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const NAVY = '#0A0F29';
const WHITE = '#FFFFFF';
const LIGHT = '#EAF0FF';
const BLUE = '#2D6CDF';
const RED = '#FF4C4C';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingVertical: 30,
    borderRadius: 18,
    shadowColor: NAVY,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 40,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: NAVY,
    marginBottom: 12,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: NAVY,
  },
  editProfile: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '600',
    color: BLUE,
  },
  settingsSection: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: NAVY,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  settingBtn: {
    backgroundColor: NAVY,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 16,
  },
  settingText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  socialSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  socialTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 18,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  logoutSection: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoutButton: {
    backgroundColor: RED,
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: RED + 'AA',
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 6,
  },
  logoutText: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 18,
  },
});
