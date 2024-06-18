import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ImageBackground, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { sendPostRequest, checkStatusReq } from '../../../API/RequestCalls';
import { getMealsHotel } from '../../../API/StaffCalls';
import { useNavigation } from '@react-navigation/native';

function DiningRoomScreen({ route }) {
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));
  const [isModalVisible, setModalVisible] = useState(false);
  const [numberOfDiners, setNumberOfDiners] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [guestData, setGuestData] = useState([]);
  const [meals, setMeals] = useState([]);
  const [hasReservation, setHasReservation] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getGuestData = async () => {
      try {
        const guest = await AsyncStorage.getItem('guestData');
        const res = await getMealsHotel(JSON.parse(guest).selectedHotel);
        if (res.success) {
          setMeals(res.data);
        }
        setGuestData(JSON.parse(guest));
        // Check if the guest already has a reservation
        const reservation = await AsyncStorage.getItem('reservation');
        if (reservation) {
          setHasReservation(true);
        }
      } catch (error) {
        console.error('AsyncStorage error', error);
      }
    };

    getGuestData();

    const timer = setInterval(() => {
      setCurrentTime(moment().format('HH:mm'));
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleReservation = async () => {
    if (!numberOfDiners || !arrivalTime) {
      alert('Please enter the number of diners and arrival time');
      return;
    }
    if (isNaN(numberOfDiners)) {
      alert('Only numbers are allowed for the number of diners');
      return;
    }
    if (numberOfDiners <= 0 || numberOfDiners >= 13) {
      alert('Number of diners should be between 1 and 12');
      return;
    }
    console.log(`Reservation for ${numberOfDiners} diners at ${arrivalTime}`);
    toggleModal();
    try {
      const bodyrequest = {
        type: 'Dinning',
        numberOfDiners: numberOfDiners,
        arrivalTime: arrivalTime,
        roomNumber: guestData.roomNumber,
        hotel: guestData.selectedHotel,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      await sendPostRequest(bodyrequest);
      setHasReservation(true);
      await AsyncStorage.setItem('reservation', JSON.stringify(bodyrequest));
      alert('Reservation successful');
    } catch (error) {
      console.error('handleReservation error', error);
      alert('Reservation failed');
    }
  };

  const navigateToTableReservation = async () => {
    try {
      const bodyrequest = {
        roomNumber: guestData.roomNumber,
        type: 'Dinning',
        hotel: guestData.selectedHotel
      };
      const result = await checkStatusReq(bodyrequest);
      if (result.success) {
        Alert.alert('Alert', 'You have already made a reservation for the Dining Room. You cannot make another reservation.');
      } else {
        navigation.navigate('TableReservation', { selectedHotel: route.params.selectedHotel, guestData: guestData });
      }
    } catch (error) {
      console.error('navigateToTableReservation error:', error);
      Alert.alert('Error', 'An error occurred while checking reservation status.');
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
    <ImageBackground source={require('../../../assets/dining_room_back.jpg')} style={styles.background}>
      <View style={styles.container}>
        {availableMeals.length > 0 ? (
          <>
            <Text style={styles.header}>Meals Menu</Text>
            {availableMeals.map(({ meal, startTime, endTime }) => (
              <View key={meal} style={styles.mealContainer}>
                <Text style={styles.mealTime}>{`Start Time: ${startTime} | End Time: ${endTime}`}</Text>
                <Text style={styles.mealHeader}>{meal}</Text>
                <FlatList
                  data={Object.entries(meals[meal.toLowerCase()] || {})}
                  renderItem={({ item }) => (
                    <Text style={styles.item}>{item[1]}</Text>
                  )}
                  ListEmptyComponent={<Text style={styles.noDishesText}>No dishes available for {meal}</Text>}
                />
                <TouchableOpacity 
                  style={[styles.orderButton, hasReservation && styles.disabledButton]} 
                  onPress={navigateToTableReservation}
                  disabled={hasReservation}
                >
                  <Text style={styles.orderButtonText}>{hasReservation ? 'Reservation Exists' : 'Reserve a Table'}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.modalContainer}>
            <Text style={styles.header}>No meals currently available</Text>
            <Text style={styles.subHeader}>Please come back during meal hours:</Text>
            <FlatList
              data={mealSchedules}
              renderItem={({ item }) => (
                <Text style={styles.item}>{`${item.meal} - ${item.startTime} to ${item.endTime}`}</Text>
              )}
            />
          </View>
        )}
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
}

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
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'center',
    color: 'gold',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#ddd',
  },
  mealContainer: {
    marginBottom: 20,
  },
  mealHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'white',
  },
  mealTime: {
    fontSize: 18,
    marginBottom: 5,
    color: '#ddd',
    textAlign: 'center',
  },
  item: {
    fontSize: 18,
    marginVertical: 8,
    textAlign: 'center',
    color: 'white',
  },
  noDishesText: {
    fontSize: 18,
    marginVertical: 8,
    textAlign: 'center',
    color: 'red',
  },
  orderButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#888',
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
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

export default DiningRoomScreen;
