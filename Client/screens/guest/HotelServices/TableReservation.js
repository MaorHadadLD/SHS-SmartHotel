import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo Icons
import { Picker } from '@react-native-picker/picker';
import { getTablesHotel,updateTables } from '../../../API/RequestCalls';

import moment from 'moment';
import { sendPostRequest } from '../../../API/RequestCalls';

// Dummy data for illustration purposes


const TableReservation = (route) => {
  const [tables, setTables] = useState([]);
  const [guestData, setGuestData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [numberOfDiners, setNumberOfDiners] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));
  const [tableId, setTableId] = useState(''); // Add this state to store the selected table ID

  const navigation = useNavigation();
  // console.log('TableReservation route', route.route.params.selectedHotel);
  useEffect(() => {
    const getTables = async () => {
      setGuestData(route.route.params.guestData);
        try {
          
            const res = await getTablesHotel(guestData.selectedHotel);
            if (res.success) {
                const tablesArray = Object.keys(res.data).map((key) => ({
                    id: parseInt(key),
                    status: res.data[key],
                  }));
                  setTables(tablesArray);
                
            }
        } catch(error){
            console.error('AsyncStorage error', error);
    
        }
    }
    getTables();
    const timer = setInterval(() => {
      setCurrentTime(moment().format('HH:mm'));
    }, 1000); // Update current time every second

    return () => clearInterval(timer); // Cleanup on unmount
    
  
  }, [guestData,tables]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleCancelReservation = async () => {
    // Reset the table status to 'available' if the reservation is canceled
    console.log('tableId befffffoerre:', tableId)
    setTables((prevTables) =>
      prevTables.map((item) => (item.id === tableId ? { ...item, status: 'available' } : item))
    );
    toggleModal(); // Close the modal
  };
  

  const handleTableClick = async (tableId) => {
    const table = tables.find((item) => item.id === tableId);
    if (table.status === 'available') {
      // Show confirmation message using an alert dialog
      Alert.alert(
        'Confirm Reservation',
        `Are you sure you want to reserve Table ${tableId}?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              setTables((prevTables) =>
                prevTables.map((item) =>
                  item.id === tableId ? { ...item, status: 'reserved' } : item
                )
              );
              console.log(`Table ${tableId} is available>>>>>>>>>>.`);
              setTableId(tableId);
              console.log('Table IDDDDDDDDDDDDD:', tableId);
              toggleModal(); // Open the reservation modal
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      // Display message for non-available table
      Alert.alert(`Table ${tableId} is not available.`);
    }
  };
  
  
  const handleReservation = async () => {
    // Validate the number of diners and arrival time that is not undefined
    if (!numberOfDiners || !arrivalTime) {
      Alert.alert('Please enter the number of diners and arrival time');
      return;
    }
    //if number of diners is not a number
    if(isNaN(numberOfDiners)){
      Alert.alert('Only numbers are allowed for the number of diners');
      return;
    }
    if(numberOfDiners <= 0 || numberOfDiners >= 13){
      Alert.alert('Number of diners should be between 1 and 12');
      return;
    }
      console.log(`Reservation for ${numberOfDiners} diners at ${arrivalTime}`);
      toggleModal(); // Close the modal after handling the reservation
      try {
        const bodyrequest = {
          type : 'Dinning',
          numberOfDiners: numberOfDiners,
          arrivalTime: arrivalTime,
          roomNumber: guestData.roomNumber,
          hotel: guestData.selectedHotel,
          time: moment().format('YYYY-MM-DD HH:mm:ss'),
          tableId:tableId,
        };
        // Send reservation data to the server
        console.log('tableId befffffoerre:', tableId)
        const res = await updateTables(guestData.selectedHotel, tableId, 'reserved');
        if (res.success) {
          console.log('Table status updated');
          await sendPostRequest(bodyrequest);
          Alert.alert('Reservation successful');
          navigation.navigate('ClientMainMenu',{selectedHotel: route.route.params.selectedHotel, guestData: guestData});
        }
        else {
          console.log('Table status not updated');
        }
        
      } catch (error) {
        console.error('handleReservation error', error);
        Alert.alert('Reservation failed');
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


  const renderTableItem = ({ item }) => (
   <TouchableOpacity
      style={[styles.tableItem, item.status === 'available' ? styles.availableTable : styles.nonAvailableTable]}
      onPress={() => handleTableClick(item.id)}
    >
      <FontAwesome name="table" size={24} color="white" />
      <Text style={styles.tableText}>{item.id}</Text>
    </TouchableOpacity>
    
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Table Reservation</Text>
      <FlatList
        data={tables}
        renderItem={renderTableItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} // Adjust based on your layout
      />
       <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Make a Reservation</Text>

            <TextInput
              style={styles.input}
              placeholder="Number of Diners"
              keyboardType="numeric"
              value={numberOfDiners}
              onChangeText={(text) => setNumberOfDiners(text)} />

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
                const currentMinute = parseInt(currentTime.split(':')[1]);
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

            <TouchableOpacity style={styles.closeButton} onPress={handleCancelReservation}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  tableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%', // Adjust width as needed for spacing
    height: 100,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  availableTable: {
    backgroundColor: 'green',
  },
  nonAvailableTable: {
    backgroundColor: 'grey',
  },
  tableText: {
    marginLeft: 10,
    color: 'white',
    fontWeight: 'bold',
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

export default TableReservation;
