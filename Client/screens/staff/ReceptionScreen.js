import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles, staffHomeStyles } from '../../styles/globalStyle';
import { onValue, ref, getDatabase, query, orderByChild,equalTo } from 'firebase/database';

const ReceptionScreen = ({ route, navigation }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const requestsRef = ref(db, 'roomRequests');
    const unsubscribe = onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const requestList = Object.values(data)
  .filter(request => request.hotel === route.params.hotel) // Filter by hotel name
  .map(request => ({
    checkInDate: request.checkInDate,
    checkOutDate: request.checkOutDate,
    guestEmail: request.guestEmail,
    guestName: request.guestName,
    hotelName: request.hotel,
    status: request.status,
  }));
        setRequests(requestList);
      }
    });
    // Cleanup function to detach the event listener when the component unmounts
    return () => {
      // Detach the event listener
      unsubscribe();
    };
  }, []);


  const handleRequestStatusChange = (guestEmail, newStatus) => {
    // Update the status in the database
    // Implement the logic to update the status in the database based on guestEmail and newStatus
  };

  const renderRequestItem = ({ item }) => (
    <View style={staffHomeStyles.requestItem}>
      <Text style={staffHomeStyles.requestItemText}>Guest: {item.guestName}</Text>
      <Text style={staffHomeStyles.requestItemText}>Check-in: {item.checkInDate}</Text>
      <Text style={staffHomeStyles.requestItemText}>Check-out: {item.checkOutDate}</Text>
      <Text style={staffHomeStyles.requestItemText}>Status: {item.status}</Text>
      <Text style={staffHomeStyles.requestItemText}>Hotel: {item.hotelName}</Text>
      <TouchableOpacity
        style={staffHomeStyles.startCompleteButton}
        onPress={() => handleRequestStatusChange(item.guestEmail, 'In Progress')}
      >
        <Text style={staffHomeStyles.startCompleteButtonText}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={staffHomeStyles.startCompleteButton}
        onPress={() => handleRequestStatusChange(item.guestEmail, 'Done')}
      >
        <Text style={staffHomeStyles.startCompleteButtonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Reception Screen</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.guestEmail}
        renderItem={renderRequestItem}
      />
      <View style={staffHomeStyles.staffDetailsContainer}>
        <Text style={staffHomeStyles.detailText}>Receptionist: {route.params.employeeName}</Text>
        <Text style={staffHomeStyles.detailText}>Hotel: {route.params.hotel}</Text>
      </View>
    </View>
  );
};

export default ReceptionScreen;
