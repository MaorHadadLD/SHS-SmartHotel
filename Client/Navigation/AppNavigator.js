import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import Login from '../screens/Login';
import HotelSelection from '../screens/guest/HotelSelection';
import HotelServicesScreen from '../screens/guest/HotelServicesScreen';
import ClinetMainMenu from '../screens/guest/ClientMainMenu';
import HotelInfoScreen from '../screens/guest/HotelInfoScreen';
import SpaScreen from '../screens/guest/SpaScreen';
import DiningRoomScreen from '../screens/guest/HotelServices/DiningRoomSceern';
import TableReservation from '../screens/guest/HotelServices/TableReservation';
import RoomCleaningRequestScreen from '../screens/guest/HotelServices/RoomCleaningRequestScreen';
import RoomServiceRequestsScreen from '../screens/guest/HotelServices/RoomServiceRequestsScreen';
import PoolBarRequestScreen from '../screens/guest/HotelServices/PoolBarRequestScreen';
import NearbyActivitiesScreen from '../screens/guest/NearbyActivitiesScreen';
import CodeQRScreen from '../screens/guest/CodeQRScreen';
import VerificationScreen from '../screens/guest/VerificationScreen';
import CleaningRoomScreen from '../screens/staff/CleaningRoomScreen';
import HomeNavigation from './HomeNavigation';
import Search from '../screens/guest/ActivityNearBy/Search';
import PlaceDetail from '../components/NearByActivities/PlaceDetail/PlaceDetail';
import RoomServiceScreen from '../screens/staff/RoomServiceScreen';
import PoolBarScreen from '../screens/staff/PoolBarScreen';
import CheckOutScreen from '../screens/guest/CheckOutScreen';
import RequestTrackingScreen from '../screens/guest/RequestTrackingScreen';
import DinningRoomStaff from '../screens/staff/DinningRoomStaff';
import SpaStaffScreen from '../screens/staff/SpaStaffScreen';
import SpaMainScreen from '../screens/guest/SpaMainScreen';
import Home from '../screens/Home';
import GuestChatScreen from '../screens/guest/HotelServices/GuestChatScreen';
import GuestAppointmentsScreen from '../screens/guest/GuestAppointmentsScreen';
import ManagerScreen from '../screens/staff/ManagerScreen';
import ReceptionTabNavigator from './ReceptionTabNavigator';
import ReceptionMainScreen from '../screens/staff/ReceptionMainScreen';
import ReceptionChatScreen from '../screens/staff/ReceptionChatScreen';
import PriceMenuScreen from '../screens/guest/PriceMenuScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="HotelSelection" component={HotelSelection} />
    <Stack.Screen name="CodeQRScreen" component={CodeQRScreen} />
    <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
    <Stack.Screen name="ClientMainMenu" component={ClinetMainMenu} />
    <Stack.Screen name="HotelInfoScreen" component={HotelInfoScreen} />
    <Stack.Screen
      name="HotelServicesScreen"
      component={HotelServicesScreen}
      options={{
        title: 'Departments menu',
        headerStyle: { backgroundColor: 'white' },
        headerTintColor: 'black',
        contentStyle: { backgroundColor: 'white' },
      }}
    />
    <Stack.Screen name="SpaMainScreen" component={SpaMainScreen} />
    <Stack.Screen name="SpaScreen" component={SpaScreen} />
    <Stack.Screen name="PriceMenuScreen" component={PriceMenuScreen} />
    <Stack.Screen name="DiningRoomScreen" component={DiningRoomScreen} />
    <Stack.Screen name="TableReservation" component={TableReservation} />
    <Stack.Screen name="RoomCleaningRequestScreen" component={RoomCleaningRequestScreen} />
    <Stack.Screen name="RoomServiceRequestsScreen" component={RoomServiceRequestsScreen} />
    <Stack.Screen name="PoolBarRequestScreen" component={PoolBarRequestScreen} />
    <Stack.Screen name="NearbyActivitiesScreen" component={NearbyActivitiesScreen} />
    <Stack.Screen name="RequestTrackingScreen" component={RequestTrackingScreen} />
    <Stack.Screen name="ActivitiesHome" component={HomeNavigation} />
    <Stack.Screen name="Search" component={Search} />
    <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
    <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
    <Stack.Screen name="CleaningRoomScreen" component={CleaningRoomScreen} />
    <Stack.Screen name="RoomServiceScreen" component={RoomServiceScreen} />
    <Stack.Screen name="PoolBarScreen" component={PoolBarScreen} />
    <Stack.Screen name="DinningRoomStaff" component={DinningRoomStaff} />
    <Stack.Screen name="SpaStaffScreen" component={SpaStaffScreen} />
    <Stack.Screen name="ManagerScreen" component={ManagerScreen} />
    <Stack.Screen name="GuestChatScreen" component={GuestChatScreen} options={{title: "Chat"}} />
    <Stack.Screen name="ReceptionMainScreen" component={ReceptionMainScreen} /> 
    <Stack.Screen name="ReceptionChatScreen" component={ReceptionChatScreen} />
    <Stack.Screen name="GuestAppointmentsScreen" component={GuestAppointmentsScreen} />
    <Stack.Screen name="ReceptionTabNavigator" component={ReceptionTabNavigator} />
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
