import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Alert, ImageBackground, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { getTablesHotel, updateTables } from '../../../API/RequestCalls';
import moment from 'moment';
import { sendPostRequest } from '../../../API/RequestCalls';

const { width, height } = Dimensions.get('window');

const tablePositions = [
  { top: height * 0.1, left: width * 0.06 },  // Position 10
  { top: height * 0.15, left: width * 0.6 },  // Position 1
  { top: height * 0.3, left: width * 0.14 },  // Position 2
  { top: height * 0.3, left: width * 0.27 },  // Position 3
  { top: height * 0.36, left: width * 0.63 },  // Position 4
  { top: height * 0.54, left: width * 0.17 },  // Position 5
  { top: height * 0.55, left: width * 0.63 },  // Position 6
  { top: height * 0.65, left: width * 0.15 }, // Position 7
  { top: height * 0.1, left: width * 0.29 }, // Position 8
  { top: height * 0.45, left: width * 0.14 }   // Position 9
];

const TableReservation = ({ route }) => {
  const [tables, setTables] = useState([]);
  const [guestData, setGuestData] = useState(route.params.guestData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [numberOfDiners, setNumberOfDiners] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));
  const [tableId, setTableId] = useState('');

  const navigation = useNavigation();
  const pollingInterval = 3000; // Polling interval in milliseconds

  useEffect(() => {
    fetchTables();

    const intervalId = setInterval(fetchTables, pollingInterval);

    return () => clearInterval(intervalId);
  }, [guestData]);

  const fetchTables = async () => {
    try {
      const res = await getTablesHotel(guestData.selectedHotel);
      if (res.success) {
        const tablesArray = Object.keys(res.data).map((key, index) => ({
          id: parseInt(key),
          status: res.data[key] || 'available', // Ensure default status is 'available'
          location: tablePositions[index % tablePositions.length],
        }));
        setTables(tablesArray);
      }
    } catch (error) {
      console.error('fetchTables error:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCancelReservation = async () => {
    try {
      const res = await updateTables(guestData.selectedHotel, tableId, 'available');
      if (res.success) {
        fetchTables(); // Refresh table data after cancellation
        toggleModal();
      } else {
        console.error('Failed to cancel reservation');
      }
    } catch (error) {
      console.error('handleCancelReservation error:', error);
    }
  };

  const handleTableClick = async (tableId) => {
    const table = tables.find((item) => item.id === tableId);
    if (table.status === 'available') {
      setTableId(tableId);
      toggleModal();
    } else {
      Alert.alert(`Table ${tableId} is not available.`);
    }
  };

  const handleReservation = async () => {
    if (!numberOfDiners || !arrivalTime) {
      Alert.alert('Please enter the number of diners and arrival time');
      return;
    }
    if (isNaN(numberOfDiners)) {
      Alert.alert('Only numbers are allowed for the number of diners');
      return;
    }
    if (numberOfDiners <= 0 || numberOfDiners >= 13) {
      Alert.alert('Number of diners should be between 1 and 12');
      return;
    }
    try {
      // Optimistically update the table status locally
      setTables(prevTables =>
        prevTables.map(table =>
          table.id === tableId ? { ...table, status: 'reserved' } : table
        )
      );

      const bodyrequest = {
        type: 'dining',
        numberOfDiners: numberOfDiners,
        arrivalTime: arrivalTime,
        roomNumber: guestData.roomNumber,
        hotel: guestData.selectedHotel,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        tableId: tableId,
      };

      const res = await updateTables(guestData.selectedHotel, tableId, 'reserved');
      if (res.success) {
        await sendPostRequest(bodyrequest);
        Alert.alert('Reservation successful');
        fetchTables(); // Refresh table data after reservation
        navigation.navigate('ClientMainMenu', { selectedHotel: route.params.selectedHotel, guestData: guestData });
      } else {
        // Revert optimistic update if the reservation fails
        setTables(prevTables =>
          prevTables.map(table =>
            table.id === tableId ? { ...table, status: 'available' } : table
          )
        );
        Alert.alert('Reservation failed. The table might have been taken by another user.');
      }
    } catch (error) {
      // Revert optimistic update if there is an error
      setTables(prevTables =>
        prevTables.map(table =>
          table.id === tableId ? { ...table, status: 'available' } : table
        )
      );
      console.error('handleReservation error:', error);
      Alert.alert('Reservation failed. Please try again.');
    }
  };

  const mealSchedules = [
    { meal: 'Breakfast', startTime: '07:00', endTime: '10:00' },
    { meal: 'Lunch', startTime: '12:00', endTime: '15:00' },
    { meal: 'Dinner', startTime: '18:00', endTime: '21:00' },
  ];

  const availableMeals = mealSchedules.filter(
    ({ startTime, endTime }) => currentTime >= startTime && currentTime <= endTime
  );

  return (
    <ImageBackground source={require('../../../assets/dining_room_place.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Table Reservation</Text>
        <View style={styles.diningRoomLayout}>
          {tables.map((table) => (
            <TouchableOpacity
              key={table.id}
              style={[styles.tableItem, { top: table.location.top, left: table.location.left }]}
              onPress={() => handleTableClick(table.id)}
            >
              <MaterialIcons
                name="table-restaurant"
                size={40}
                color={table.status === 'available' ? 'green' : 'red'}
              />
              <Text style={styles.tableText}>{table.id}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
              <Picker
                selectedValue={arrivalTime}
                style={styles.input}
                onValueChange={(itemValue) => setArrivalTime(itemValue)}
              >
                <Picker.Item label="Select Arrival Time" value="" />
                {availableMeals.map(({ meal, startTime, endTime }) => {
                  const startHour = parseInt(startTime.split(':')[0]);
                  const endHour = parseInt(endTime.split(':')[0]);
                  const currentHour = parseInt(currentTime.split(':')[0]);
                  const arrivalTimes = [];
                  for (let hour = currentHour - 1 + 1; hour <= endHour; hour++) {
                    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
                    arrivalTimes.push(`${formattedHour}:00`);
                    if (hour < endHour) {
                      arrivalTimes.push(`${formattedHour}:15`);
                      arrivalTimes.push(`${formattedHour}:30`);
                      arrivalTimes.push(`${formattedHour}:45`);
                    }
                  }
                  return arrivalTimes.map((arrivalTime) => (
                    <Picker.Item key={`${meal}-${arrivalTime}`} label={arrivalTime} value={arrivalTime} />
                  ));
                })}
              </Picker>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  diningRoomLayout: {
    flex: 1,
    position: 'relative',
  },
  tableItem: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableText: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
    paddingHorizontal: 5,
    borderRadius: 3,
  },
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

export default TableReservation;
