import React from 'react';
import { FlatList, View, StyleSheet, Text, ImageBackground } from 'react-native';
import { ClassDpCategories } from '../../data/ClassDpData';
import DpClassCategoryGridTil from '../../components/DpClassCategoryGridTil';
import { checkStatusReq } from '../../API/RequestCalls';
import { LinearGradient } from 'expo-linear-gradient';
import BackGround from '../../components/BackGround';

function HotelServicesScreen({ route, navigation }) {
  function renderClassDpCategoryItem(itemData) {
    const pressHandler = async () => {
      if (itemData.item.title === 'Dining Room') {
        navigation.navigate('DiningRoomScreen', { guestData: route.params.guestData, selectedHotel: route.params.selectedHotel });
      } else if (itemData.item.title === 'Table Reservation') {
        try {
          const bodyrequest = {
            roomNumber: route.params.guestData.roomNumber,
            type: 'Dinning',
            hotel: route.params.guestData.selectedHotel
          };
          const result = await checkStatusReq(bodyrequest);
          if (result.success) {
            alert('You have already made a reservation for the Dining Room. You cannot make another reservation.');
          } else {
            navigation.navigate('TableReservation', { guestData: route.params.guestData, selectedHotel: route.params.selectedHotel });
          }
        } catch (error) {
          console.error('TableReservation error: ', error);
        }
      } else if (itemData.item.title === 'Cleaning Room') {
        try {
          const bodyrequest = {
            roomNumber: route.params.guestData.roomNumber,
            type: 'CleaningRoom',
            hotel: route.params.guestData.selectedHotel
          };
          const result = await checkStatusReq(bodyrequest);
          if (result.success) {
            alert('You have already made a request for Cleaning Room. Please wait to be served before making another request');
          } else {
            navigation.navigate('RoomCleaningRequestScreen', { guestData: route.params.guestData, selectedHotel: route.params.selectedHotel });
          }
        } catch (error) {
          console.error('CleaningRoom error: ', error);
        }
      } else if (itemData.item.title === 'Room Service') {
        navigation.navigate('RoomServiceRequestsScreen', { guestData: route.params.guestData, selectedHotel: route.params.selectedHotel });
      } else if (itemData.item.title === 'Pool Bar') {
        navigation.navigate('PoolBarRequestScreen', { guestData: route.params.guestData, selectedHotel: route.params.selectedHotel });
      } else if (itemData.item.title === 'Reception') {
        navigation.navigate('GuestChatScreen', { guestData: route.params.guestData, selectedHotel: route.params.selectedHotel });
      } else {
        alert('This service is not available');
      }
    };

    return (
      <DpClassCategoryGridTil
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
        image={itemData.item.image}
      />
    );
  }

  return (
    <BackGround>
      <ImageBackground
        source={{ uri: 'https://example.com/your-background-image.jpg' }} // Add your background image URL here
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Welcome to Hotel Services</Text>
          </View>
        </LinearGradient>
        <FlatList
          data={ClassDpCategories}
          keyExtractor={(item) => item.id}
          renderItem={renderClassDpCategoryItem}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </ImageBackground>
    </BackGround>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  headerGradient: {
    width: '100%',
    paddingVertical: 20,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default HotelServicesScreen;
