import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { ref, getDatabase, get } from 'firebase/database';
import { CommonActions, useNavigation } from '@react-navigation/native';
import firebaseApp from '../../firebaseConfig';
import { sendLoginGuest } from '../../API/GuestCalls';
import { sendRoomRequest } from '../../API/RequestCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackGround from '../../components/BackGround';
import Btn from '../../components/Btn';

const VerificationScreen = (route) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();

  const handleVerification = async () => {
    try {
      const results = await sendLoginGuest(email, otp, route.route.params);
      console.log("handleVerification results", results.data.email);
      if (results.success) {
        if (results.data.roomNumber === "waitaing for room assignment") {
          await sendRoomRequest(results.data, route.route.params);
        }
        await AsyncStorage.setItem('guestData', JSON.stringify(results.data));
        await AsyncStorage.setItem('selectedHotel', JSON.stringify(route.route.params.selectedHotel));
        const datacheck = await AsyncStorage.getItem('guestData');
        console.log("datacheck: ", datacheck);
        console.log("handleVerification results", route.route.params.selectedHotel);
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

  // try {
  //     const db = getDatabase(firebaseApp);
  //     const userRef = ref(db, 'check-ins');

  //     // Retrieve user details from Firebase Realtime Database
  //     const snapshot = await get(userRef);

  //     if (snapshot.exists()) {
  //       const userData = snapshot.val();

  //       // Filter the results based on the email
  //       const userWithEmail = Object.values(userData).find((user) => user.email === email);

  //       if (userWithEmail) {
  //         const storedOtp = userWithEmail.otp;

  //         // Compare OTPs
  //         if (otp === storedOtp) {
  //           // Display success message or navigate to the next screen
  //           Alert.alert('Verification Successful', 'Welcome!');
  //         //   navigation.navigate('ClientMainMenu', { selectedHotel: route.route.params });
  //             navigation.dispatch(
  //                 CommonActions.reset({
  //                 index: 0,
  //                 routes: [
  //                     {
  //                     name: 'ClientMainMenu',
  //                     params: { selectedHotel: route.route.params },
  //                     },
  //                 ],
  //                 })
  //             );
  //         } else {
  //           Alert.alert('Verification Failed', 'Invalid OTP');
  //         }
  //       } else {
  //         Alert.alert('Verification Failed', 'Email not found');
  //       }
  //     } else {
  //       Alert.alert('Verification Failed', 'No user data found');
  //     }
  //   } catch (error) {
  //     console.error('Verification error:', error.message);
  //   }


  const handleResendOTP = () => {
    // Implement the logic to resend OTP
    // You can generate a new OTP and send it to the user's email
    // For simplicity, let's just display an alert here
    Alert.alert('Resend OTP', 'OTP resent successfully!');
  };

  return (
    <BackGround>
      <View style={{ marginHorizontal: 40, marginVertical: 100, alignItems: 'flex' }}>
        <Text style={{ color: "white", fontSize: 64, marginVertical: 10 }}>
          Verifiy your Code
        </Text>
        <View style={{ alignItems: 'center', width: '85%' }}>
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
        {/* <Button title="Verify" onPress={handleVerification} /> */}

        <View style={{ alignItems: 'flex-start', width: '78%' }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Didn't receive OTP?</Text>
          {/* <Button title="Resend OTP" onPress={handleResendOTP} /> */}
        </View>
        <View style={{ alignItems: 'center', width: '85%' }}>

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
