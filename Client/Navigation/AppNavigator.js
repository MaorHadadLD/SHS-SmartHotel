// import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import Login from '../screens/Login';
import HotelSelection from '../screens/guest/HotelSelection';
import RequestsScreen from '../screens/guest/RequestsScreen';
import RequestsMnOverview from '../screens/guest/RequestsMnOverview';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
          <Stack.Navigator initialRouteName="SHS">
            { <Stack.Screen name="Login" component={Login} /> }
            { <Stack.Screen name="HotelSelection" component={HotelSelection} /> }
            <Stack.Screen name="RequestsScreen" 
            component={RequestsScreen}
            options={{
            title: 'Departments menu',
            headerStyle: {backgroundColor: 'green'},
            headerTintColor: 'white',
            contentStyle: {backgroundColor: 'white'}
          }}
          />
          { <Stack.Screen name="RequestsMnOverview" component={RequestsMnOverview} /> }
        </Stack.Navigator>
      </NavigationContainer>
   </>
  );}
