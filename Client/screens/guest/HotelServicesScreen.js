// Import necessary modules from react-native
import React from 'react';
import { FlatList } from 'react-native';
import { ClassDpCategories } from '../../data/ClassDpData';
import DpClassCategoryGridTil from '../../components/DpClassCategoryGridTil';

function HotelServicesScreen({ navigation }) {
  function renderClassDpCategoryItem(itemData) {
    function pressHandler() {
      if (itemData.item.title === 'Dining Room') {
        navigation.navigate('DiningRoomScreen');
      } else {
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
