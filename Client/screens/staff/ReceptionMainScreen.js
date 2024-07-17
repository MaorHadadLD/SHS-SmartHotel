import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { globalStyles, staffHomeStyles } from '../../styles/globalStyle';
import { onValue, ref, getDatabase } from 'firebase/database';
import { Picker } from '@react-native-picker/picker';
import { getAvailableRooms, updateRoomStatusAndGuestRoom } from '../../API/StaffCalls';
import { Banner } from 'react-native-paper';



const ReceptionMainScreen = ({ route, navigation }) => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
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
            roomNumber: request.roomNumber,
          }));
        setRequests(requestList);
      }
    });

    const chatRef = ref(db, 'chats');
    const unsubscribeChats = onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const messages = snapshot.val();
        if (Object.values(messages).some(message => message.sender === 'guest')) {
          setBannerVisible(true);
        }
      }
    });

    return () => {
      unsubscribe();
      unsubscribeChats();
    };
  }, [staffData.hotel.hotelName, staffData.hotel.city]);

  const fetchAvailableRooms = async (hotel) => {
    console.log('fetchAvailableRooms', hotel);
    try {
      const response = await getAvailableRooms(hotel);
      if (response.success && response.data !== 'No rooms available') {
        const availableRooms = response.data;
        setAvailableRooms(availableRooms);
      } else {
        setAvailableRooms([]);
        alert('No rooms available');
      }
    } catch (error) {
      console.error("fetchAvailableRooms", error);
    }
  };

  const handleRoomAssignment = async (guestEmail, selectedRoom) => {
    console.log(`Assign room ${selectedRoom} for guest ${guestEmail}`);
    try {
      const result = await updateRoomStatusAndGuestRoom(guestEmail, selectedRoom, staffData.hotel, 'occupied');
      if (result.success) {
        setRequests(prevRequests => prevRequests.filter(request => request.guestEmail !== guestEmail));
        fetchAvailableRooms(staffData.hotel);
      }
    } catch (error) {
      console.error('handleRoomAssignment', error);
    }
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
          fetchAvailableRooms(item.hotel);
          setModalVisible(true);
        }}
      >
        <Text style={staffHomeStyles.startCompleteButtonText}>Room assignment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={staffHomeStyles.startCompleteButton}
        onPress={() => {
          navigation.navigate('ReceptionChatScreen', { roomNumber: item.roomNumber });
        }}
      >
        <Text style={staffHomeStyles.startCompleteButtonText}>Chat</Text>
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
      <Banner
        visible={bannerVisible}
        actions={[
          {
            label: 'Dismiss',
            onPress: () => setBannerVisible(false),
          },
        ]}
        icon="message"
      >
        You have received new messages.
      </Banner>
      
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

export default ReceptionMainScreen;
