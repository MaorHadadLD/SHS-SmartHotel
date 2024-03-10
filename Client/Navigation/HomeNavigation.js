import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import ActivitiesHome from '../screens/guest/ActivityNearBy/ActivitiesHome'
import PlaceDetail from '../components/NearByActivities/PlaceDetail/PlaceDetail'
import Search from '../screens/guest/ActivityNearBy/Search'

const Stack = createStackNavigator();

export default function HomeNavigation() {
  const isAndroid = true;

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        ...(isAndroid && TransitionPresets.ModalPresentationIOS),
      }}>
      <Stack.Screen name="ActivitiesHome" component={ActivitiesHome} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetail} options={{ title: '' }} />
      <Stack.Screen name="Search" component={ Search } />
    </Stack.Navigator>
  );
}