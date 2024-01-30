import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

function ClientMainMenu({route}) {
  console.log("ClientMainMenu route", route.params.guest);
  const { selectedHotel } = route.params.selectedHotel || {};
  const guestEmail  = route.params.guest || {};
  const navigation = useNavigation();
  const { hotelName, city } = selectedHotel || {};
  const handleNavigate = (screen) => {
    navigation.navigate(screen, { selectedHotel, guest: guestEmail});
  };
  

  // Menu items data Spa
  const menuItems = [
    { id: '1', title: "Hotel Information", screen: "HotelInfoScreen" },
    { id: '2', title: "Room Key", screen: "RoomKeyScreen" },
    { id: '3', title: "Hotel Services", screen: "HotelServicesScreen" },
    { id: '4', title: "Nearby Activities", screen: "NearbyActivitiesScreen" },
    { id: '5', title: "Spa", screen: "SpaScreen" },
    { id: '6', title: "check out", screen: "checkOutScreen" },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => handleNavigate(item.screen)}
    >
      <Text style={styles.menuItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Welcome to {hotelName ? `${hotelName}, ${city}` : 'your hotel'} </Text>
      <Text style={styles.header}> {`guest ${guestEmail}`} </Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
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
  flatListContainer: {
    paddingBottom: 20,
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
