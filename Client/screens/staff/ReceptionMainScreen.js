import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, ImageBackground } from 'react-native';
import { onValue, ref, getDatabase } from 'firebase/database';
import { Picker } from '@react-native-picker/picker';
import { getAvailableRooms, updateRoomStatusAndGuestRoom } from '../../API/StaffCalls';
import { Banner } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import LogoutButton from '../../components/LogoutButton';

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
    <View style={styles.requestCard}>
      <Text style={styles.requestHeader}>Guest: {item.guestName}</Text>
      <Text style={styles.requestStatus}>Check-in: {item.checkInDate}</Text>
      <Text style={styles.requestStatus}>Check-out: {item.checkOutDate}</Text>
      <Text style={styles.requestStatus}>Status: {item.status}</Text>
      <Text style={styles.requestStatus}>Hotel: {item.hotel.hotelName} {item.hotel.city}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.startButton]}
          onPress={() => {
            setSelectedRequest(item);
            fetchAvailableRooms(item.hotel);
            setModalVisible(true);
          }}
        >
          <Ionicons name="play-circle" size={24} color="white" />
          <Text style={styles.buttonText}>Assign Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRoomPickerItems = () => {
    return availableRooms.map(room => (
      <Picker.Item key={room} label={room} value={room} />
    ));
  };

  return (
    <ImageBackground source={require('../../assets/reception.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>Reception Screen</Text>
       
        <FlatList
          data={requests}
          keyExtractor={(item) => item.guestEmail}
          renderItem={renderRequestItem}
        />
        <View style={styles.staffDetailsContainer}>
          <Text style={styles.staffDetailsText}>Receptionist: {staffData.employeeName}</Text>
          <Text style={styles.staffDetailsText}>{staffData.hotel.hotelName} {staffData.hotel.city}</Text>
          <LogoutButton />
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
                style={styles.modalAssignButton}
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
                style={styles.modalCancelButton}
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  requestCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  requestHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  requestStatus: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  staffDetailsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center', // Center align the text
  },
  staffDetailsText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center', // Center align the text
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
    elevation: 4,
    width: 300,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  picker: {
    marginBottom: 16,
  },
  modalAssignButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  modalCancelButton: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReceptionMainScreen;
