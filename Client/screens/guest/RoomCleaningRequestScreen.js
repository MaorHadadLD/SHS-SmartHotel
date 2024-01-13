// Import necessary modules from react-native
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Requests } from '../../data/ClassDpData';

function RoomCleaningRequestScreen({ navigation }) {
  const cleaningRoomRequests = Requests.filter((reqItem) => {
    return reqItem.departmentId.includes('c3'); // Adjust the department ID accordingly
  });

  const [customRequest, setCustomRequest] = React.useState('');

  function handleRequestSubmit(request) {
    // Here, you can handle the submission of the request, e.g., send it to the database
    console.log('Submitted Request:', request);
    // You can add logic here to send the request to the database
  }

  function renderPredefinedRequestButton(request) {
    return (
      <Button
        key={request.id}
        title={request.requestNotice}
        onPress={() => handleRequestSubmit(request.requestNotice)}
      />
    );
  }

  return (
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

      <Button
        title="Submit Request"
        onPress={() => handleRequestSubmit(customRequest)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
  },
});

export default RoomCleaningRequestScreen;

