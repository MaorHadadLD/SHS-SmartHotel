import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CheckOutScreen = () => {
  const navigation = useNavigation();
  const [guestData, setGuestData] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const getGuestData = async () => {
      try {
        // Retrieve guest data from AsyncStorage
        const storedGuestData = await AsyncStorage.getItem('guestData');
        console.log('storedGuestData:', storedGuestData);
        setGuestData(JSON.parse(storedGuestData));
       
      } catch (error) {
        console.error('Error retrieving guest data:', error.message);
      }
    }
    getGuestData();
  }, [] );


  // Function to handle the check-out action
  const handleCheckOut = async () => {
    if (!isChecked) {
      // send request to server to check out and delete the guest and make the room available
      // const result = await sendCheckOutRequest();
      alert('Please agree to the check-out statement.');
      return;
    }
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Check Out</Text>
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoTitle}>Guest Information</Text>
        <View style={styles.userInfoItem}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{guestData.firstname} {guestData.lastname}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.label}>Check-in:</Text>
          <Text style={styles.value}>{guestData.checkIn}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.label}>Check-out:</Text>
          <Text style={styles.value}>{guestData.checkOut}</Text>
        </View>
        {/* <View style={styles.userInfoItem}>
          <Text style={styles.label}>Hotel:</Text>
          <Text style={styles.value}>{guestData.selectedHotel.hotelName} {guestData.selectedHotel.city}</Text>
        </View> */}
        <View style={styles.userInfoItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{guestData.email}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.label}>Room Number:</Text>
          <Text style={styles.value}>{guestData.roomNumber}</Text>
        </View>
      </View>

      <View style={styles.reminderContainer}>
      <Text style={styles.reminderTitle}>Before Leaving, Don't Forget:</Text>
      <Text style={styles.reminderItem}>- Check all drawers and closets for personal belongings.</Text>
      <Text style={styles.reminderItem}>- Settle any outstanding bills or payments.</Text>
      <Text style={styles.reminderItem}>- Return room keys, access cards, or any hotel property.</Text>
      <Text style={styles.reminderItem}>- Provide feedback about your stay to help us improve.</Text>
    </View>
    
    <View style={styles.agreementContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setIsChecked(!isChecked)}
        >
          {isChecked && <View style={styles.checkedIcon} />}
        </TouchableOpacity>
        <Text style={styles.agreementText}>
          I confirm that I am checking out and agree to the hotel's terms and conditions.
        </Text>
      </View>

      <TouchableOpacity style={styles.checkOutButton} onPress={handleCheckOut}>
        <Text style={styles.buttonText}>Confirm Check Out</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  userInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    flex: 1,
    fontSize: 16,
  },
  reminderContainer: {
    backgroundColor: '#e8f0ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  reminderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reminderItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedIcon: {
    width: 12,
    height: 12,
    backgroundColor: '#007bff',
    borderRadius: 2,
  },
  agreementText: {
    flex: 1,
    fontSize: 16,
  },
  checkOutButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckOutScreen;
