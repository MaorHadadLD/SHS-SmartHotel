import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";


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

  const [showwifiInfo, setShowwifiInfo] = useState(false);
  const [showCheckOutInfo, setShowCheckOutInfo] = useState(false);
  const [showHotelResturantInfo, setShowHotelResturantInfo] = useState(false);
  const [showHotelActivityInfo, setShowHotelActivityInfo] = useState(false);
  const [showSnacksduringthedayInfo, setShowSnacksduringthedayInfo] = useState(false);
  const [showSabbathInfo, setShowSabbathInfo] = useState(false);

  return (
    <ImageBackground source={require("../../assets/mod1.jpg")} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Hotel Information</Text>
        </View>

        {!showHotelResturantInfo && (
          <TouchableOpacity style={styles.btn} onPress={() => setShowHotelResturantInfo(true)}>
            <Text style={styles.btnText}>Hotel Restaurant Info</Text>
          </TouchableOpacity>
        )}
        {showHotelResturantInfo && (
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Breakfasts</Text>
            <Text style={styles.infoText}>{breakfastInfo}</Text>
            <Text style={styles.infoTitle}>Dinners</Text>
            <Text style={styles.infoText}>{dinnerInfo}</Text>
            <TouchableOpacity style={styles.btnClose} onPress={() => setShowHotelResturantInfo(false)}>
              <Text style={styles.btnText}>Hide Restaurant Info</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showHotelActivityInfo && (
          <TouchableOpacity style={styles.btn} onPress={() => setShowHotelActivityInfo(true)}>
            <Text style={styles.btnText}>Hotel Activity Info</Text>
          </TouchableOpacity>
        )}
        {showHotelActivityInfo && (
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Pool</Text>
            <Text style={styles.infoText}>{poolInfo}</Text>
            <Text style={styles.infoTitle}>Spa</Text>
            <Text style={styles.infoText}>{spaInfo}</Text>
            <Text style={styles.infoTitle}>Gym</Text>
            <Text style={styles.infoText}>{gymInfo}</Text>
            <Text style={styles.infoTitle}>Entertainment</Text>
            <Text style={styles.infoText}>{entertainmentInfo}</Text>
            <TouchableOpacity style={styles.btnClose} onPress={() => setShowHotelActivityInfo(false)}>
              <Text style={styles.btnText}>Hide Activity Info</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showSnacksduringthedayInfo && (
          <TouchableOpacity style={styles.btn} onPress={() => setShowSnacksduringthedayInfo(true)}>
            <Text style={styles.btnText}>Snacks During the Day Info</Text>
          </TouchableOpacity>
        )}
        {showSnacksduringthedayInfo && (
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Lobby Bar</Text>
            <Text style={styles.infoText}>{lobbyBarInfo}</Text>
            <Text style={styles.infoTitle}>Pool Bar</Text>
            <Text style={styles.infoText}>{PoolBarInfo}</Text>
            <TouchableOpacity style={styles.btnClose} onPress={() => setShowSnacksduringthedayInfo(false)}>
              <Text style={styles.btnText}>Hide Snacks Info</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showSabbathInfo && (
          <TouchableOpacity style={styles.btn} onPress={() => setShowSabbathInfo(true)}>
            <Text style={styles.btnText}>Shabbat Info</Text>
          </TouchableOpacity>
        )}
        {showSabbathInfo && (
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Synagogue</Text>
            <Text style={styles.infoText}>{SynagogueInfo}</Text>
            <Text style={styles.infoTitle}>Key On Saturday</Text>
            <Text style={styles.infoText}>{KeyOnSaturday}</Text>
            <TouchableOpacity style={styles.btnClose} onPress={() => setShowSabbathInfo(false)}>
              <Text style={styles.btnText}>Hide Shabbat Info</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showwifiInfo && (
          <TouchableOpacity style={styles.btn} onPress={() => setShowwifiInfo(true)}>
            <Text style={styles.btnText}>WiFi Info</Text>
          </TouchableOpacity>
        )}
        {showwifiInfo && (
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>WiFi</Text>
            <Text style={styles.infoText}>{wifiInfo}</Text>
            <TouchableOpacity style={styles.btnClose} onPress={() => setShowwifiInfo(false)}>
              <Text style={styles.btnText}>Hide WiFi Info</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showCheckOutInfo && (
          <TouchableOpacity style={styles.btn} onPress={() => setShowCheckOutInfo(true)}>
            <Text style={styles.btnText}>Check Out Info</Text>
          </TouchableOpacity>
        )}
        {showCheckOutInfo && (
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Check Out</Text>
            <Text style={styles.infoText}>{checkOutInfo}</Text>
            <TouchableOpacity style={styles.btnClose} onPress={() => setShowCheckOutInfo(false)}>
              <Text style={styles.btnText}>Hide Check Out Info</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background with some opacity
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20, // Adjust this value to move the header down
  },
  header: {
    fontSize: 36,
    color: "#fff",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: "#FF6B3C",
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnClose: {
    backgroundColor: "#FF6B3C",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  infoSection: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 24,
    color: "#333",
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    textAlign: 'center',
  },
});

export default HotelInfoScreen;
