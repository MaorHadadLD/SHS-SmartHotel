import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import firebase from '../../firebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';

function HotelSelection({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [hotelData, setHotelData] = useState([]);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const db = getDatabase(firebase);
        const hotelsRef = ref(db, 'Hotels/');
        const snapshot = await get(hotelsRef);
        const data = snapshot.val();

        if (data) {
          const hotels = Object.values(data);
          setHotelData(hotels);
        }
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotelData();
  }, []);

  const handleSelectHotel = (item) => {
    navigation.navigate('CodeQRScreen', {
      selectedHotel: item,
    });
    setModalVisible(false);
  };

  const renderClassHotelItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectHotel(item)}>
      <View style={styles.hotelItem}>
        <Text>{item.hotelName}</Text>
        <Text>{item.city}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose the hotel where you are staying</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.showModalButton}>Show Hotel List</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Hotel List</Text>
          <FlatList
            data={hotelData}
            keyExtractor={(item) =>`${item.hotelName}-${item.city}`}
            renderItem={renderClassHotelItem}
            numColumns={1}
            key={(item, index) => index.toString()}
          />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
            <Text style={styles.closeModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',  // Center content vertically
    alignItems: 'center',      // Center content horizontally
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  showModalButton: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 16,
  },
  modalContainer: {
    marginTop: 64,
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingTop: 2,
      },
      android: {
        paddingTop: 0,
      },
    }),
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  closeModalButton: {
    marginTop: 16,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  closeModalButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  hotelItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default HotelSelection;
