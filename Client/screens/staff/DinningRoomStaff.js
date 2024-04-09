import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, Animated } from 'react-native';
import moment from 'moment';
import { getRequests, deleteDiningTableRequest } from '../../API/RequestCalls';
import { getMealsHotel, updateMealHotel } from '../../API/StaffCalls';
import { globalStyles, staffHomeStyles } from '../../styles/globalStyle';

function DinningRoomStaff({ route }) {
    const mealSchedules = [
        { meal: 'Breakfast', startTime: moment('01:00', 'HH:mm'), endTime: moment('07:00', 'HH:mm') },
        { meal: 'Lunch', startTime: moment('09:00', 'HH:mm'), endTime: moment('12:00', 'HH:mm') },
        { meal: 'Dinner', startTime: moment('15:00', 'HH:mm'), endTime: moment('18:00', 'HH:mm') },
      ];
    const [requests, setRequests] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const currentTime = moment();
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [newMeal, setNewMeal] = useState([]);
    const [updatedBreakfast, setUpdatedBreakfast] = useState([]);
    const [updatedLunch, setUpdatedLunch] = useState([]);
    const [updatedDinner, setUpdatedDinner] = useState([]);
    
    const isBreakfastTime = currentTime.isBetween(mealSchedules[0].startTime, mealSchedules[0].endTime);
    const isLunchTime = currentTime.isBetween(mealSchedules[1].startTime, mealSchedules[1].endTime);
    const isDinnerTime = currentTime.isBetween(mealSchedules[2].startTime, mealSchedules[2].endTime);
  
    console.log('isBreakfastTime', isBreakfastTime);
    console.log('isLunchTime', isLunchTime);
    console.log('isDinnerTime', isDinnerTime);
  useEffect(() => {
    
    const fetchRequests = async () => {
      try {
        const response = await getRequests(route.params.staffData.hotel, 'Dinning');
        if (response.success) {
          setRequests(response.data);
        } else {
          console.error('fetchRequests failed:', response.error); // Handle error from API
        }
      } catch (error) {
        console.error('fetchRequests error:', error);
      }
    };
    // get meals from the database request from the server
    const getMeals = async () => {
        try {
            const response = await getMealsHotel(route.params.staffData.hotel);
            if (response.success) {
                 console.log('getMeals response:', response.data);
              
                    setBreakfast(response.data.breakfast);
                    // console.log('breakfast59999', response.data.breakfast);
                
                    setLunch(response.data.lunch);
                
                    setDinner(response.data.dinner);
                
            }
        } catch (error) {
            console.error('getMeals error:', error);
        }
    }
    getMeals();
    fetchRequests();
  }, [requests]);

  const handleRequestStatusChange = async (req) => {
    try {
      const body = {
        id: req.id, 
        tableId: req.tableId,
        hotel: req.hotel,
        type: 'Dinning'
      };
      const response = await deleteDiningTableRequest(body);
      if (response.success) {
        // Remove the request from the list
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
    setUpdatedBreakfast(breakfast);
    setUpdatedLunch(lunch);
    setUpdatedDinner(dinner);
    setModalVisible(true); // Show the modal for editing the meal
  };
 
  const handleSaveMeal = async () => {
    console.log('handleSaveMeal function called');
    console.log('save breakfast', breakfast);
    console.log('save dinner', dinner);
    console.log('save lunch', lunch);
    setModalVisible(false); // Close the modal after saving
    try {
      // Perform any asynchronous operations here
      const res = await updateMealHotel({ hotel: route.params.staffData.hotel, meals: { breakfast: breakfast, lunch: lunch, dinner: dinner }});
      console.log('Async operation completed successfully');
      Alert.alert('Meal Change Success', `Meal changed to ${newMeal} for all guests from this hotel`);
    } catch (error) {
      console.error('Async operation failed:', error);
      Alert.alert('Error', 'An error occurred while saving the meal changes');
    }
  };

  const handleBreakfastChange = (id, text) => {
    const updatedBreakfast = { ...breakfast, [id]: text };
    setBreakfast(updatedBreakfast);
  };
  
  const handleLunchChange = (id, text) => {
    const updatedLunch = { ...lunch, [id]: text };
    setLunch(updatedLunch);
  };
  
  const handleDinnerChange = (id, text) => {
    const updatedDinner = { ...dinner, [id]: text };
    setDinner(updatedDinner);
  };

  const handleCancelEdit = () => {
    // Reset the meal to the original values
    setBreakfast(updatedBreakfast);
    setLunch(updatedLunch);
    setDinner(updatedDinner)
    setModalVisible(false);
  };
 
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Dinning Room Staff</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={staffHomeStyles.requestItem}>
            <Text style={staffHomeStyles.requestItemText}>Arrival Time: {item.arrivalTime}</Text>
            <Text style={staffHomeStyles.requestItemText}>Number of Diners: {item.numberOfDiners}</Text>
            <Text style={staffHomeStyles.requestItemText}>Room Number: {item.roomNumber}</Text>
            <Text style={staffHomeStyles.requestItemText}>Hotel: {item.hotel.hotelName}, {item.hotel.city}</Text>
            <Text style={staffHomeStyles.requestItemText}>Table Number: {item.tableId}</Text>
            <TouchableOpacity style={staffHomeStyles.startCompleteButton} onPress={() => handleRequestStatusChange(item)}>
              <Text style={staffHomeStyles.startCompleteButtonText}>Finish</Text>
            </TouchableOpacity>

          </View>
        )}
        ListEmptyComponent={<Text>No requests available</Text>}
      />
      
        <TouchableOpacity
          style={styles.changeMealButton}
          onPress={handleChangeMealForHotel}
          disabled={requests.length === 0} // Disable button if there are no requests
        >
          <Text style={styles.changeMealButtonText}>Change Meal for {route.params.staffData.hotel.hotelName}</Text>
        </TouchableOpacity>
      
        <Text style={styles.changeMealButtonText}>Meal Change not allowed at this time</Text>
      
      {/* Staff details */}
      <View style={staffHomeStyles.staffDetailsContainer}>
        <Text style={staffHomeStyles.detailText}>Name: {route.params.staffData.employeeName}</Text>
        <Text style={staffHomeStyles.detailText}>Role: {route.params.staffData.role}</Text>
        <Text style={staffHomeStyles.detailText}>Hotel: {route.params.staffData.hotel.hotelName} {route.params.staffData.hotel.city}</Text>
        {isBreakfastTime && (
    <Text style={staffHomeStyles.detailText}>Breakfast: {Object.values(breakfast).join(', ')}</Text>
  )}
  {isLunchTime && (
    <Text style={staffHomeStyles.detailText}>Lunch: {Object.values(lunch).join(', ')}</Text>
  )}
  {isDinnerTime && (
    <Text style={staffHomeStyles.detailText}>Dinner: {Object.values(dinner).join(', ')}</Text>
  )}
      </View>
      {/* Modal for editing meal */}
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
              data={Object.keys(breakfast).map((key) => ({ id: key, name: breakfast[key] }))}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TextInput
                  style={styles.input}
                  value={breakfast[item.id]}
                  onChangeText={(text) => handleBreakfastChange(item.id, text)}
                />
              )}
            />
          )}
          {isLunchTime && (
            
            <FlatList
            
              data={Object.keys(lunch).map((key) => ({ id: key, name: lunch[key] }))}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TextInput
                  style={styles.input}
                  value={item.name}
                  onChangeText={(text) => handleLunchChange(item.id, text)}

                />
                
              )}
              
            />
          )}
          {isDinnerTime && (
            <FlatList
              data={Object.keys(dinner).map((key) => ({ id: key, name: dinner[key] }))}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TextInput
                  style={styles.input}
                  value={dinner[item.id]}
                  onChangeText={(text) => handleDinnerChange(item.id, text)}
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
          <Text style={styles.modalHeader}>No meals currently available</Text>
          <Text style={styles.modalHeader}>Please come back during meal hours:</Text>
          <FlatList
            data={mealSchedules}
            renderItem={({ item }) => (
              <Text style={styles.item}> 
                {`${item.meal} - ${item.startTime.format('HH:mm')} to ${item.endTime.format('HH:mm')}`}
              </Text>
            )}
          />
        </>
       

      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleCancelEdit} >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      
      </View>
    </View>
  </View>
</Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  changeMealButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  changeMealButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DinningRoomStaff;
