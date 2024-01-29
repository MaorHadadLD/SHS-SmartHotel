import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {Requests} from "../../../data/ClassDpData";
import { getDatabase, ref, set, push } from 'firebase/database';
import firebaseApp from '../../../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

function RoomServiceRequestsScreen() {
  const departmentId = 'RoomService'; // Adjust departmentId for room service
  const database = getDatabase(firebaseApp);

  const roomServiceRequests = Requests.filter((reqItem) => {
    return reqItem.departmentId.includes(departmentId);
  });

  const [customRequest, setCustomRequest] = React.useState('');
  
  function handleRequestSubmit(request) {
    const requestId = uuidv4();
    const requestsRef = ref(database, 'roomServiceRequests');

    const newRequest = {
      id: requestId,
      departmentId: departmentId,
      requestNotice: request,
    };

    // Using push to generate a new unique child location
    const newRequestRef = push(requestsRef);

    set(newRequestRef, newRequest)
      .then(() => {
        console.log('Request saved to the database:', newRequest);
        // Additional logic after successfully saving the request
      })
      .catch((error) => {
        console.error('Error saving request to the database:', error);
      });
  }

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
    <View style={styles.container}>
      <Text style={styles.title}>Choose a predefined request:</Text>
      <View style={styles.buttonContainer}>
        {roomServiceRequests.map((request) =>
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

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => handleRequestSubmit(customRequest)}
        disabled={roomServiceRequests.length === 0}
      >
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      marginTop: Platform.OS === 'ios' ? 40 : 0, // Adjust marginTop for iOS status bar
    },
    title: {
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
export default RoomServiceRequestsScreen;
