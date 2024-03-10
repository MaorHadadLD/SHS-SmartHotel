import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'
import { useNavigation } from '@react-navigation/native';

export default function PlaceList({ placeList }) {


  const navigator=useNavigation();
  const onPlaceClick=(item)=>{
    navigator.navigate('PlaceDetail',{place:item});
  }
  return (
    <View>
      <Text style={{ fontSize: 20, marginTop: 10 }}>Found {placeList.length} Places</Text>

      <FlatList
        data={placeList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>onPlaceClick(item)}>
          <PlaceItem place={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
