import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, I18nManager } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getGuestDetails } from '../../API/GuestCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

function ClientMainMenu({ route }) {
  const guestEmail = route.params.guestData.email || {};
  const [guestData, setGuestData] = useState([]);
  const navigation = useNavigation();
  const { hotelName, city } = route.params.selectedHotel;

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
      guestData: guestData,
    });
  };

  const menuItems = [
    { id: '1', title: "Hotel Information", screen: "HotelInfoScreen", icon: 'info-circle' },
    // { id: '2', title: "Room Key", screen: "RoomKeyScreen", icon: 'key' },
    { id: '2', title: "Hotel Services", screen: "HotelServicesScreen", icon: 'concierge-bell' },
    { id: '3', title: "Request Tracking", screen: "RequestTrackingScreen", icon: 'clipboard-list' },
    { id: '4', title: "Nearby Activities", screen: "NearbyActivitiesScreen", icon: 'map-marker-alt' },
    { id: '5', title: "Spa", screen: "SpaMainScreen", icon: 'spa' },
    { id: '6', title: "Check Out", screen: "CheckOutScreen", icon: 'sign-out-alt' },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => handleNavigate(item.screen)}>
        <FontAwesome5 name={item.icon} size={24} color="#333" style={styles.icon} />
        <Text style={styles.cardText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../../assets/reception2.jpg')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>
            Welcome to {hotelName ? `${hotelName}, ${city}` : 'your hotel'}
          </Text>
          <View style={styles.guestInfo}>
            <Text style={styles.guestName}>
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
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)', // Even lighter overlay
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  welcomeText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: 'center',
    marginTop: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  guestInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  guestName: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row-reverse', // Ensure icon is always on the left
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20, // Ensure text is to the right of the icon
    textAlign: 'left', // Ensure text alignment is consistent
  },
  icon: {
    marginLeft: 20, // Ensure icon is always to the left of the text
  },
});

export default ClientMainMenu;
