import { getDatabase, ref, get} from 'firebase/database';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyle';
// import firebaseApp from '../firebaseConfig';
import { sendLoginStaff } from '../API/StaffCalls';

const Login = () => {
  const [showStaffLogin, setShowStaffLogin] = useState(false);
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleGuestLogin = () => {
    // Handle Guest Login Logic
    navigation.navigate('HotelSelection')
  
  };
  const handleStaffLogin = () => {
    setShowStaffLogin(true);
  };
  
  const handleStaffSubmit = async () => {
    // Handle Staff Login Logic
    try {
      const result = await sendLoginStaff(employeeNumber, password);
      if (result.success) {
        if(result.data.role === 'reception'){
          navigation.navigate('ReceptionScreen', {staffData: result.data});
        } else if (result.data.role === 'cleaning'){
          navigation.navigate('CleaningRoomScreen', {staffData: result.data});
        } else if (result.data.role === 'RoomService'){
          navigation.navigate('RoomServiceScreen', {staffData: result.data});
        }
      } else {
        console.error('Staff login error:', error.message);
      }
    } catch (error) {
      console.error('Staff login error:', error.message);
    }
  };
    

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Welcome to Smart Hotel</Text>
      <TouchableOpacity style={globalStyles.button} onPress={handleGuestLogin}>
        <Text style={globalStyles.buttonText}>Guest</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.button} onPress={handleStaffLogin}>
        <Text style={globalStyles.buttonText}>Staff</Text>
      </TouchableOpacity>
      {showStaffLogin && (
        <View style={globalStyles.staffLoginContainer}>
          <TextInput
            style={globalStyles.input}
            placeholder="Employee Number"
            value={employeeNumber}
            onChangeText={(text) => setEmployeeNumber(text)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={globalStyles.button} onPress={handleStaffSubmit}>
            <Text style={globalStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       // justifyContent: 'center',
//       // alignItems: 'center',
//       padding: 16,
//       backgroundColor: '#fff',
//     },
//     header: {
//       fontSize: 24,
//       marginBottom: 20,
//     },
//     button: {
//       backgroundColor: '#007bff',
//       paddingVertical: 15,
//       paddingHorizontal: 30,
//       borderRadius: 5,
//       marginBottom: 20,
//     },
//     buttonText: {
//       color: 'white',
//       fontSize: 18,
//       textAlign: 'center',
//     },
//     staffLoginContainer: {
//       marginTop: 20,
//       width: '100%',
//       alignItems: 'center',
//     },
//     input: {
//       height: 40,
//       width: '100%',
//       borderColor: 'gray',
//       borderWidth: 1,
//       marginBottom: 20,
//       paddingHorizontal: 10,
//     },
//   });

export default Login