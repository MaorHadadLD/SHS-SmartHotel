import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../components/NearByActivities/Header';
import GoogleMapView from '../../../components/NearByActivities/GoogleMapView';
import CategoryList from '../../../components/NearByActivities/CategoryList';
import GlobalApi from '../../../API/GlobalApi';
import { UserLocationContext } from '../../../Context/UserLocationContext';
import PlaceList from '../../../components/NearByActivities/PlaceList';


export default function ActivitiesHome() {
    const [placeList,setPlaceList]=useState([]);
    const {location,setLocation}=useContext(UserLocationContext);
    useEffect(()=>{
      if(location)
      {
         GetNearBySearchPlace('restaurant'); 
      }
    },[location])

  const GetNearBySearchPlace=(value)=>{
    GlobalApi.nearByPlace(location.coords.latitude,
      location.coords.longitude, value).then(resp=>{
      setPlaceList(resp.data.results);
    })
  }
  return (
    <ScrollView style={{padding:20,backgroundColor:'#fff',flex:1}}>
      <Header/>
      <GoogleMapView placeList={placeList}/>
      <CategoryList setSelectedCategory={(value)=>GetNearBySearchPlace(value)}/>
      {placeList? <PlaceList placeList={placeList} />:null}
    </ScrollView>
  )
}