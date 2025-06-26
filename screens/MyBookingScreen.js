import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const loadBookings = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('bookings');
      const savedBookings = jsonValue != null ? JSON.parse(jsonValue) : [];
      setBookings(savedBookings);
    } catch (e) {
      console.error('Failed to load bookings:', e);
    }
  };

  const deleteBooking = async (id) => {
    const updated = bookings.filter((item) => item.id !== id);
    setBookings(updated);
    await AsyncStorage.setItem('bookings', JSON.stringify(updated));
    Alert.alert('Deleted', 'The booking has been deleted.');
    setSelectedId(null);
    setIsEditing(false);
  };

  const saveEditedBooking = async () => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === editData.id ? editData : booking
    );
    setBookings(updatedBookings);
    await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setIsEditing(false);
    Alert.alert('Updated', 'Booking has been updated.');
  };

  const handleEditPress = (item) => {
    setIsEditing(true);
    setEditData(item);
  };

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedId;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.info}>Type: {item.type}</Text>
        <Text style={styles.info}>Class: {item.seatClass}</Text>
        <Text style={styles.info}>Price: Rs {item.price}</Text>

        {isSelected ? (
          isEditing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={editData.name}
                onChangeText={(text) => setEditData({ ...editData, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={editData.phone}
                onChangeText={(text) => setEditData({ ...editData, phone: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={editData.email}
                onChangeText={(text) => setEditData({ ...editData, email: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Payment Method"
                value={editData.paymentMethod}
                onChangeText={(text) => setEditData({ ...editData, paymentMethod: text })}
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={saveEditedBooking}
                >
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => {
                    setIsEditing(false);
                    setEditData({});
                  }}
                >
                  <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.info}>Passenger: {item.name}</Text>
              <Text style={styles.info}>Phone: {item.phone}</Text>
              <Text style={styles.info}>Email: {item.email}</Text>
              <Text style={styles.info}>Payment: {item.paymentMethod}</Text>
              <Text style={styles.info}>Date: {item.date}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => handleEditPress(item)}
                >
                  <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => deleteBooking(item.id)}
                >
                  <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => {
                    setSelectedId(null);
                    setIsEditing(false);
                  }}
                >
                  <Text style={styles.btnText}>Close</Text>
                </TouchableOpacity>
              </View>
            </>
          )
        ) : (
          <TouchableOpacity
            style={styles.viewBtn}
            onPress={() => setSelectedId(item.id)}
          >
            <Text style={styles.btnText}>View</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={styles.empty}>No bookings yet.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: '#0A0F29',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    borderLeftWidth: 4,
    borderColor: '#0A0F29',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A0F29',
    marginBottom: 6,
  },
  info: {
    fontSize: 15,
    color: '#1C2A46',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    color: '#1C2A46',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  viewBtn: {
    marginTop: 12,
    backgroundColor: '#0A0F29',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: '#1C5D99',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: '#D90429',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  cancelBtn: {
    backgroundColor: '#8D99AE',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'flex-start',
  },
});

export default MyBookingsScreen;
