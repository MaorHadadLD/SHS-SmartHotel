import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles, staffHomeStyles } from '../../styles/globalStyle';

const ReceptionScreen = ({ route, navigation }) => {
  const [requests, setRequests] = useState([
    { id: 1, role: 'Cleaning Staff', status: 'Waiting', description: 'Clean Room 101' },
    { id: 2, role: 'Front Desk Staff', status: 'In Progress', description: 'Assist Guest Check-in' },
    // Add more requests as needed
  ]);

  const handleRequestStatusChange = (id, newStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const renderRequestItem = ({ item }) => (
    <View style={staffHomeStyles.requestItem}>
      <Text style={staffHomeStyles.requestItemText}>{item.description}</Text>
      <TouchableOpacity style={staffHomeStyles.startCompleteButton} onPress={() => handleRequestStatusChange(item.id, 'In Progress')}>
        <Text style={staffHomeStyles.startCompleteButtonText}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={staffHomeStyles.startCompleteButton} onPress={() => handleRequestStatusChange(item.id, 'Done')}>
        <Text style={staffHomeStyles.startCompleteButtonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredRequests = requests.filter((request) =>
    route.params && route.params.roles && route.params.roles.includes(request.role)
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Staff Dashboard</Text>
      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRequestItem}
      />
      <View style={staffHomeStyles.staffDetailsContainer}>
        <Text style={staffHomeStyles.detailText}>Name: {route.params.employeeName}</Text>
        <Text style={staffHomeStyles.detailText}>Role: {route.params.role}</Text>
        <Text style={staffHomeStyles.detailText}>Hotel: {route.params.hotel}</Text>
      </View>
    </View>
  );
};

export default ReceptionScreen;
