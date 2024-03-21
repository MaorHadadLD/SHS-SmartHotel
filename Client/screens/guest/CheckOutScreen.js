import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckOutScreen = () => {
  const navigation = useNavigation();

  // Function to handle the check-out action
  const handleCheckOut = async () => {
    // Implement your check-out logic here
    // For example, you can display a confirmation message or handle payment processing
    alert('Thank you for staying with us! Your check-out is confirmed.');
    // Navigate back to the main menu or any desired screen after check-out
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Check Out</Text>
      <TouchableOpacity style={styles.checkOutButton} onPress={handleCheckOut}>
        <Text style={styles.buttonText}>Check Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  checkOutButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CheckOutScreen;