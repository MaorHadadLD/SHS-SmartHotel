import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native'
// import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import ActivitiesHome from './ActivityNearBy/ActivitiesHome';
import { UserLocationContext } from '../../Context/UserLocationContext';



// import TabNavigator from '../../Navigation/TabNavigator';

const NearbyActivitiesScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  

  return (
    <View style={styles.container}>
      <UserLocationContext.Provider 
          value={{location,setLocation}}>
          <ActivitiesHome />
      </UserLocationContext.Provider>
       </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default NearbyActivitiesScreen;

 {/* <Text style={styles.paragraph}>{text}</Text> */}
//  {location && (
//   <MapView
//     style={{ width: '100%', height: '100%' }}
//     initialRegion={{
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     }}
//     showsUserLocation={true}
//   >
//     {/* Optional: Display a marker at the user's location */}
//     <Marker
//       coordinate={{
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       }}
//       title="Your Location"
//       description="You are here"
//     />
//   </MapView>
// )}