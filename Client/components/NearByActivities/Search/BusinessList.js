import { View, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import BusinessItem from './BusinessItem'; // Import the missing 'BusinessItem' component
import PlaceDetail from '../PlaceDetail/PlaceDetail';

export default function BusinessList({ placeList}) {
    const navigation=useNavigation();
  return (
    <View>
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", colors='#fff']}
        style={{ padding: 20,  width: Dimensions.get("screen").width }}
      >
        <FlatList
            data={placeList}
            horizontal={true}
            renderItem={({ item, index }) => index <= 6 && (
                <TouchableOpacity onPress={() => navigation.navigate(
                    'PlaceDetail',
                    {
                        place: item
                    }
                )}>
                    <PlaceDetail place={item} /> 
                </TouchableOpacity>
            )}
        />
      </LinearGradient>
    </View>
  )
}