import { View, Text, Image } from 'react-native'
import React from 'react'

export default function CategoryItem({category}) {


  return (
    <View>
        <Image source={category.icon} style={{padding:5,alignItems:'center',
        margin:5,width:100,height:100,justifyContent:'center',borderRadius:15,}}/>
      <Text>{category.name}</Text>
    </View>
  )
}