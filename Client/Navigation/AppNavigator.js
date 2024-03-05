import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import Login from '../screens/Login';
import HotelSelection from '../screens/guest/HotelSelection';
import HotelServicesScreen from '../screens/guest/HotelServicesScreen';
// import RequestsMnOverview from '../screens/guest/RequestsMnOverview';
import ClinetMainMenu from '../screens/guest/ClientMainMenu';
import HotelInfoScreen from '../screens/guest/HotelInfoScreen';
import SpaScreen from '../screens/guest/SpaScreen';
import DiningRoomScreen from '../screens/guest/HotelServices/DiningRoomSceern';
import RoomCleaningRequestScreen from '../screens/guest/HotelServices/RoomCleaningRequestScreen';
import RoomServiceRequestsScreen from '../screens/guest/HotelServices/RoomServiceRequestsScreen';
import PoolBarRequestScreen from '../screens/guest/HotelServices/PoolBarRequestScreen';
import NearbyActivitiesScreen from '../screens/guest/NearbyActivitiesScreen';
import ReceptionScreen from '../screens/staff/ReceptionScreen';
import CodeQRScreen from '../screens/guest/CodeQRScreen';
import VerificationScreen from '../screens/guest/VerificationScreen';
import RoomKeyScreen from '../screens/guest/RoomKeyScreen';
import CleaningRoomScreen from '../screens/staff/CleaningRoomScreen';
import ActivitiesHome from '../screens/guest/ActivityNearBy/ActivitiesHome';
const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="HotelSelection" component={HotelSelection} />
    <Stack.Screen name="CodeQRScreen" component={CodeQRScreen} />
    <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
    <Stack.Screen name="ClientMainMenu" component={ClinetMainMenu} />
    <Stack.Screen name="HotelInfoScreen" component={HotelInfoScreen} />
    <Stack.Screen name="RoomKeyScreen" component={RoomKeyScreen} />
    <Stack.Screen
      name="HotelServicesScreen"
      component={HotelServicesScreen}
      options={{
        title: 'Departments menu',
        headerStyle: { backgroundColor: 'green' },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: 'white' },
      }}
    />
    <Stack.Screen name="SpaScreen" component={SpaScreen} />
    {/* <Stack.Screen name="RequestsMnOverview" component={RequestsMnOverview} /> */}
    <Stack.Screen name="DiningRoomScreen" component={DiningRoomScreen} />
    <Stack.Screen name="RoomCleaningRequestScreen" component={RoomCleaningRequestScreen} />
    <Stack.Screen name="RoomServiceRequestsScreen" component={RoomServiceRequestsScreen} />
    <Stack.Screen name="PoolBarRequestScreen" component={PoolBarRequestScreen} />
    <Stack.Screen name="NearbyActivitiesScreen" component={NearbyActivitiesScreen} />
    <Stack.Screen name="ActivitiesHome" component={ActivitiesHome} />
    <Stack.Screen name="ReceptionScreen" component={ReceptionScreen} />
    <Stack.Screen name="CleaningRoomScreen" component={CleaningRoomScreen} />
  </Stack.Navigator>
);

export default function AppNavigator() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </>
  );
}
