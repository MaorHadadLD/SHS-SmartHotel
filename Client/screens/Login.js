import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Login = () => {
  const [showStaffLogin, setShowStaffLogin] = useState(false);
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleGuestLogin = () => {
    // Handle Guest Login Logic
  };

  const handleStaffLogin = () => {
    setShowStaffLogin(true);
  };

  const handleStaffSubmit = () => {
    // Handle Staff Login Logic and navigation to StaffHomeScreen
  };
  return (
    <View style={styles.container}>
    <Text style={styles.header}>Welcome to Smart Hotel</Text>
    <TouchableOpacity style={styles.button} onPress={handleGuestLogin}>
      <Text style={styles.buttonText}>Login as Guest</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={handleStaffLogin}>
      <Text style={styles.buttonText}>Login as Staff</Text>
    </TouchableOpacity>
    {showStaffLogin && (
      <View style={styles.staffLoginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Employee Number"
          value={employeeNumber}
          onChangeText={(text) => setEmployeeNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleStaffSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )}
    <StatusBar style="auto" />
  </View>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 5,
      marginBottom: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
    },
    staffLoginContainer: {
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
    },
    input: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
  });

export default Login