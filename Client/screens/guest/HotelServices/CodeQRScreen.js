import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function CodeQRScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <Camera
  barCodeScannerSettings={{
    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
  }}
  style={styles.camera}
  type={type}
  onBarCodeScanned={({ type, data }) => {
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    
    // Open the URL
    if (data.startsWith('http://') || data.startsWith('https://')) {
      Linking.openURL(data);
    } else {
      console.log('Scanned data is not a valid URL.');
      // Handle other types of data if needed
    }
  }}
>
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
      <Text style={styles.text}>Flip Camera</Text>
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
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
