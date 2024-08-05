import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
    <ImageBackground source={require('../../assets/Spa-background.jpg')} style={styles.backgroundImage}>

      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.overlay}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to {selectedHotel.hotelName} SPA</Text>
        <TouchableOpacity style={styles.button} onPress={handleOrderMassage}>
          <Text style={styles.buttonText}>Book a massage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePriceMenu}>
          <Text style={styles.buttonText}>Prices</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleViewAppointments}>
          <Text style={styles.buttonText}>View Treatments</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },
  button: {
    borderRadius: 25,
    alignItems: "center",
    width: '80%',
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 107, 60, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SpaMainScreen;
