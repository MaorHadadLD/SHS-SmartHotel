// HotelInfoScreen.js
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const HotelInfoScreen = ({ route }) => {
  const {
    hotelName,
    breakfastInfo,
    dinnerInfo,
    lobbyBarInfo,
    spaInfo,
    wifiInfo,
    gymInfo,
    entertainmentInfo,
    poolInfo,
    PoolBarInfo,
    SynagogueInfo,
    KeyOnSaturday,
    checkOutInfo,
  } = route.params.selectedHotel || {};

  // Check if selectedHotel is defined before accessing its properties
  if (!route.params.selectedHotel) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Hotel information not available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Hotel Information - {hotelName}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Breakfasts:</Text>
        <Text style={styles.infoText}>{breakfastInfo}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Dinners:</Text>
        <Text style={styles.infoText}>{dinnerInfo}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Lobby Bar:</Text>
        <Text style={styles.infoText}>{lobbyBarInfo}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Spa:</Text>
        <Text style={styles.infoText}>{spaInfo}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Wifi:</Text>
        <Text style={styles.infoText}>{wifiInfo}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Gym:</Text>
        <Text style={styles.infoText}>{gymInfo}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Entertainment:</Text>
        <Text style={styles.infoText}>{entertainmentInfo}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Pool:</Text>
        <Text style={styles.infoText}>{poolInfo}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Pool Bar:</Text>
        <Text style={styles.infoText}>{PoolBarInfo}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Synagogue:</Text>
        <Text style={styles.infoText}>{SynagogueInfo}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Key On Saturday:</Text>
        <Text style={styles.infoText}>{KeyOnSaturday}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Check Out:</Text>
        <Text style={styles.infoText}>{checkOutInfo}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
  },
});

export default HotelInfoScreen;
