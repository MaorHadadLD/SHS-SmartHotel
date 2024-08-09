import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { getDatabase, ref, update, onValue, child } from 'firebase/database';
import firebaseApp from '../../firebaseConfig';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import LogoutButton from '../../components/LogoutButton';

function SpaStaffScreen({ route }) {
  const [requests, setRequests] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Initial selected date
  const { staffData } = route.params;
  const [isCalendarVisible, setIsCalendarVisible] = useState(true); // State to toggle calendar visibility

  useEffect(() => {
    // Fetch spa requests from the database
    const db = getDatabase(firebaseApp);
    const requestsRef = ref(db, 'appointments');

    // Listen for changes in the requests data
    const unsubscribe = onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const requestsList = Object.values(data).filter(request => 
          request.hotel.hotelName === staffData.hotel.hotelName &&
          request.hotel.city === staffData.hotel.city
        );
        setRequests(requestsList);
      } else {
        setRequests([]);
      }
    });

    return () => unsubscribe();
  }, [staffData.hotel.hotelName, staffData.hotel.city]);

  const handleApproveRequest = (requestId) => {
    // Update the status of the request to 'approved' in the database
    const db = getDatabase(firebaseApp);
    const requestsRef = ref(db, 'appointments');
    update(child(requestsRef, requestId), { status: 'approved' });
    Alert.alert('Success', 'Request approved successfully');
  };

  const handleDeclineRequest = (requestId) => {
    // Update the status of the request to 'declined' in the database
    const db = getDatabase(firebaseApp);
    const requestsRef = ref(db, 'appointments');
    update(child(requestsRef, requestId), { status: 'declined' });
    Alert.alert('Success', 'Request declined successfully');
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItemContainer}>
      <Text style={styles.requestItemTextMass}>{`${item.massageType} massage`}</Text>
      <Text style={styles.requestItemText}>{`Name: ${item.name}`}</Text>
      <Text style={styles.requestItemText}>{`Email: ${item.guest}`}</Text>
      <Text style={styles.requestItemText}>{`Phone: ${item.phone}`}</Text>
      <Text style={styles.requestItemText}>{`Time: ${item.time}`}</Text>
      <Text style={styles.requestItemText}>{`Treatment: ${item.treatmentType}`}</Text>
      <Text style={styles.requestItemText}>{`Therapist Gender: ${item.therapistGender}`}</Text>
      {item.massageType === 'double' && <Text style={styles.requestItemText}>{`Second Therapist Gender: ${item.secondTherapistGender}`}</Text>}
      <Text style={styles.requestItemText}>{`Additional Comments: ${item.additionalComments}`}</Text>
      {item.status === 'pending' ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.approveButton]} onPress={() => handleApproveRequest(item.id)}>
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={() => handleDeclineRequest(item.id)}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      ): (
        <Text style={styles.requestItemTextApproved}>{`${item.status}`}</Text>
      )}
    </View>
  );

  // Create a function to map dates with requests to marked dates for the Calendar
  const mapDatesWithRequests = () => {
    const markedDates = {};
    requests.forEach((item) => {
      const date = item.date;
      if (!markedDates[date] && item.status !== 'declined') {
        markedDates[date] = { marked: true, dotColor: '#FF6B3C' }; // Change dotColor as desired
      }
    });
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: '#FF6B3C',
    };
    return markedDates;
  };

  return (
    <ImageBackground source={require('../../assets/Spa-background.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Spa Staff Dashboard</Text>

        <View style={styles.header}>

          <Text style={styles.headerText}>{`${staffData.hotel.hotelName}, ${staffData.hotel.city}`}</Text>
          <Text style={styles.headerSubText}>{`Employee: ${staffData.employeeName}`}</Text>
          <LogoutButton />
        </View>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setIsCalendarVisible(!isCalendarVisible)}
        >
          <Ionicons name={isCalendarVisible ? "chevron-up" : "chevron-down"} size={24} color="#FF6B3C" />
        </TouchableOpacity>
        {isCalendarVisible && (
          <View style={styles.calendarContainer}>
            <Calendar
              style={styles.calendar}
              markedDates={mapDatesWithRequests()}
              onDayPress={(day) => setSelectedDate(day.dateString)}
              theme={{
                calendarBackground: 'rgba(255, 255, 255, 0.9)',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#FF6B3C',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#FF6B3C',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#FF6B3C',
                selectedDotColor: '#ffffff',
                arrowColor: 'orange',
                monthTextColor: '#FF6B3C',
                indicatorColor: '#FF6B3C',
                textDayFontFamily: 'monospace',
                textMonthFontFamily: 'monospace',
                textDayHeaderFontFamily: 'monospace',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
              }}
            />
          </View>
        )}
        <FlatList
          data={requests.filter((item) => item.date === selectedDate && item.status !== 'declined')} // Filter requests based on selected date
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          renderItem={renderRequestItem}
          ListEmptyComponent={<Text style={styles.noRequestsText}>No requests for this date.</Text>}
          contentContainerStyle={styles.requestList}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    // marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubText: {
    fontSize: 16,
    color: '#666',
  },
  toggleButton: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  calendarContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    width: 320,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  requestList: {
    // paddingBottom: 20,
  },
  requestItemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  requestItemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  requestItemTextMass: {
    fontSize: 16,
    color: '#FF6B3C',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  requestItemTextApproved: {
    fontSize: 16,
    color: 'green',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
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
  noRequestsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
});

export default SpaStaffScreen;
