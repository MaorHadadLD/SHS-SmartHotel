import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActivitiesHome from '../screens/guest/ActivityNearBy/ActivitiesHome';
import PlaceDetail from '../components/NearByActivities/PlaceDetail/PlaceDetail';
import Search from '../screens/guest/ActivityNearBy/Search';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const HomeStack = () => {
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
      {/* <Stack.Screen name="Search" component={Search} /> */}
    </Stack.Navigator>
  );
};

export default function HomeNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}
