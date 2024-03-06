import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'

export default function PlaceList({ placeList }) {
  return (
    <View>
      <Text style={{ fontSize: 20, marginTop: 10 }}>Found {placeList.length} Places</Text>

      <FlatList
        data={placeList}
        renderItem={({ item }) => (
          <TouchableOpacity >
          <PlaceItem place={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
