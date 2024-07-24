import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Modal, TextInput, Alert } from 'react-native';
import { getRequests, deleteDiningTableRequest } from '../../API/RequestCalls';
import { getMealsHotel, updateMealHotel } from '../../API/StaffCalls';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

const backgroundImageUri = require('../../assets/dining_room_back.jpg');

function DinningRoomStaff({ route }) {
  const mealSchedules = [
    { meal: 'Breakfast', startTime: moment('01:00', 'HH:mm'), endTime: moment('07:00', 'HH:mm') },
    { meal: 'Lunch', startTime: moment('09:00', 'HH:mm'), endTime: moment('12:00', 'HH:mm') },
    { meal: 'Dinner', startTime: moment('15:00', 'HH:mm'), endTime: moment('18:00', 'HH:mm') },
  ];

  const [requests, setRequests] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [meals, setMeals] = useState({ breakfast: [], lunch: [], dinner: [] });
  const [newMeal, setNewMeal] = useState({ breakfast: [], lunch: [], dinner: [] });

  const currentTime = moment();
  const isBreakfastTime = currentTime.isBetween(mealSchedules[0].startTime, mealSchedules[0].endTime);
  const isLunchTime = currentTime.isBetween(mealSchedules[1].startTime, mealSchedules[1].endTime);
  const isDinnerTime = currentTime.isBetween(mealSchedules[2].startTime, mealSchedules[2].endTime);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getRequests(route.params.staffData.hotel, 'dining');
        if (response.success) {
          setRequests(response.data);
        } else {
          setRequests([]);
        }
      } catch (error) {
        console.error('fetchRequests error:', error);
      }
    };

    const fetchMeals = async () => {
      try {
        const response = await getMealsHotel(route.params.staffData.hotel);
        if (response.success) {
          setMeals(response.data);
        }
      } catch (error) {
        console.error('fetchMeals error:', error);
      }
    };

    fetchMeals();
    fetchRequests();
  }, [route.params.staffData.hotel]);

  const handleRequestStatusChange = async (req) => {
    try {
      const body = {
        id: req.id,
        tableId: req.tableId,
        hotel: req.hotel,
        type: 'dining'
      };
      const response = await deleteDiningTableRequest(body);
      if (response.success) {
        setRequests((prevRequests) => prevRequests.filter((request) => request.id !== req.id));
        Alert.alert('Request Completed', 'Request has been marked as completed');
      } else {
        console.error('handleRequestStatusChange failed:', response.error);
        Alert.alert('Error', 'An error occurred while updating the request status');
      }
    } catch (error) {
      console.error('handleRequestStatusChange error:', error);
    }
  };

  const handleChangeMealForHotel = () => {
    setNewMeal(meals);
    setModalVisible(true); // Show the modal for editing the meal
  };

  const handleSaveMeal = async () => {
    setModalVisible(false); // Close the modal after saving
    try {
      const res = await updateMealHotel({ hotel: route.params.staffData.hotel, meals: newMeal });
      Alert.alert('Meal Change Success', `Meals updated for all guests from this hotel`);
    } catch (error) {
      console.error('Async operation failed:', error);
      Alert.alert('Error', 'An error occurred while saving the meal changes');
    }
  };

  const handleMealChange = (mealType, id, text) => {
    const updatedMeal = { ...newMeal[mealType], [id]: text };
    setNewMeal({ ...newMeal, [mealType]: updatedMeal });
  };

  const handleCancelEdit = () => {
    setNewMeal(meals);
    setModalVisible(false);
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Text style={styles.requestItemText}>Arrival Time: {item.arrivalTime}</Text>
      <Text style={styles.requestItemText}>Number of Diners: {item.numberOfDiners}</Text>
      <Text style={styles.requestItemText}>Room Number: {item.roomNumber}</Text>
      <Text style={styles.requestItemText}>Hotel: {item.hotel.hotelName}, {item.hotel.city}</Text>
      <Text style={styles.requestItemText}>Table Number: {item.tableId}</Text>
      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => handleRequestStatusChange(item)}
      >
        <Icon name="check" size={16} color="#fff" />
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground source={backgroundImageUri} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.header}>Dining Room Staff</Text>
        {requests.length > 0 ? (
          <FlatList
            data={requests}
            keyExtractor={(item) => item.id.toString()} // Ensure unique keys
            renderItem={renderRequestItem}
          />
        ) : (
          <Text style={styles.noRequestsText}>There are no requests to perform in the Dining Room of {route.params.staffData.hotel.hotelName} {route.params.staffData.hotel.city}</Text>
        )}

        <TouchableOpacity
          style={styles.changeMealButton}
          onPress={handleChangeMealForHotel}
        >
          <Text style={styles.changeMealButtonText}>Change Meal for {route.params.staffData.hotel.hotelName}</Text>
        </TouchableOpacity>

        <View style={styles.staffDetailsContainer}>
          <Text style={styles.detailText}>Name: {route.params.staffData.employeeName}</Text>
          <Text style={styles.detailText}>Role: {route.params.staffData.role}</Text>
          <Text style={styles.detailText}>Hotel: {route.params.staffData.hotel.hotelName} {route.params.staffData.hotel.city}</Text>
          {isBreakfastTime && <Text style={styles.detailText}>Breakfast: {Object.values(meals.breakfast).join(', ')}</Text>}
          {isLunchTime && <Text style={styles.detailText}>Lunch: {Object.values(meals.lunch).join(', ')}</Text>}
          {isDinnerTime && <Text style={styles.detailText}>Dinner: {Object.values(meals.dinner).join(', ')}</Text>}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Edit Meal</Text>
              {(isBreakfastTime || isLunchTime || isDinnerTime) ? (
                <>
                  {isBreakfastTime && (
                    <FlatList
                      data={Object.keys(newMeal.breakfast).map((key) => ({ id: key, name: newMeal.breakfast[key] }))}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <TextInput
                          style={styles.input}
                          value={item.name}
                          onChangeText={(text) => handleMealChange('breakfast', item.id, text)}
                        />
                      )}
                    />
                  )}
                  {isLunchTime && (
                    <FlatList
                      data={Object.keys(newMeal.lunch).map((key) => ({ id: key, name: newMeal.lunch[key] }))}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <TextInput
                          style={styles.input}
                          value={item.name}
                          onChangeText={(text) => handleMealChange('lunch', item.id, text)}
                        />
                      )}
                    />
                  )}
                  {isDinnerTime && (
                    <FlatList
                      data={Object.keys(newMeal.dinner).map((key) => ({ id: key, name: newMeal.dinner[key] }))}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <TextInput
                          style={styles.input}
                          value={item.name}
                          onChangeText={(text) => handleMealChange('dinner', item.id, text)}
                        />
                      )}
                    />
                  )}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveMeal}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.modalHeader}>Meal Change not allowed at this time.</Text>
                  <Text style={styles.modalHeader}>Please come back during meal changing hours:</Text>
                  <FlatList
                    data={mealSchedules}
                    renderItem={({ item }) => (
                      <Text style={styles.item}>
                        {`${item.meal} - ${item.startTime.format('HH:mm')} to ${item.endTime.format('HH:mm')}`}
                      </Text>
                    )}
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleCancelEdit}>
                      <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adding a semi-transparent overlay for better readability
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  noRequestsText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  requestItem: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  requestItemText: {
    color: "#333333",
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  changeMealButton: {
    backgroundColor: '#FF6B3C',
    padding: 10,
    borderRadius: 50,
    marginTop: 10,
    alignItems: 'center',
  },
  changeMealButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  staffDetailsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
  },
  detailText: {
    color: "#333333",
    fontSize: 16,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    marginVertical: 10,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  saveButton: {
    marginVertical: 10,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
});

export default DinningRoomStaff;
