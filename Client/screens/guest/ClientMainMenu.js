import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getGuestDetails } from '../../API/GuestCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Btn from "../../components/Btn";

function ClientMainMenu({route}) {
  const guestEmail  = route.params.guestData.email || {};
  const [guestData, setGuestData] = useState([]);
  const navigation = useNavigation();
  const { hotelName, city } =  route.params.selectedHotel;

  useEffect(() => {
    const getGuestData = async () => {
      try {
        const storedGuestData = await AsyncStorage.getItem('guestData');
        if (storedGuestData) {
          setGuestData(JSON.parse(storedGuestData));
        } else {
          const results = await getGuestDetails(guestEmail);
          if (results.success) {
            setGuestData(results.data);
            await AsyncStorage.setItem('guestData', JSON.stringify(results.data));
          }
        }
      } catch (error) {
        console.error('Error retrieving guest data:', error.message);
      }
    };
    getGuestData();
  }, [guestEmail]);

  const handleNavigate = (screen) => {
    navigation.navigate(screen, {
      selectedHotel: route.params.selectedHotel,
      guestData: guestData
    });
  };

  const menuItems = [
    { id: '1', title: "Hotel Information", screen: "HotelInfoScreen" },
    { id: '2', title: "Room Key", screen: "RoomKeyScreen" },
    { id: '3', title: "Hotel Services", screen: "HotelServicesScreen" },
    { id: '4', title: "Request Tracking", screen: "RequestTrackingScreen" },
    { id: '5', title: "Nearby Activities", screen: "NearbyActivitiesScreen" },
    { id: '6', title: "Spa", screen: "SpaMainScreen" },
    { id: '7', title: "check out", screen: "CheckOutScreen" },
  ];

  const renderItem = ({ item }) => {
    const buttonStyle = item.title === "check out" ? styles.checkoutButton : styles.menuItem;
    const textStyle = item.title === "check out" ? styles.checkoutButtonText : styles.menuItemText;

    return (
      <View style={styles.container}>
        <Btn bgColor="white" btnLabel={item.title} textColor="black" Press={() => handleNavigate(item.screen)} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  menuItem: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  checkoutButton: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eb2d2d',
    borderRadius: 10,
    marginBottom: 10,
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ClientMainMenu;
