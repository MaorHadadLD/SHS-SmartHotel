import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { globalStyles, staffHomeStyles } from '../../styles/globalStyle';
import { onValue, ref, getDatabase } from 'firebase/database';
import { Picker } from '@react-native-picker/picker';
import { getAvialableRooms as getAvailableRooms } from '../../API/StaffCalls';

const ReceptionScreen = ({ route, navigation }) => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const staffData = route.params.staffData || {};
  
  useEffect(() => {
    const db = getDatabase();
    const requestsRef = ref(db, 'roomRequests');

    const unsubscribe = onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const requestList = Object.values(data)
          .filter(request => request.hotel.hotelName === staffData.hotel.hotelName && request.hotel.city === staffData.hotel.city)
          .map(request => ({
            checkInDate: request.checkInDate,
            checkOutDate: request.checkOutDate,
            guestEmail: request.guestEmail,
            guestName: request.guestName,
            hotel: request.hotel,
            status: request.status,
          }));
        setRequests(requestList);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchAvailableRooms = async (hotelName) => {
    console.log('fetchAvailableRooms', hotelName);
    try {
      const response = await getAvailableRooms(hotelName);
      if (response.success && response.data !=='No rooms available') {
        const availableRooms = response.data;
        console.log('fetchAvailableRooms availableRooms', response.data);
        setAvailableRooms(availableRooms);
      }
    } catch(error){
      console.error("fetchAvailableRooms", error);
    }
    // const sampleAvailableRooms = ['101', '102', '103', '104'];
    // setAvailableRooms(sampleAvailableRooms);
  };

  const handleRoomAssignment = (guestEmail, selectedRoom) => {
    // Implement the logic to update the room number in the database based on guestEmail and selectedRoom
    // After updating the room number, you can update the request status or remove the request as needed
    // For now, I'll just log the data
    console.log(`Assign room ${selectedRoom} for guest ${guestEmail}`);
  };

  const renderRequestItem = ({ item }) => (
    <View style={staffHomeStyles.requestItem}>
      <Text style={staffHomeStyles.requestItemText}>Guest: {item.guestName}</Text>
      <Text style={staffHomeStyles.requestItemText}>Check-in: {item.checkInDate}</Text>
      <Text style={staffHomeStyles.requestItemText}>Check-out: {item.checkOutDate}</Text>
      <Text style={staffHomeStyles.requestItemText}>Status: {item.status}</Text>
      <Text style={staffHomeStyles.requestItemText}>Hotel: {item.hotel.hotelName} {item.hotel.city}</Text>
      <TouchableOpacity
        style={staffHomeStyles.startCompleteButton}
        onPress={() => {
          setSelectedRequest(item);
          fetchAvailableRooms(item.hotel); // Fetch available rooms when Room assignment button is pressed
          setModalVisible(true);
        }}
      >
        <Text style={staffHomeStyles.startCompleteButtonText}>Room assignment</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRoomPickerItems = () => {
    return availableRooms.map(room => (
      <Picker.Item key={room} label={room} value={room} />
    ));
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Reception Screen</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.guestEmail}
        renderItem={renderRequestItem}
      />
      <View style={staffHomeStyles.staffDetailsContainer}>
        <Text style={staffHomeStyles.detailText}>Receptionist: {staffData.employeeName}</Text>
        <Text style={staffHomeStyles.detailText}>&emsp;&emsp;{staffData.hotel.hotelName} {staffData.hotel.city}</Text>
      </View>

      {/* Room Assignment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedRoom('');
          setSelectedRequest(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Assign Room</Text>
            <Picker
              selectedValue={selectedRoom}
              onValueChange={(itemValue) => setSelectedRoom(itemValue)}
              style={styles.picker}
            >
              {renderRoomPickerItems()}
            </Picker>
            <TouchableOpacity
              style={styles.assignButton}
              onPress={() => {
                handleRoomAssignment(selectedRequest.guestEmail, selectedRoom);
                setModalVisible(false);
                setSelectedRoom('');
                setSelectedRequest(null);
              }}
            >
              <Text style={styles.buttonText}>Assign Room</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setModalVisible(false);
                setSelectedRoom('');
                setSelectedRequest(null);
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 2,
    borderRadius: 10,
    elevation: 5,
    width: 300,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    // height: 50,
    // width: "100%",
    // marginBottom:20,
    // borderColor: '#ccc',
    borderRadius: 9,

  },
  assignButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReceptionScreen;
