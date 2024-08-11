import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CodeQRScreen(route) {
  const selectedHotel = route.route.params;
  const { hotelName, city } = selectedHotel || {};
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const navigation = useNavigation();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', color:"white", fontWeight:'bold' }}>We need your permission to open your camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function handleBarCodeScanned({ type, data }) {
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);

    // Open the URL
    if (data.startsWith('http://') || data.startsWith('https://')) {
      Linking.openURL(data);
    } else {
      console.log('Scanned data is not a valid URL.');
      // Handle other types of data if needed
    }

    // Navigate to the "VerificationScreen" screen
    navigation.navigate('VerificationScreen', { selectedHotel: selectedHotel.selectedHotel });
  }

  // New function to handle cancel button click
  function handleCancel() {
    // Navigate to the "VerificationScreen" screen
    navigation.navigate('VerificationScreen', { selectedHotel: selectedHotel.selectedHotel });
  }

  return (
    <View style={styles.container}>
      <Camera
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        style={styles.camera}
        type={type}
        onBarCodeScanned={handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <MaterialIcons name="flip-camera-android" size={30} color="#FF6B3C" />
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <MaterialIcons name="cancel" size={30} color="#FF6B3C" />
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000', 
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute', 
    bottom: 0,
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  button: {
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5, 
  },
  permissionButton: {
    backgroundColor: '#FF6B3C',
    padding: 12,
    width: 200,
    borderRadius: 8,
    marginTop: 30,
    alignSelf: 'center',
  },
  permissionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});
