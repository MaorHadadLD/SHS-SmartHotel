import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import { sendLoginGuest } from '../../API/GuestCalls';
import { sendRoomRequest } from '../../API/RequestCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackGround from '../../components/BackGround';
import Btn from '../../components/Btn';
import { resendOTP } from '../../API/GuestCalls';

const VerificationScreen = (route) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();

  const handleVerification = async () => {
    try {
      const results = await sendLoginGuest(email, otp, route.route.params);
     
      if (results.success) {
        if (results.data.roomNumber === "waiting for room assignment") {
          await sendRoomRequest(results.data, route.route.params);
        }
        await AsyncStorage.setItem('guestData', JSON.stringify(results.data));
        await AsyncStorage.setItem('selectedHotel', JSON.stringify(route.route.params.selectedHotel));
        const datacheck = await AsyncStorage.getItem('guestData');
        console.log("Guest are successfully logged in");
        navigation.reset({
          index: 0,
          routes: [{ name: 'ClientMainMenu', params: { selectedHotel: route.route.params.selectedHotel, guestData: results.data } }],
        });
      } else {
        Alert.alert(results.data);
      }
    } catch (error) {
      console.error('Verification error:', error.message);
    }
  }


  const handleResendOTP = async () => {
    try{
      console.log("handleResendOTP", email);
      if (email === '') {
        Alert.alert('Resend OTP', 'Please enter your email address!');
        return;
      }
      const resutt = await resendOTP(email);
      if (resutt.success) {
        Alert.alert(resutt.data);
      } else {
        Alert.alert(resutt.data);
      }

    }catch (error) {
      console.error('Resend OTP error:', error.message);
    }
    // Alert.alert('Resend OTP', 'OTP resent successfully!');
  };

  return (
    <BackGround>
      <View style={{ marginHorizontal: 40, marginVertical: 100, alignItems: 'flex' }}>
        <Text style={{ color: "white", fontSize: 64, marginVertical: 10 }}>
          Verifiy your Code
        </Text>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <TextInput
            style={{
              borderRadius: 100, color: "black", paddingHorizontal: 10, width: '78%',
              backgroundColor: 'rgb(220,220,220)', marginVertical: 10
            }}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={{
              borderRadius: 100, color: "black", paddingHorizontal: 10, width: '78%',
              backgroundColor: 'rgb(220,220,220)', marginVertical: 10
            }}
            placeholder="OTP"
            onChangeText={(text) => setOtp(text)}
            value={otp}
          />


          <Btn bgColor="#FF6B3C" btnLabel="Verify" textColor="white" Press={handleVerification} />
        </View>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16}}>Didn't receive OTP?</Text>
         
        </View>
        <View style={{ alignItems: 'center', width: '100%' }}>

        <Btn bgColor="#FF6B3C" btnLabel="Resend OTP" textColor="white" Press={handleResendOTP} />
        </View>
      </View>
    </BackGround>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  resendContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    marginRight: 10,
  },
});

export default VerificationScreen;
