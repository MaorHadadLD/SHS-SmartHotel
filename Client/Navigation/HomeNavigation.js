import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import ActivitiesHome from '../screens/guest/ActivityNearBy/ActivitiesHome'
import PlaceDetail from '../components/NearByActivities/PlaceDetail/PlaceDetail'



export default function HomeNavigation() {
    const isAndroid = true;
    const Stack = createStackNavigator();


  return (
    <Stack.Navigator ScreenOptions={{
      gestureEnabled: true,
      headerShown: false,
      ...(isAndroid&&TransitionPresets.ModalPresentationIOS)
      }}>
        <Stack.Screen name="ActivitiesHome"
        options={{headerShown:false}}
        component={ActivitiesHome} />
        <Stack.Screen name="PlaceDetail" 
        options={{title:""}}
        component={PlaceDetail} ScreenOptions={{
          presentation: 'modal'
        }} />
    </Stack.Navigator>
  )
}