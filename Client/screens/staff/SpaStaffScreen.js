import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getDatabase, ref, update, onValue, child } from 'firebase/database';
import firebaseApp from '../../firebaseConfig';
import { Calendar } from 'react-native-calendars';

function SpaStaffScreen() {
  const [requests, setRequests] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Initial selected date

  useEffect(() => {
    // Fetch spa requests from the database
    const db = getDatabase(firebaseApp);
    const requestsRef = ref(db, 'appointments');
    // Listen for changes in the requests data
    const unsubscribe = onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Requests data:', data);
      if (data) {
        const requestsList = Object.values(data);
        console.log('Requests list:', requestsList);
        setRequests(requestsList);
      } else {
        setRequests([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleApproveRequest = (requestId) => {
    console.log('Approve request:', requestId);
    // Update the status of the request to 'approved' in the database
    const db = getDatabase(firebaseApp);
    const requestsRef = ref(db, 'appointments');
    update(child(requestsRef, requestId), { status: 'approved' });
    Alert.alert('Success', 'Request approved successfully');
    // Notify the client about the approval
    // Implement notification logic here (using FCM or other service)
  };

  const handleDeclineRequest = (requestId) => {
    // Update the status of the request to 'declined' in the database
    console.log('Decline request:', requestId);
    const db = getDatabase(firebaseApp);
    const requestsRef = ref(db, 'appointments');
    update(child(requestsRef, requestId), { status: 'declined' });
    Alert.alert('Success', 'Request declined successfully');
    // Notify the client about the decline
    // Implement notification logic here (using FCM or other service)
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItemContainer}>
      <Text style={styles.requestItemText}>{`Guest: ${item.guest}`}</Text>
      <Text style={styles.requestItemText}>{`Hotel: ${item.hotel.hotelName}, ${item.hotel.city}`}</Text>
      {/* <Text style={styles.requestItemText}>{`Date: ${item.date}`}</Text> */}
      <Text style={styles.requestItemText}>{`Time: ${item.time}`}</Text>
      <Text style={styles.requestItemText}>{`Massage Type: ${item.massageType}`}</Text>
      <Text style={styles.requestItemText}>{`Therapist Gender: ${item.therapistGender}`}</Text>
      {item.massageType === 'double' && <Text style={styles.requestItemText}>{`Second Therapist Gender: ${item.secondTherapistGender}`}</Text>}
      <Text style={styles.requestItemText}>{`Additional Comments: ${item.additionalComments}`}</Text>
      {item.status === 'pending' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.approveButton]} onPress={() => handleApproveRequest(item.id)}>
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={() => handleDeclineRequest(item.id)}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  // Create a function to map dates with requests to marked dates for the Calendar
  const mapDatesWithRequests = () => {
    const markedDates = {};
    requests.forEach((item) => {
      const date = item.date;
      if (!markedDates[date]) {
        markedDates[date] = { marked: true, dotColor: '#FF6B3C' }; // Change dotColor as desired
      }
    });
    return markedDates;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spa Staff Dashboard</Text>
      <Calendar
       style={{ borderRadius: 10, elevation: 4, marginBottom: 20 }}
        markedDates={mapDatesWithRequests()}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />
      <FlatList
        data={requests.filter((item) => item.date === selectedDate)} // Filter requests based on selected date
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={renderRequestItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
  },
  requestItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  requestItemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  approveButton: {
    backgroundColor: 'green',
  },
  declineButton: {
    backgroundColor: 'red',
  },
});

export default SpaStaffScreen;
