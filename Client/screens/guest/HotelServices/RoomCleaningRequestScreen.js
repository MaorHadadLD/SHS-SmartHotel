import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {Requests} from "../../../data/ClassDpData";

import { sendPostRequest } from '../../../API/RequestCalls';
import BackGround from '../../../components/BackGround';




function RoomCleaningRequestScreen({ route, navigation }) {
  const departmentId = 'CleaningRoom';
  console.log('RoomCleaningRequestScreen route TESTINGREPHAL:', route.params);
  // const database = getDatabase(firebaseApp);

  const cleaningRoomRequests = Requests.filter((reqItem) => {
    return reqItem.departmentId.includes(departmentId);
  });

  const [customRequest, setCustomRequest] =React.useState('');

  const handleRequestSubmit = async (request)  => {
    try {
      const bodyrequest = { request, type: departmentId, roomNumber: route.params.guestData.roomNumber, selectedHotel: route.params.guestData.selectedHotel };
      console.log('bodyrequest beavilBDIKA:', bodyrequest);
      const response = await sendPostRequest(bodyrequest);
      if (response.success) {
        alert('Request submitted successfully');
        console.log('RoomCleaningRequestScreen route.params:', route.params);
        navigation.navigate('ClientMainMenu', { selectedHotel: route.params.selectedHotel, guestData: route.params.guestData });
        
      }
    } catch (error) {
      console.error('Room cleaning request error:', error.message);
    }
    // const requestId = uuidv4();
    // const requestsRef = ref(database, 'RoomCleaningRequest');

    // const newRequest = {
    //   id: requestId,
    //   departmentId: departmentId,
    //   requestNotice: request,
    // };

    // // Using push to generate a new unique child location
    // const newRequestRef = push(requestsRef);
    
    // set(newRequestRef, newRequest)
    //   .then(() => {
    //     console.log('Request saved to the database:', newRequest);
    //     // Additional logic after successfully saving the request
    //   })
    //   .catch((error) => {
    //     console.error('Error saving request to the database:', error);
    //   });
  };

  function renderPredefinedRequestButton(request) {
    return (
      <TouchableOpacity
        key={request.id}
        style={styles.requestButton}
        onPress={() => handleRequestSubmit(request.requestNotice)}
      >
        <Text style={styles.buttonText}>{request.requestNotice}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <BackGround>
    <View style={styles.container}>
      <Text style={styles.title}>Choose a predefined request:</Text>
      <View style={styles.buttonContainer}>
        {cleaningRoomRequests.map((request) =>
          renderPredefinedRequestButton(request)
        )}
      </View>

      <Text style={styles.title}>Or enter your own request:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your request here..."
        onChangeText={(text) => setCustomRequest(text)}
        value={customRequest}
      />
      {/* <Btn title="Submit Request" onPress={() => handleRequestSubmit(customRequest)} disabled={cleaningRoomRequests.length === 0} /> */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => handleRequestSubmit(customRequest)}
        disabled={cleaningRoomRequests.length === 0}
      >
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </View>
    </BackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: Platform.OS === 'ios' ? 40 : 0, // Adjust marginTop for iOS status bar
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  requestButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    opacity: 0.6, // Adjust the opacity to visually indicate that the button is disabled
  },
});

export default RoomCleaningRequestScreen;
