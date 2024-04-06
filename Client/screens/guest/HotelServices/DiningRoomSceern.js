import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import {Picker, Item} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { sendPostRequest } from '../../../API/RequestCalls';
import { getMealsHotel } from '../../../API/StaffCalls';
import { useNavigation } from '@react-navigation/native';




function DiningRoomScreen({route}) {
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));
  const [isModalVisible, setModalVisible] = useState(false);
  const [numberOfDiners, setNumberOfDiners] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [guestData, setGuestData] = useState([]);
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const getGuestData = async () => {
      try {
        const guest = await AsyncStorage.getItem('guestData');
        // console.log("guestttttttttttt>>>>", guest);
        // console.log("guestttttttttttt", JSON.parse(guest).selectedHotel);
        const res = await getMealsHotel(JSON.parse(guest).selectedHotel);
        // console.log("res", res.data);
        if (res.success) {
          setMeals(res.data);
          
        }
        // console.log("?>>>>>>>>>>>>>ss", meals);
        
        setGuestData(JSON.parse(guest)  );
      } catch (error) {
        console.error('AsyncStorage error', error);
      }
    };
  
    getGuestData();
    
    const timer = setInterval(() => {
      setCurrentTime(moment().format('HH:mm'));
    }, 1000); // Update current time every second

    return () => clearInterval(timer); // Cleanup on unmount
    
  }, [guestData]); 
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleReservation = async () => {
    // Validate the number of diners and arrival time that is not undefined
    if (!numberOfDiners || !arrivalTime) {
      alert('Please enter the number of diners and arrival time');
      return;
    }
    //if number of diners is not a number
    if(isNaN(numberOfDiners)){
      alert('Only numbers are allowed for the number of diners');
      return;
    }
    if(numberOfDiners <= 0 || numberOfDiners >= 13){
      alert('Number of diners should be between 1 and 12');
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
        };
        // Send reservation data to the server
        await sendPostRequest(bodyrequest);
        alert('Reservation successful');
      } catch (error) {
        console.error('handleReservation error', error);
        alert('Reservation failed');
      }

  };

  // Define the scheduled times for each meal
  const mealSchedules = [
    { meal: 'Breakfast', startTime: '07:00', endTime: '10:00' },
    { meal: 'Lunch', startTime: '12:00', endTime: '15:00' },
    { meal: 'Dinner', startTime: '18:00', endTime: '21:00' },
  ];

  // Filter the meals based on current time and meal schedules
  const availableMeals = mealSchedules.filter(
    ({ startTime, endTime }) => currentTime >= startTime && currentTime <= endTime
   
  );

  return (
    <View style={styles.container}>
    {availableMeals.length > 0 ? (
      <>
        <Text style={styles.header}>Meals Menu</Text>
        {availableMeals.map(({ meal, startTime, endTime }) => (
          <View key={meal}>
            <Text style={styles.mealTime}>{`Start Time: ${startTime} | End Time: ${endTime}`}</Text>
            <Text style={styles.mealHeader}>{meal}</Text>
            <FlatList
              data={Object.entries(meals[meal.toLowerCase()] || {})}
              renderItem={({ item }) => (
                <Text style={styles.item}>{item[1]}</Text>
              )}
              ListEmptyComponent={<Text>No dishes available for {meal}</Text>}
            />
            {/* Order Table Button */}
            <TouchableOpacity style={styles.orderButton} onPress= {() => navigation.navigate('TableReservation', {selectedHotel: route.params.selectedHotel, guestData: guestData})}>
              <Text style={styles.orderButtonText}>Reserve a Table</Text>
            </TouchableOpacity>
          </View>
        ))}
      </>
    ) : (
      <View style={styles.modalContainer}>
        <Text style={styles.header}>No meals currently available</Text>
        <Text style={styles.header}>Please come back during meal hours:</Text>
        <FlatList
          data={mealSchedules}
          renderItem={({ item }) => (
            <Text style={styles.item}>{`${item.meal} - ${item.startTime} to ${item.endTime}`}</Text>
          )}
        />
      </View>
    )}  
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
                for (let hour = currentHour-1 + 1; hour <= endHour; hour++) {
                  const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
                  arrivalTimes.push(`${formattedHour}:00`);
                  if (hour < endHour ) {
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
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  mealHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 25,
    textAlign: 'center',
  },
  mealTime: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    textAlign: 'center',
  },
  item: {
    fontSize: 16,
    marginVertical: 8,
    textAlign: 'center',
    
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
