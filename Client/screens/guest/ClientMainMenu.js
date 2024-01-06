import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Importing hotelName from the appropriate location
import { hotelName } from "../../components/HotelItem";

function ClientMainMenu({ navigation }) {

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  // Menu items data
  const menuItems = [
    { title: "Hotel Information", screen: "HotelInfoScreen" },
    { title: "Room Key", screen: "RoomKeyScreen" },
    { title: "Hotel Services", screen: "HotelServicesScreen" },
    { title: "Nearby Activities", screen: "NearbyActivitiesScreen" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to {hotelName}</Text>

      {/* Render menu items */}
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => handleNavigate(item.screen)}
        >
          <Text style={styles.menuItemText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  menuItem: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 10,
    marginBottom: 20,
  },
  menuItemText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ClientMainMenu;
