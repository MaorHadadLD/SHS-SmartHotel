// HotelInfoScreen.js
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import BackGround from "../../components/BackGround";
import Btn from "../../components/Btn";
import { useState } from "react";

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
  console.log("HotelInfoScreen route.params", route.params);
  // Check if selectedHotel is defined before accessing its properties
  if (!route.params.selectedHotel) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Hotel information not available.</Text>
      </View>
    );
  }
  
  
  const [showwifiInfo, setShowwifiInfo] = useState(false);
  const [showCheckOutInfo, setShowCheckOutInfo] = useState(false);
  const [showHotelResturantInfo, setShowHotelResturantInfo] = useState(false);
  const [showHotelActivityInfo, setShowHotelActivityInfo] = useState(false);
  const [showSnacksduringthedayInfo, setShowSnacksduringthedayInfo] = useState(false);
  const [showSabbathInfo, setShowSabbathInfo] = useState(false);


  return (
    <BackGround>
      <ScrollView style={styles.container}>
        <Text style={{ color: "white", fontSize: 58, fontWeight: 'bold', marginBottom: 10 }}>Hotel Information </Text>
        {/*Button to show hotel resturant category */}
        {!showHotelResturantInfo && (
          <Btn
            bgColor="#FF6B3C"
            btnLabel="Hotel Resturant Info"
            textColor="white"
            Press={() => setShowHotelResturantInfo(true)}
          />
        )}
        
        {/* Show hotel resturant info if the button is pressed */}
        {showHotelResturantInfo && (
          <View style={styles.infoContainer}>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Breakfasts</Text>
            <Text style={styles.infoText}>{breakfastInfo}</Text>
              <Text style={styles.infoTitle}>Dinners</Text>
              <Text style={styles.infoText}>{dinnerInfo}</Text>
            <View style={styles.buttonContainer}>
              <Btn
                bgColor="#FF6B3C"
                btnLabel="Hide resturant Info"
                textColor="white"
                Press={() => setShowHotelResturantInfo(false)}
              />
            </View>
          </View>
        </View>
        )}

         {/*Button to show hotel activity category */}
         {!showHotelActivityInfo && (
          <Btn
            bgColor="#FF6B3C"
            btnLabel="Hotel activity Info"
            textColor="white"
            Press={() => setShowHotelActivityInfo(true)}
          />
        )}
        
        {/* Show hotel activity info if the button is pressed */}
        {showHotelActivityInfo && (
          <View style={styles.infoContainer}>
          <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Pool</Text>
              <Text style={styles.infoText}>{poolInfo}</Text>
            <Text style={styles.infoTitle}>Spa</Text>
            <Text style={styles.infoText}>{spaInfo}</Text>
            <Text style={styles.infoTitle}>Gym</Text>
              <Text style={styles.infoText}>{gymInfo}</Text>
              <Text style={styles.infoTitle}>Entertainment</Text>
              <Text style={styles.infoText}>{entertainmentInfo}</Text>
            <View style={styles.buttonContainer}>
              <Btn
                bgColor="#FF6B3C"
                btnLabel="Hide hotel activity Info"
                textColor="white"
                Press={() => setShowHotelActivityInfo(false)}
              />
            </View>
          </View>
        </View>
        )}

        {/*Button to show hotel activity category */}
        {!showSnacksduringthedayInfo && (
          <Btn
            bgColor="#FF6B3C"
            btnLabel="Snacks during the day Info"
            textColor="white"
            Press={() => setShowSnacksduringthedayInfo(true)}
          />
        )}
        
        {/* Show Snacks during the day info if the button is pressed */}
        {showSnacksduringthedayInfo && (
          <View style={styles.infoContainer}>
          <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Lobby Bar</Text>
              <Text style={styles.infoText}>{lobbyBarInfo}</Text>
              <Text style={styles.infoTitle}>Pool Bar</Text>
              <Text style={styles.infoText}>{PoolBarInfo}</Text>
            <View style={styles.buttonContainer}>
              <Btn
                bgColor="#FF6B3C"
                btnLabel="Hide Snacks during the day Info"
                textColor="white"
                Press={() => setShowSnacksduringthedayInfo(false)}
              />
            </View>
          </View>
        </View>
        )}

        {/*Button to show Sabbath category */}
        {!showSabbathInfo && (
          <Btn
            bgColor="#FF6B3C"
            btnLabel="Shabbat Info"
            textColor="white"
            Press={() => setShowSabbathInfo(true)}
          />
        )}
        
        {/* Show Sabbath info if the button is pressed */}
        {showSabbathInfo && (
          <View style={styles.infoContainer}>
          <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Synagogue</Text>
              <Text style={styles.infoText}>{SynagogueInfo}</Text>
              <Text style={styles.infoTitle}>Key On Saturday</Text>
              <Text style={styles.infoText}>{KeyOnSaturday}</Text>
            <View style={styles.buttonContainer}>
              <Btn
                bgColor="#FF6B3C"
                btnLabel="Hide Sabbath Info"
                textColor="white"
                Press={() => setShowSabbathInfo(false)}
              />
            </View>
          </View>
        </View>
        )}
        
       {/* Button to show wifi info */}
       {!showwifiInfo && (
          <Btn
            bgColor="#FF6B3C"
            btnLabel="wifi Info"
            textColor="white"
            Press={() => setShowwifiInfo(true)}
          />
        )}

        {/* Show wifi info if the button is pressed */}
        {showwifiInfo && (
          <View style={styles.infoContainer}>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>wifi</Text>
              <Text style={styles.infoText}>{wifiInfo}</Text>
              <View style={styles.buttonContainer}>
                <Btn
                  bgColor="#FF6B3C"
                  btnLabel="wifi Info"
                  textColor="white"
                  Press={() => setShowwifiInfo(false)}
                />
              </View>
            </View>
          </View>
        )}
        
       
       {/* Button to show Check Out info */}
       {!showCheckOutInfo && (
          <Btn
            bgColor="#FF6B3C"
            btnLabel="Check Out Info"
            textColor="white"
            Press={() => setShowCheckOutInfo(true)}
          />
        )}

        {/* Show Check Out info if the button is pressed */}
        {showCheckOutInfo && (
          <View style={styles.infoContainer}>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Check Out</Text>
              <Text style={styles.infoText}>{checkOutInfo}</Text>
              <View style={styles.buttonContainer}>
                <Btn
                  bgColor="#FF6B3C"
                  btnLabel="Check Out Info"
                  textColor="white"
                  Press={() => setShowCheckOutInfo(false)}
                />
              </View>
            </View>
          </View>
        )}



      </ScrollView>
    </BackGround>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  infoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  infoContent: {
    backgroundColor: "white",
    height: 800,
    width: 460,
    borderTopLeftRadius: 250,
    paddingTop: 100,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 40,
    color: "black",
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    color: "black",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    width: '75%', // Adjusts the width to match the container
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default HotelInfoScreen;
