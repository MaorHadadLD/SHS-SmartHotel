import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { HotelModel } from '../../data/HotelData';
import HotelItem from '../../components/HotelItem';

function HotelSelection({ navigation }) {

  function renderClassHotelItem(itemData) {
    function pressHandler() {
      navigation.navigate('RequestsScreen');
    }

    return <HotelItem
      name={itemData.item.name}
      city={itemData.item.city}
      onPress={pressHandler}
    />;
  };

  return (
      <FlatList
        data={HotelModel}
        keyExtractor={(item) => item.id}
        renderItem={renderClassHotelItem}
        numColumns={2}
      />
  );
};

export default HotelSelection