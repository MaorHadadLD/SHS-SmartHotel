// import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import Login from '../screens/Login';
import HotelSelection from '../screens/guest/HotelSelection';
import HotelServicesScreen from '../screens/guest/HotelServicesScreen';
import RequestsMnOverview from '../screens/guest/RequestsMnOverview';
import ClinetMainMenu from '../screens/guest/ClientMainMenu';
import HotelInfoScreen from '../screens/guest/HotelInfoScreen';
import SpaScreen from '../screens/guest/SpaScreen';
import DiningRoomScreen from '../screens/guest/DiningRoomSceern'

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
          <Stack.Navigator initialRouteName="SHS">
            { <Stack.Screen name="Login" component={Login} /> }
            { <Stack.Screen name="HotelSelection" component={HotelSelection} /> }
            { <Stack.Screen name="ClientMainMenu" component={ClinetMainMenu} /> }
            { <Stack.Screen name="HotelInfoScreen" component={HotelInfoScreen} /> }
            <Stack.Screen name="HotelServicesScreen" 
            component={HotelServicesScreen}
            options={{
            title: 'Departments menu',
            headerStyle: {backgroundColor: 'green'},
            headerTintColor: 'white',
            contentStyle: {backgroundColor: 'white'}
          }}
          />
          { <Stack.Screen name="SpaScreen" component={SpaScreen} /> }
          { <Stack.Screen name="RequestsMnOverview" component={RequestsMnOverview} /> }
          { <Stack.Screen name="DiningRoomScreen" component={DiningRoomScreen} /> }
        </Stack.Navigator>
      </NavigationContainer>
   </>
  );}
