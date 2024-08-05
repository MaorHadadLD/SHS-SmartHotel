import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import firebase from '../../firebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';
import BackGround from '../../components/BackGround';
import Btn from '../../components/Btn';
import Checkbox from 'expo-checkbox';
import TermsAndConditions from '../../components/TermsAndConditions';
import { FontAwesome } from '@expo/vector-icons';

function HotelSelection({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [hotelData, setHotelData] = useState([]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const db = getDatabase(firebase);
        const hotelsRef = ref(db, 'Hotels/');
        const snapshot = await get(hotelsRef);
        const data = snapshot.val();

        if (data) {
          const hotels = Object.values(data);
          setHotelData(hotels);
        }
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotelData();
  }, []);

  const handleSelectHotel = (item) => {
    navigation.navigate('CodeQRScreen', {
      selectedHotel: item,
    });
    setModalVisible(false);
  };

  const renderHotelItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectHotel(item)} style={styles.card}>
      <View style={styles.iconContainer}>
        <FontAwesome name="hotel" size={24} color="#FF6B3C" />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.hotelName}>{item.hotelName}</Text>
        <Text style={styles.hotelCity}>{item.city}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <BackGround>
      <View style={styles.container}>
        <Text style={styles.headerText}>Choose the hotel where you are staying</Text>
        
        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isAgreed}
            onValueChange={setIsAgreed}
            color={isAgreed ? '#FF6B3C' : "white"}
          />
          <Text style={styles.checkboxLabel} onPress={() => setTermsVisible(true)}>
            I agree to the <Text style={styles.link}>Terms and Conditions</Text>
          </Text>
        </View>
        
        <Btn
          bgColor={isAgreed ? "#FF6B3C" : "gray"}
          btnLabel="Hotel List"
          textColor="white"
          Press={() => isAgreed && setModalVisible(true)}
        />

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Hotel List</Text>
            <FlatList
              data={hotelData}
              keyExtractor={(item) => `${item.hotelName}-${item.city}`}
              renderItem={renderHotelItem}
              numColumns={1}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>

      <TermsAndConditions
        visible={termsVisible}
        onClose={() => setTermsVisible(false)}
      />
    </BackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    marginVertical: 100,
    alignItems: 'center',
  },
  headerText: {
    color: "white",
    fontSize: 35,
    fontWeight: 'bold', 
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    color: 'white',
  },
  link: {
    textDecorationLine: 'underline',
    color: '#FF6B3C',
  },
  modalContainer: {
    marginTop: 64,
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingTop: 2,
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
    color: '#000',
  },
  closeModalButton: {
    marginTop: 16,
    backgroundColor: '#FF6B3C',
    padding: 10,
    borderRadius: 5,
  },
  closeModalButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    padding: 20,
    width: '77%',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#FF6B3C',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B3C',
  },
  hotelCity: {
    fontSize: 16,
    color: '#FF6B3C',
  },
});

export default HotelSelection;
