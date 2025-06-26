import React from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';

export default function HelpSupportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help & Support</Text>
      <Text style={styles.paragraph}>Need help? Feel free to contact our support team.</Text>

      <Button
        title="Email Support"
        onPress={() => Linking.openURL('mailto:support@travelapp.com')}
      />

      <View style={{ height: 20 }} />

      <Button
        title="Visit Help Center"
        onPress={() => Linking.openURL('https://travelapp.com/help')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  paragraph: { fontSize: 16, marginBottom: 20 },
});
