import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../components/NearByActivities/Header';
import GoogleMapView from '../../../components/NearByActivities/GoogleMapView';
import CategoryList from '../../../components/NearByActivities/CategoryList';
import GlobalApi from '../../../API/GlobalApi';
import { UserLocationContext } from '../../../Context/UserLocationContext';

export default function ActivitiesHome() {
    // const [placeList,setPlaceList]=useState([]);
    const {location,setLocation}=useContext(UserLocationContext);
  useEffect(()=>{
    GetNearBySearchPlace();
  },[])

  const GetNearBySearchPlace=()=>{
    GlobalApi.nearByPlace().then(resp=>{
      setPlaceList(resp.data.results);
    })
  }
  return (
    <ScrollView style={{padding:20,backgroundColor:'#fff',flex:1}}>
    <Header/>
    <GoogleMapView />
    <CategoryList setSelectedCategory={(value)=>GetNearBySearchPlace(value)}/>
</ScrollView>
  )
}