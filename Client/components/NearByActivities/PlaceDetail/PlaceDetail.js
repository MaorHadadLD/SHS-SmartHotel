import { View, Text, ScrollView ,Platform, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useRoute} from '@react-navigation/native'
import PlaceDetailItem from './PlaceDetailItem'
import GoogleMapView from '../GoogleMapView'
import { Ionicons } from "@expo/vector-icons";

export default function PlaceDetail() {
  const param = useRoute().params;
  const [place,setPlace]=useState([])

  useEffect(() => {
    setPlace(param.place);
  },[])

  const onDirectionClick=()=>{
    const url=Platform.select({
      ios:"maps:"+place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
      android:"geo:"+place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
    });
    Linking.openURL(url)
  }

  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      <PlaceDetailItem
        place={place}
        onDirectionClick={() => onDirectionClick()}
      />
      <GoogleMapView placeList={[place]} />
      <TouchableOpacity
        style={{
          backgroundColor: '#d46dfc',
          padding: 15,
          alignContent: "center",
          alignItem: "center",
          margin: 8,
          display:'flex',
          flexDirection:'row',
          gap:10,
          justifyContent:'center',
          alignItems:'center',
          borderRadius: 50,
          paddingBottom: 15,
        }}
        onPress={() => onDirectionClick()}
      >
          <Ionicons name="navigate-circle-outline" 
          size={30} color="white" />

        <Text
          style={{
            textAlign: "center",
            color: '#fff',
          }}
        >
          Get Direction on Google Map
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}