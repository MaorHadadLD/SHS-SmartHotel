import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { sendCheckOutRequest } from '../../API/GuestCalls';

const CheckOutScreen = () => {
  const navigation = useNavigation();
  const [guestData, setGuestData] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  

  useEffect(() => {
    const getGuestData = async () => {
      try {
        const storedGuestData = await AsyncStorage.getItem('guestData');
        setGuestData(JSON.parse(storedGuestData));
      } catch (error) {
        console.error('Error retrieving guest data:', error.message);
      }
    };
    getGuestData();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleCheckOut = async () => {
    console.log('Checked:', isChecked);
    if (isChecked) {
      try{
        const storedGuestData = await AsyncStorage.getItem('guestData');
        const guestData = JSON.parse(storedGuestData);
        console.log('Rha[p',guestData);
        const result = await sendCheckOutRequest(guestData);
       
      } catch (error) {
        console.error('Error checking out:', error.message);
      }
    }else {
      alert('Please agree to the check-out statement.');
      return; 
    }
    await AsyncStorage.clear();
    navigation.reset({
    index: 0,
    routes: [{ name: 'Home' }], // Replace with the name of your login screen
  });
  };

  return (
    <ImageBackground source={require('../../assets/checkOut.jpg')} style={styles.background}>
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Check Out</Text>
          </View>

          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoTitle}>Guest Information</Text>
            <View style={styles.userInfoItem}>
              <FontAwesome name="user" size={24} color="#4A90E2" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{guestData.firstname} {guestData.lastname}</Text>
              </View>
            </View>
            <View style={styles.userInfoItem}>
              <FontAwesome name="calendar" size={24} color="#4A90E2" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.label}>Check-in:</Text>
                <Text style={styles.value}>{guestData.checkIn}</Text>
              </View>
            </View>
            <View style={styles.userInfoItem}>
              <FontAwesome name="calendar" size={24} color="#4A90E2" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.label}>Check-out:</Text>
                <Text style={styles.value}>{guestData.checkOut}</Text>
              </View>
            </View>
            <View style={styles.userInfoItem}>
              <FontAwesome name="envelope" size={24} color="#4A90E2" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{guestData.email}</Text>
              </View>
            </View>
            <View style={styles.userInfoItem}>
              <FontAwesome5 name="door-open" size={24} color="#4A90E2" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.label}>Room Number:</Text>
                <Text style={styles.value}>{guestData.roomNumber}</Text>
              </View>
            </View>
          </View>

          <View style={styles.reminderContainer}>
            <Text style={styles.reminderTitle}>Before Leaving, Don't Forget:</Text>
            {[
              'Check all drawers and closets for personal belongings.',
              'Settle any outstanding bills or payments.',
              'Return room keys, access cards, or any hotel property.',
              'Provide feedback about your stay to help us improve.',
            ].map((reminder, index) => (
              <Text key={index} style={styles.reminderItem}>- {reminder}</Text>
            ))}
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
      </Animated.View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A90E2',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  userInfoContainer: {
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  userInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A90E2',
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  infoTextContainer: {
    marginLeft: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  reminderContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  reminderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A90E2',
  },
  reminderItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
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
    borderColor: '#4A90E2',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedIcon: {
    width: 12,
    height: 12,
    backgroundColor: '#4A90E2',
    borderRadius: 2,
  },
  agreementText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  checkOutButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckOutScreen;
