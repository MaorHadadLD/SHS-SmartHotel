import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HeaderHome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')} // Adjust the path to your logo image
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.welcomeText}>Welcome to smart hotel</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 150, // Adjust as needed for the gap between logo and text
  },
  logoContainer: {
    paddingTop: 0, // Adjust as needed for the gap between logo and screen top
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10, // Adjust as needed for the gap between text and buttons
    color: "white", // Adjust the color as needed
  },
  logo: {
    width: 200, // Adjust according to your logo size
    height: 200, // Adjust according to your logo size
  },
});

export default HeaderHome;
