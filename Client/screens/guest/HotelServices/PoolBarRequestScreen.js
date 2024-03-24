import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {Requests} from "../../../data/ClassDpData";
import { sendPostRequest } from '../../../API/RequestCalls';

function PoolBarRequestScreen({route, navigation}) {
    const departmentId = 'PoolBar'; // Adjust departmentId for room service
  // const database = getDatabase(firebaseApp);
  console.log('PoolBarRequestScreen route :', route.params);

  const poolBarServiceRequests = Requests.filter((reqItem) => {
    return reqItem.departmentId.includes(departmentId);
  });

  const [customRequest, setCustomRequest] = React.useState('');
  
  const handleRequestSubmit = async(request) => {
    try{
       const bodyrequest = { request, type: departmentId, roomNumber: route.params.guestData.roomNumber, selectedHotel: route.params.guestData.selectedHotel };
       const response = await sendPostRequest(bodyrequest);
        if (response.success) {
          alert('Request submitted successfully');
          navigation.navigate('ClientMainMenu', { selectedHotel: route.params.selectedHotel, guestData: route.params.guestData });
        }
    }
    catch (error) {
      console.error('Pool Bar request error:', error.message);
    }
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
        {poolBarServiceRequests.map((request) =>
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
        disabled={poolBarServiceRequests.length === 0}
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

  export default PoolBarRequestScreen;