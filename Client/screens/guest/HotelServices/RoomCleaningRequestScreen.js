import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView, ImageBackground } from 'react-native';
import { Requests } from "../../../data/ClassDpData";
import { sendPostRequest } from '../../../API/RequestCalls';
import Icon from 'react-native-vector-icons/FontAwesome5';

const backgroundImageUri = require('../../../assets/resort_cleaning.jpg');

function RoomCleaningRequestScreen({ route, navigation }) {
  const departmentId = 'CleaningRoom';
  const cleaningRoomRequests = Requests.filter((reqItem) => reqItem.departmentId.includes(departmentId));
  const [customRequest, setCustomRequest] = React.useState('');

  const handleRequestSubmit = async (request) => {
    try {
      const bodyrequest = { request, type: departmentId, roomNumber: route.params.guestData.roomNumber, selectedHotel: route.params.guestData.selectedHotel };
      const response = await sendPostRequest(bodyrequest);
      if (response.success) {
        alert('Request submitted successfully');
        navigation.navigate('ClientMainMenu', { selectedHotel: route.params.selectedHotel, guestData: route.params.guestData });
      }
    } catch (error) {
      console.error('Room cleaning request error:', error.message);
    }
  };

  function renderPredefinedRequestButton(request) {
    return (
      <TouchableOpacity
        key={request.id}
        style={styles.requestButton}
        onPress={() => handleRequestSubmit(request.requestNotice)}
      >
        <Icon name="broom" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>{request.requestNotice}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <ImageBackground source={backgroundImageUri} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Room Cleaning Requests</Text>
        </View>
        <Text style={styles.subtitle}>Choose a predefined request or enter your own:</Text>
        <View style={styles.scatteredContainer}>
          {renderPredefinedRequestButton({ id: 1, requestNotice: "The room is not clean" })}
          {renderPredefinedRequestButton({ id: 2, requestNotice: "No towels in the room." })}
          {renderPredefinedRequestButton({ id: 3, requestNotice: "There are no toiletries for the shower." })}
          {renderPredefinedRequestButton({ id: 4, requestNotice: "No toilet paper." })}
          <View style={styles.inlineContainer}>
            {renderPredefinedRequestButton({ id: 5, requestNotice: "Extra pillows" })}
            {renderPredefinedRequestButton({ id: 6, requestNotice: "A blanket" })}
          </View>
          {renderPredefinedRequestButton({ id: 7, requestNotice: "Room freshener" })}
        </View>
        <Text style={styles.orText}>Or</Text>
        <View style={styles.customRequestContainer}>
          <Icon name="pen" size={20} color="#333" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Type your request here..."
            placeholderTextColor="#aaa"
            onChangeText={(text) => setCustomRequest(text)}
            value={customRequest}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleRequestSubmit(customRequest)}
          disabled={cleaningRoomRequests.length === 0 && !customRequest}
        >
          <Icon name="paper-plane" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  scatteredContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  requestButton: {
    backgroundColor: '#3498db',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    width: 'auto',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    marginLeft: 10,
    flexWrap: 'wrap',
  },
  buttonIcon: {
    marginRight: 10,
  },
  orText: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  customRequestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  input: {
    height: 50,
    flex: 1,
    color: '#333',
    marginLeft: 10,
  },
  inputIcon: {
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#e67e22',
    borderRadius: 25,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default RoomCleaningRequestScreen;
