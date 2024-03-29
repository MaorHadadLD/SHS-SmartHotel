// Import necessary modules from react-native
import React from 'react';
import { FlatList } from 'react-native';
import { ClassDpCategories } from '../../data/ClassDpData';
import DpClassCategoryGridTil from '../../components/DpClassCategoryGridTil';
import { checkStatusReq } from '../../API/RequestCalls';

function HotelServicesScreen({  route, navigation }) {
  console.log('HotelServicesScreen routeGUEST', route.params.guestData);
  console.log('HotelServicesScreen routeHOTEL', route.params.selectedHotel);
  function renderClassDpCategoryItem(itemData) {

    console.log('itemData', itemData);
    const pressHandler = async () => {
      if (itemData.item.title === 'Dining Room') {
        try {
          const bodyrequest = {
            roomNumber: route.params.guestData.roomNumber,
            type: 'Dinning',
            hotel: route.params.guestData.selectedHotel
          };
          const result = await checkStatusReq(bodyrequest);
          if(result.success){
            alert('You have already made a resevertion for Dining Room. Please wait to be served before making another request');

          } else {
            navigation.navigate('DiningRoomScreen', { guestData: route.params.guestData, selectedHotel: route.params.selectedHotel });          }
        } catch (error) {
        console.error('DiningRoom error: ', error);
      }
       
      } else if(itemData.item.title === 'Cleaning Room') {

          try {
            const bodyrequest = {
              roomNumber: route.params.guestData.roomNumber,
              type: 'CleaningRoom',
              hotel: route.params.guestData.selectedHotel
            };
            const result = await checkStatusReq(bodyrequest);
            if(result.success){
              alert('You have already made a request for Cleaning Room. Please wait to be served before making another request');

            } else {
              navigation.navigate('RoomCleaningRequestScreen',{ guestData: route.params.guestData, selectedHotel: route.params.selectedHotel });
            }
          } catch (error) {
          console.error('CleaningRoom error: ', error);
        }
      } else if(itemData.item.title === 'Room Service'){
          navigation.navigate('RoomServiceRequestsScreen', { guestData: route.params.guestData, selectedHotel: route.params.selectedHotel });
      } else if(itemData.item.title === 'Pool Bar'){
          navigation.navigate('PoolBarRequestScreen', { guestData: route.params.guestData, selectedHotel: route.params.selectedHotel });
      } else {
          alert('This service is not available');
      }
    }

    return (
      <DpClassCategoryGridTil
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={ClassDpCategories}
      keyExtractor={(item) => item.id}
      renderItem={renderClassDpCategoryItem}
      numColumns={2}
    />
  );
}

export default HotelServicesScreen;
