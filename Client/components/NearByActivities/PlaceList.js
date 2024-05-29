import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'
import { useNavigation } from '@react-navigation/native';

export default function PlaceList({ placeList }) {
  const navigation = useNavigation();

  const onPlaceClick = (item) => {
    navigation.navigate('PlaceDetail', { place: item });
  }

  return (
    <View>
      
      <FlatList
        data={placeList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPlaceClick(item)}>
            <PlaceItem place={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
