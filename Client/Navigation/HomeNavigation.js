import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ActivitiesHome from '../screens/guest/ActivityNearBy/ActivitiesHome'
import PlaceDetail from '../components/NearByActivities/PlaceDetail/PlaceDetail'
export default function HomeNavigation() {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name="ActivitiesHome" component={ActivitiesHome} />
        <Stack.Screen name="place-detail" component={PlaceDetail} />
    </Stack.Navigator>
  )
}