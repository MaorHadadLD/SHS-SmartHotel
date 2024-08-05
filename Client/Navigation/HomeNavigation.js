import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActivitiesHome from '../screens/guest/ActivityNearBy/ActivitiesHome';
import PlaceDetail from '../components/NearByActivities/PlaceDetail/PlaceDetail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function HomeNavigation() {
  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="ActivitiesHome" component={ActivitiesHome} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
    </Stack.Navigator>
  );
}
