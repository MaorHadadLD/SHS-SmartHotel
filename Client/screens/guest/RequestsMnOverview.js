import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
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

      {/* Display the button to navigate to the Room Cleaning Request Screen */}
      {reqId === 'c3' && (
        <TouchableOpacity
          style={styles.roomCleanButton}
          onPress={navigateToRoomCleaningScreen}
        >
          <Text style={styles.buttonText}>Make Room Cleaning Request</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  roomCleanButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default RequestsMnOverview;
