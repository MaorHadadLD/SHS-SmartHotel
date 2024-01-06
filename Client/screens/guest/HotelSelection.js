import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, TouchableHighlight, Platform } from 'react-native';
import { HotelModel } from '../../data/HotelData';
import HotelItem from '../../components/HotelItem';

function HotelSelection({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleSelectHotel = (item) => {
    setSelectedHotel(item);
    setModalVisible(false);
    navigation.navigate('ClientMainMenu', {
      selectedHotel: {
        hotelName: item.hotelName,
        city: item.city,
        // Add other relevant data if needed
      },
    });
  };

  const renderClassHotelItem = ({ item }) => {
    const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableHighlight;

    return (
      <Touchable onPress={() => handleSelectHotel(item)}>
        <HotelItem hotelName={item.hotelName} city={item.city} />
      </Touchable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose the hotel where you are staying</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.showModalButton}>Show Hotel List</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Hotel List</Text>
          <FlatList
            data={HotelModel}
            keyExtractor={(item) => item.id}
            renderItem={renderClassHotelItem}
            numColumns={1}
            key={(item, index) => index.toString()}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  showModalButton: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        paddingTop: 0,
      },
    }),
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  closeModalButton: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
});

export default HotelSelection;
