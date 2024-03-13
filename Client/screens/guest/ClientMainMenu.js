import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getGuestDetails } from '../../API/GuestCalls';

function ClientMainMenu({route}) {
  const { selectedHotel } = route.params.selectedHotel || {};
  console.log("ClientMainMenu PARAMS: ", route.params);
  const guestEmail  = route.params.guest || {};
  const [guestData, setGuestData] = useState([]);
  const navigation = useNavigation();
  const { hotelName, city } = selectedHotel || {};
  useEffect(() =>  {
    const funcGuest = async () => {
    try {
      const results = await getGuestDetails( guestEmail);
      if (results.success) {
        setGuestData(results.data);
      }
    }catch (error) {  
      console.error('ClientMainMenu error:', error.message);
    }
  };
  funcGuest();
  }, []);

  const handleNavigate = (screen) => {
    console.log('ClientMainMenu handleNavigate GUSTDATA:', guestData);
    console.log('ClientMainMenu handleNavigate SELECTEDHOTEL:', route.params.selectedHotel);
  navigation.navigate(screen, {
    selectedHotel: route.params.selectedHotel, // Default to an empty object if undefined
    guest: guestData
  });
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
