// NearbyActivitiesScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const NearbyActivitiesScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ width: '100%', height: '100%' }}  // Set specific dimensions
        initialRegion={{
          latitude: 31.95079673097148,
          longitude: 34.88856912380192,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChange={(region) => {
          console.log(region);
        }}
      />
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
