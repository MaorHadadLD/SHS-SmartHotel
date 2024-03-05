import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={{display:"flex",flexDirection:'row',
    justifyContent:'space-evenly', alignItems:'center'}}>
      <TextInput placeholder='Search'
            style={styles.searchBar}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 4,
        borderRadius: 50,
        paddingLeft: 10,
        width:Dimensions.get('screen').width*0.6
    }
})