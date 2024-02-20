import { View, Text, Dimensions } from 'react-native'
import React, { useState } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

export default function GoogleMapView() {
    const [mapRegion, setmapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });  
  return (
    <View style={{marginTop:20}}>
      <MapView
        style={{
            width: Dimensions.get('screen').width*0.89,
            height: Dimensions.get('screen').height*0.23,
            borderRadius: 10,
         }}
         provider={PROVIDER_GOOGLE}
         showsUserLocation={true}
         region={mapRegion}
        
      >

      </MapView>
    </View>
  )
}