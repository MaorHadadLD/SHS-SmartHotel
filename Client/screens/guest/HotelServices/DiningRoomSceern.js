import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';
import firebaseApp from '../../../firebaseConfig';


const hotelDishes = {
  breakfast: [
    { id: '1', name: 'Omelette' },
    { id: '2', name: 'Scrambled Eggs' },
    { id: '3', name: 'Egg Ein' },
    { id: '4', name: "Chef's Special Breakfast" },
  ],
  lunch: [
    { id: '5', name: 'Schnitzel' },
    { id: '6', name: 'Chicken Breast' },
    { id: '7', name: "Chef's Special Lunch" },
  ],
  dinner: [
    { id: '8', name: 'Beef Fillet' },
    { id: '9', name: 'Fish' },
    { id: '10', name: "Chef's Special Dinner" },
  ],
};

function DiningRoomScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [numberOfDiners, setNumberOfDiners] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleReservation = () => {
    try {
      // Get a reference to the database
      const db = getDatabase(firebaseApp);
  
      // Create a reference to the 'diningRoomReservations' node in the database
      const diningRoomReservationsRef = ref(db, 'diningRoomReservations');
  
      // Push the reservation data to the database
      const newReservationRef = push(diningRoomReservationsRef, {
        numberOfDiners,
        arrivalTime,
        roomNumber,
        timestamp: new Date().toISOString(), // Include a timestamp for record keeping
      });
  
      console.log('Dining Room Reservation added with ID:', newReservationRef.key);
  
      // Dining Room Reservation successfully sent to the server
      console.log('Dining Room Reservation successful!');
    } catch (error) {
      // Handle errors
      console.error('Error during Dining Room Reservation:', error.message);
    }
  
    // Close the modal after handling the reservation
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Breakfast</Text>
      <FlatList
        data={hotelDishes.breakfast}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />

      <Text style={styles.header}>Lunch</Text>
      <FlatList
        data={hotelDishes.lunch}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />

      <Text style={styles.header}>Dinner</Text>
      <FlatList
        data={hotelDishes.dinner}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />

      {/* Order Table Button */}
      <TouchableOpacity style={styles.orderButton} onPress={toggleModal}>
        <Text style={styles.orderButtonText}>Reserve a Table</Text>
      </TouchableOpacity>

      {/* Reservation Modal */}
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Make a Reservation</Text>

            <TextInput
              style={styles.input}
              placeholder="Number of Diners"
              keyboardType="numeric"
              value={numberOfDiners}
              onChangeText={(text) => setNumberOfDiners(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Arrival Time"
              value={arrivalTime}
              onChangeText={(text) => setArrivalTime(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Room Number"
              keyboardType="numeric"
              value={roomNumber}
              onChangeText={(text) => setRoomNumber(text)}
            />

            <TouchableOpacity style={styles.reserveButton} onPress={handleReservation}>
              <Text style={styles.reserveButtonText}>Reserve</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  item: {
    fontSize: 16,
    marginVertical: 8,
  },
  orderButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  reserveButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
});

export default DiningRoomScreen;
