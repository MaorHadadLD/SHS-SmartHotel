import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles, staffHomeStyles } from '../../styles/globalStyle';
import { getRequests } from '../../API/RequestCalls';

const CleaningRoomScreen = ({ route }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getRequests(route.params.staffData.hotel, 'CleaningRoom');
        console.log('fetchRequests response', response);
        if (response.success) {
          setRequests(response.data);
          console.log('fetchRequests requests', response.data);
        } else {
          console.error('fetchRequests failed:', response.error); // Handle error from API
        }
      } catch (error) {
        console.error('fetchRequests error:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleRequestStatusChange = (id, newStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };
  

  const renderRequestItem = ({ item }) => (
    <View style={staffHomeStyles.requestItem}>
      <Text style={staffHomeStyles.requestItemText}>Description: {item.notice}</Text>
      <Text style={staffHomeStyles.requestItemText}>Room Number: {item.roomNumber}</Text>
      <Text style={staffHomeStyles.requestItemText}>Status: {item.status}</Text>
      {/* Add more text elements to display other properties as needed */}
      <TouchableOpacity
        style={staffHomeStyles.startCompleteButton}
        onPress={() => handleRequestStatusChange(item.id, 'In Progress')}>
        <Text style={staffHomeStyles.startCompleteButtonText}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={staffHomeStyles.startCompleteButton}
        onPress={() => handleRequestStatusChange(item.id, 'Done')}>
        <Text style={staffHomeStyles.startCompleteButtonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
  

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Cleaning Staff</Text>
      {requests.length > 0 ? (
        <FlatList
          data={requests}
          keyExtractor={(item, index) => index.toString()} // Ensure unique keys
          renderItem={renderRequestItem}
        />
      ) : (
        <Text>No requests available</Text>
      )}

      <View style={staffHomeStyles.staffDetailsContainer}>
        <Text style={staffHomeStyles.detailText}>
          Name: {route.params.staffData.employeeName}
        </Text>
        <Text style={staffHomeStyles.detailText}>
          Role: {route.params.staffData.role}
        </Text>
        <Text style={staffHomeStyles.detailText}>
          Hotel: {route.params.staffData.hotel.hotelName}{' '}
          {route.params.staffData.hotel.city}
        </Text>
      </View>
    </View>
  );
};

export default CleaningRoomScreen;
