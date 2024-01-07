// HotelInfoScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HotelInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hotel Information</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Breakfasts:</Text>
        <Text style={styles.infoText}>
          Meals are served in the hotel restaurant between the hours of 07:30 - 12:00.
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Dinners:</Text>
        <Text style={styles.infoText}>
          Meals are served in the hotel restaurant between 6:30 - 9:00 p.m.
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Lobby Bar:</Text>
        <Text style={styles.infoText}>
          Open every day of the week between 12:00 - 00:00.
        </Text>
      </View>
    </View>
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
});

export default HotelInfoScreen;
