import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackGround from '../../components/BackGround';

function SpaMainScreen({ navigation, route }) {
  const selectedHotel = route.params.selectedHotel || {};
  const guestData = route.params.guestData || {};

  const handleOrderMassage = () => {
    navigation.navigate('SpaScreen', { selectedHotel, guestData });
  };

  const handlePriceMenu = () => {
    navigation.navigate('PriceMenuScreen');
  };

  const handleViewAppointments = () => {
    navigation.navigate('GuestAppointmentsScreen', { guestData });
  };

  return (
    <BackGround>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to {selectedHotel.hotelName} SPA</Text>
        <TouchableOpacity style={styles.button} onPress={handleOrderMassage}>
          <Text style={styles.buttonText}>Book a massage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePriceMenu}>
          <Text style={styles.buttonText}>Prices</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleViewAppointments}>
          <Text style={styles.buttonText}>View Appointments</Text>
        </TouchableOpacity>
      </View>
    </BackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: "white",
    fontSize: 58,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    borderRadius: 100,
    alignItems: "center",
    width: 350,
    paddingVertical: 5,
    marginVertical: 10,
    backgroundColor: '#FF6B3C',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SpaMainScreen;
