import React, { useState, useEffect } from 'react';
import { View, TextInput, Platform, KeyboardAvoidingView, ScrollView, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderHome from '../components/HeaderHome';
import Btn from '../components/Btn';
import BackGround from '../components/BackGround';
import { StatusBar } from 'expo-status-bar';
import { sendLoginStaff } from '../API/StaffCalls';

const Login = () => {
  const [showStaffLogin, setShowStaffLogin] = useState(false);
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getGuestData = async () => {
      try {
        const storedGuestData = await AsyncStorage.getItem('guestData');
        const storedHotelData = await AsyncStorage.getItem('selectedHotel');
        const storedStaffData = await AsyncStorage.getItem('staffData');
        if (storedGuestData) {
          navigation.replace('ClientMainMenu', { guestData: JSON.parse(storedGuestData), selectedHotel: JSON.parse(storedHotelData) });
        } else if (storedStaffData) {
          const staffData = JSON.parse(storedStaffData);
          navigateToStaffScreen(staffData);
        }
      } catch (error) {
        console.error('Error retrieving data:', error.message);
      }
    };
    getGuestData();
  }, [navigation]);

  const handleGuestLogin = () => {
    navigation.navigate('HotelSelection');
  };

  const handleStaffLogin = () => {
    setShowStaffLogin(true);
  };

  const handleStaffSubmit = async () => {
    try {
      const result = await sendLoginStaff(employeeNumber, password);
      if (result.success) {
        await AsyncStorage.setItem('staffData', JSON.stringify(result.data));
        navigateToStaffScreen(result.data);
      } else {
        alert('Invalid employee number or password. Please try again.');
      }
    } catch (error) {
      console.error('Staff login error:', error.message);
    }
  };

  const navigateToStaffScreen = (staffData) => {
    if (staffData.role === 'reception') {
      navigation.replace('ReceptionTabNavigator', { staffData });
    } else if (staffData.role === 'cleaning') {
      navigation.replace('CleaningRoomScreen', { staffData });
    } else if (staffData.role === 'RoomService') {
      navigation.replace('RoomServiceScreen', { staffData });
    } else if (staffData.role === 'PoolBar') {
      navigation.replace('PoolBarScreen', { staffData });
    } else if (staffData.role === 'dining') {
      navigation.replace('DinningRoomStaff', { staffData });
    } else if (staffData.role === 'spa') {
      navigation.replace('SpaStaffScreen', { staffData });
    } else if (staffData.role === 'manager') {
      navigation.replace('ManagerScreen', { staffData });
    } else {
      alert('Invalid employee number or password. Please try again.');
    }
  };

 

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <BackGround>
        <HeaderHome />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ marginHorizontal: 40, marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Btn bgColor="#FF6B3C" btnLabel="Guest" textColor="white" Press={handleGuestLogin} />
            <Btn bgColor="#FF6B3C" btnLabel="Staff" textColor="white" Press={handleStaffLogin} />
            {showStaffLogin && (
              <View style={{ alignItems: 'center' }}>
                <TextInput
                  style={{ borderRadius: 100, color: '#bfbbba', paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220,220)', marginVertical: 10 }}
                  placeholderTextColor="black"
                  placeholder="Employee Number"
                  value={employeeNumber}
                  onChangeText={(text) => setEmployeeNumber(text)}
                />
                <TextInput
                  style={{ borderRadius: 100, color: 'black', paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220,220)', marginVertical: 10 }}
                  placeholderTextColor="black"
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <Btn bgColor="#FF6B3C" btnLabel="Submit" textColor="white" Press={handleStaffSubmit} />
              </View>
            )}
          </View>
         
        </ScrollView>
      </BackGround>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};

export default Login;
