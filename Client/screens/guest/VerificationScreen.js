import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { ref, getDatabase, get } from 'firebase/database';
import { CommonActions, useNavigation } from '@react-navigation/native';
import firebaseApp from '../../firebaseConfig';

const VerificationScreen = (route) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();

  const handleVerification = async () => {
    try {
        const db = getDatabase(firebaseApp);
        const userRef = ref(db, 'check-ins');
  
        // Retrieve user details from Firebase Realtime Database
        const snapshot = await get(userRef);
  
        if (snapshot.exists()) {
          const userData = snapshot.val();
  
          // Filter the results based on the email
          const userWithEmail = Object.values(userData).find((user) => user.email === email);
  
          if (userWithEmail) {
            const storedOtp = userWithEmail.otp;
  
            // Compare OTPs
            if (otp === storedOtp) {
              // Display success message or navigate to the next screen
              Alert.alert('Verification Successful', 'Welcome!');
            //   navigation.navigate('ClientMainMenu', { selectedHotel: route.route.params });
                navigation.dispatch(
                    CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                        name: 'ClientMainMenu',
                        params: { selectedHotel: route.route.params },
                        },
                    ],
                    })
                );
            } else {
              Alert.alert('Verification Failed', 'Invalid OTP');
            }
          } else {
            Alert.alert('Verification Failed', 'Email not found');
          }
        } else {
          Alert.alert('Verification Failed', 'No user data found');
        }
      } catch (error) {
        console.error('Verification error:', error.message);
      }
  };

  const handleResendOTP = () => {
    // Implement the logic to resend OTP
    // You can generate a new OTP and send it to the user's email
    // For simplicity, let's just display an alert here
    Alert.alert('Resend OTP', 'OTP resent successfully!');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="OTP"
        onChangeText={(text) => setOtp(text)}
        value={otp}
      />
      <Button title="Verify" onPress={handleVerification} />

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive OTP?</Text>
        <Button title="Resend OTP" onPress={handleResendOTP} />
      </View>
    </View>
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
