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
  
  const [showBreakfastInfo, setShowBreakfastInfo] = useState(false);
  const [showDinnersInfo, setShowDinnersInfo] = useState(false);
  const [showLobbyBarInfo, setShowLobbyBarInfo] = useState(false);
  const [showSpaInfo, setShowSpaInfo] = useState(false);
  const [showwifiInfo, setShowwifiInfo] = useState(false);
  const [showGymInfo, setShowGymInfo] = useState(false);
  const [showEntertainmentInfo, setShowEntertainmentInfo] = useState(false);





  // return (
  //   <BackGround>
  //   <ScrollView style={styles.container}>
  //     <Text style={styles.heading}>Hotel Information - {hotelName}</Text>

  //     <View style={styles.infoContainer}>
  //       <Text style={styles.infoTitle}>Breakfasts:</Text>
  //       <Text style={styles.infoText}>{breakfastInfo}</Text>
  //     </View>

  //     <View style={styles.infoContainer}>
  //       <Text style={styles.infoTitle}>Dinners:</Text>
  //       <Text style={styles.infoText}>{dinnerInfo}</Text>
  //     </View>

  //     <View style={styles.infoContainer}>
  //       <Text style={styles.infoTitle}>Lobby Bar:</Text>
  //       <Text style={styles.infoText}>{lobbyBarInfo}</Text>
  //     </View>

  //     <View style={styles.infoContainer}>
  //       <Text style={styles.infoTitle}>Spa:</Text>
  //       <Text style={styles.infoText}>{spaInfo}</Text>
  //     </View>

  //     <View style={styles.infoContainer}>
  //       <Text style={styles.infoTitle}>Wifi:</Text>
  //       <Text style={styles.infoText}>{wifiInfo}</Text>
  //     </View>

  //     <View style={styles.infoContainer}>
  //       <Text style={styles.infoTitle}>Gym:</Text>
  //       <Text style={styles.infoText}>{gymInfo}</Text>
  //     </View>

  //     <View style={styles.infoContainer}>
  //       <Text style={styles.infoTitle}>Entertainment:</Text>
  //       <Text style={styles.infoText}>{entertainmentInfo}</Text>
  //     </View>

  //     <View style={styles.infoContainer}>
  //       <Text style={styles.infoTitle}>Pool:</Text>
  //       <Text style={styles.infoText}>{poolInfo}</Text>
  //     </View>

  //     <View style={styles.infoContainer}>
  //       <Text style={styles.infoTitle}>Pool Bar:</Text>
  //       <Text style={styles.infoText}>{PoolBarInfo}</Text>
  //     </View>

  //     <View style={styles.infoContainer}>
  //       <Text style={styles.infoTitle}>Synagogue:</Text>
  //       <Text style={styles.infoText}>{SynagogueInfo}</Text>
  //     </View>

  //     <View style={styles.infoContainer}>
  //       <Text style={styles.infoTitle}>Key On Saturday:</Text>
  //       <Text style={styles.infoText}>{KeyOnSaturday}</Text>
  //     </View>

  //     <View style={styles.infoContainer}>
  //       <Text style={styles.infoTitle}>Check Out:</Text>
  //       <Text style={styles.infoText}>{checkOutInfo}</Text>
  //     </View>
  //   </ScrollView>
  //   </BackGround>
  // );
  return (
    <BackGround>
      <ScrollView style={styles.container}>
        <Text style={{ color: "white", fontSize: 58, fontWeight: 'bold', marginBottom: 10 }}>Hotel Information </Text>

        {/* Button to show breakfast info */}
        {!showBreakfastInfo && (
          <Btn
            bgColor="#FF6B3C"
            btnLabel="Breakfast Info"
            textColor="white"
            Press={() => setShowBreakfastInfo(true)}
          />
        )}

        {/* Show breakfast info if the button is pressed */}
        {showBreakfastInfo && (
          <View style={styles.infoContainer}>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Breakfasts</Text>
              <Text style={styles.infoText}>{breakfastInfo}</Text>
              <View style={styles.buttonContainer}>
                <Btn
                  bgColor="#FF6B3C"
                  btnLabel="Hide Breakfast Info"
                  textColor="white"
                  Press={() => setShowBreakfastInfo(false)}
                />
              </View>
            </View>
          </View>
        )}
        {/* Button to show Dinners info */}
        {!showDinnersInfo && (
          <Btn
            bgColor="#FF6B3C"
            btnLabel="Dinners Info"
            textColor="white"
            Press={() => setShowDinnersInfo(true)}
          />
        )}

        {/* Show Dinners info if the button is pressed */}
        {showDinnersInfo && (
          <View style={styles.infoContainer}>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Dinners</Text>
              <Text style={styles.infoText}>{dinnerInfo}</Text>
              <View style={styles.buttonContainer}>
                <Btn
                  bgColor="#FF6B3C"
                  btnLabel="Hide Dinners Info"
                  textColor="white"
                  Press={() => setShowDinnersInfo(false)}
                />
              </View>
            </View>
          </View>
        )}
        
        {/* Button to show Lobby Bar info */}
        {!showLobbyBarInfo && (
          <Btn
            bgColor="#FF6B3C"
            btnLabel="Lobby Bar Info"
            textColor="white"
            Press={() => setShowLobbyBarInfo(true)}
          />
        )}

        {/* Show Lobby Bar info if the button is pressed */}
        {showLobbyBarInfo && (
          <View style={styles.infoContainer}>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Lobby Bar</Text>
              <Text style={styles.infoText}>{lobbyBarInfo}</Text>
              <View style={styles.buttonContainer}>
                <Btn
                  bgColor="#FF6B3C"
                  btnLabel="Hide Lobby Bar Info"
                  textColor="white"
                  Press={() => setShowLobbyBarInfo(false)}
                />
              </View>
            </View>
          </View>
        )}
        {/* Button to show Spa info */}
        {!showSpaInfo && (
          <Btn
            bgColor="#FF6B3C"
            btnLabel="Spa Info"
            textColor="white"
            Press={() => setShowSpaInfo(true)}
          />
        )}

        {/* Show Spa info if the button is pressed */}
        {showSpaInfo && (
          <View style={styles.infoContainer}>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Spa</Text>
              <Text style={styles.infoText}>{spaInfo}</Text>
              <View style={styles.buttonContainer}>
                <Btn
                  bgColor="#FF6B3C"
                  btnLabel="Hide Spa Info"
                  textColor="white"
                  Press={() => setShowSpaInfo(false)}
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
        
       {/* Button to show Gym info */}
       {!showGymInfo && (
          <Btn
            bgColor="#FF6B3C"
            btnLabel="Gym Info"
            textColor="white"
            Press={() => setShowGymInfo(true)}
          />
        )}

        {/* Show Gym info if the button is pressed */}
        {showGymInfo && (
          <View style={styles.infoContainer}>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Gym</Text>
              <Text style={styles.infoText}>{gymInfo}</Text>
              <View style={styles.buttonContainer}>
                <Btn
                  bgColor="#FF6B3C"
                  btnLabel="Gym Info"
                  textColor="white"
                  Press={() => setShowGymInfo(false)}
                />
              </View>
            </View>
          </View>
        )}
        
      {/* Button to show Entertainment info */}
      {!showEntertainmentInfo && (
          <Btn
            bgColor="#FF6B3C"
            btnLabel="Entertainment Info"
            textColor="white"
            Press={() => setShowEntertainmentInfo(true)}
          />
        )}

        {/* Show Entertainment info if the button is pressed */}
        {showEntertainmentInfo && (
          <View style={styles.infoContainer}>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Entertainment</Text>
              <Text style={styles.infoText}>{entertainmentInfo}</Text>
              <View style={styles.buttonContainer}>
                <Btn
                  bgColor="#FF6B3C"
                  btnLabel="Entertainment Info"
                  textColor="white"
                  Press={() => setShowEntertainmentInfo(false)}
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
    height: 700,
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
