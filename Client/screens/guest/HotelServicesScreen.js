// Import necessary modules from react-native
import React from 'react';
import { FlatList } from 'react-native';
import { ClassDpCategories } from '../../data/ClassDpData';
import DpClassCategoryGridTil from '../../components/DpClassCategoryGridTil';

function HotelServicesScreen({ navigation }) {
  function renderClassDpCategoryItem(itemData) {
    const pressHandler = async() => {
      if (itemData.item.title === 'Dining Room') {
        navigation.navigate('DiningRoomScreen');
      }else if(itemData.item.title === 'Cleaning Room'){
        // const result = await checkStatusReq(roomNumber, 'RoomCleaningRequest');
        // if(result.success){
        //     alert('You have already made a request');
        // }else{
        navigation.navigate('RoomCleaningRequestScreen');
        // }
      }
      else if(itemData.item.title === 'Room Service'){
        navigation.navigate('RoomServiceRequestsScreen');
      }
      else if(itemData.item.title === 'Pool Bar'){
        navigation.navigate('PoolBarRequestScreen');
      }
       else {
        navigation.navigate('RequestsMnOverview', {
          departmentId: itemData.item.id,
        });
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
