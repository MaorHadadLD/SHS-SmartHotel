// import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import Login from '../screens/Login';
import HotelSelection from '../screens/guest/HotelSelection';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
   <NavigationContainer>
        <Stack.Navigator initialRouteName="SHS">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HotelSelection" component={HotelSelection} />
        </Stack.Navigator>
   </NavigationContainer>
  )
}