import React from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import { Requests } from '../../data/ClassDpData';
import RequestItem from '../../components/RequestItem';
import { useNavigation } from '@react-navigation/native';

function RequestsMnOverview({ route }) {
  const navigation = useNavigation(); // Get the navigation object
  const reqId = route.params.departmentId;

  const displayedReq = Requests.filter((reqItem) => {
    return reqItem.departmentId.indexOf(reqId) >= 0;
  });

  function renderRequestItem(itemData) {
    const item = itemData.item;
    const reqItemProps = {
      title: item.title,
    };
    return <RequestItem title={itemData.item.requestNotice} />;
  }

  function navigateToRoomCleaningScreen() {
    navigation.navigate('RoomCleaningRequestScreen'); // Change the screen name accordingly
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedReq}
        keyExtractor={(item) => item.id}
        renderItem={renderRequestItem}
      />

      {/* Conditionally render the button for the "Cleaning Room" department */}
      {reqId === 'c3' && (
        <Button
          title="Make Room Cleaning Request"
          onPress={navigateToRoomCleaningScreen}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default RequestsMnOverview;
