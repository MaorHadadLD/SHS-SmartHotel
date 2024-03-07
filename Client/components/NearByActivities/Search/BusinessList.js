import { View, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import BusinessItem from './BusinessItem'; // Import the missing 'BusinessItem' component

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
                    <BusinessItem place={item} /> 
                </TouchableOpacity>
            )}
        />
      </LinearGradient>
    </View>
  )
}