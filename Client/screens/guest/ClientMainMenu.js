import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { useNavigation, useIsFocused} from '@react-navigation/native';
import { getGuestDetails } from '../../API/GuestCalls';
import { get } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackGround from "../../components/BackGround";
import Btn from "../../components/Btn";

function ClientMainMenu({route}) {
  // const selectedHotel  = route.params.selectedHotel ;
  // console.log("ClientMainMenu PARAMS: ", route.params.selectedHotel);
  const guestEmail  = route.params.guestData.email || {};
  const [guestData, setGuestData] = useState([]);
  const navigation = useNavigation();
  const { hotelName, city } =  route.params.selectedHotel;

  useEffect(() => {
    const getGuestData = async () => {
      try {
        // Retrieve guest data from AsyncStorage
        const storedGuestData = await AsyncStorage.getItem('guestData');
        console.log('storedGuestData:', storedGuestData);
        if (storedGuestData) {
          setGuestData(JSON.parse(storedGuestData));
        } else {
          const results = await getGuestDetails(guestEmail);
          if (results.success) {
            setGuestData(results.data);
            // Save guest data to AsyncStorage when it changes
            await AsyncStorage.setItem('guestData', JSON.stringify(results.data));
          }
        }
      } catch (error) {
        console.error('Error retrieving guest data:', error.message);
      }
    };
    getGuestData();
  }, [guestEmail]); // Include guestEmail in the dependency array

  const handleNavigate = (screen) => {
    console.log('ClientMainMenu handleNavigate GUSTDATA:', guestData);
    console.log('ClientMainMenu handleNavigate SELECTEDHOTEL:', route.params.selectedHotel);
  navigation.navigate(screen, {
    selectedHotel: route.params.selectedHotel, // Default to an empty object if undefined
    guestData: guestData
  });
};
  
  // Menu items data Spa
  const menuItems = [
    { id: '1', title: "Hotel Information", screen: "HotelInfoScreen" },
    { id: '2', title: "Room Key", screen: "RoomKeyScreen" },
    { id: '3', title: "Hotel Services", screen: "HotelServicesScreen" },
    { id: '4', title: "Request Tracking", screen: "RequestTrackingScreen"},
    { id: '5', title: "Nearby Activities", screen: "NearbyActivitiesScreen" },
    { id: '6', title: "Spa", screen: "SpaMainScreen" },
    { id: '7', title: "check out", screen: "CheckOutScreen" },
  ];

  const renderItem = ({ item }) => {
    // Check if the item title is "Check Out" to conditionally apply styles
    const buttonStyle = item.title === "check out" ? styles.checkoutButton : styles.menuItem;
    const textStyle = item.title === "check out" ? styles.checkoutButtonText : styles.menuItemText;
  
    return (
      <View style={styles.container}>
      <Btn bgColor="white" btnLabel={item.title} textColor="black" Press={() => handleNavigate(item.screen)} />
      </View>
      // <TouchableOpacity
      //   style={buttonStyle}
      //   onPress={() => handleNavigate(item.screen)}
      // >
      //   <Text style={textStyle}>{item.title}</Text>
      // </TouchableOpacity>
    );
  };

  return (
    
      <View style={{ flex: 1 }}>
        {/* <BackGround> */}
        <ImageBackground source={require('../../assets/reception2.jpg')} style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}>
        <Text style={{ color: "white", fontSize: 28, fontWeight: "bold", textAlign: 'center', marginTop: 50 }}>
          Welcome to {hotelName ? `${hotelName}, ${city}` : 'your hotel'}
        </Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>
          {guestData.firstname + ' ' + guestData.lastname}
          </Text>
        </View>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainer}
          scrollEnabled={true}
        />
        {/* </BackGround> */}
        </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
    
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    alignItems: 'center'
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
  checkoutButton: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eb2d2d', // Red color for "Check Out" button
    borderRadius: 10,
    marginBottom: 20,
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ClientMainMenu;
