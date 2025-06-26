import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';

export default function AccountSettingsScreen() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [locationAccess, setLocationAccess] = useState(false);
  const [dataSaver, setDataSaver] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>

      {/* Privacy Section */}
      <Text style={styles.sectionHeader}>Privacy</Text>
      <SettingToggle
        label="Private Account"
        value={isPrivate}
        onValueChange={setIsPrivate}
      />
      <SettingToggle
        label="Location Access"
        value={locationAccess}
        onValueChange={setLocationAccess}
      />

      {/* Security Section */}
      <Text style={styles.sectionHeader}>Security</Text>
      <SettingToggle
        label="Two-Factor Authentication"
        value={twoFactorAuth}
        onValueChange={setTwoFactorAuth}
      />

      {/* Preferences Section */}
      <Text style={styles.sectionHeader}>Preferences</Text>
      <SettingToggle
        label="Data Saver Mode"
        value={dataSaver}
        onValueChange={setDataSaver}
      />
    </ScrollView>
  );
}

// Reusable Toggle Component
function SettingToggle({ label, value, onValueChange }) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fefefe',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginTop: 25,
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
  },
});
