import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const StaffHomeScreen = ({ route, navigation }) => {
  const [requests, setRequests] = useState([
    { id: 1, role: 'Cleaning Staff', status: 'Waiting', description: 'Clean Room 101' },
    { id: 2, role: 'Front Desk Staff', status: 'In Progress', description: 'Assist Guest Check-in' },
    // Add more requests as needed
  ]);

  const handleRequestStatusChange = (id, newStatus) => {
    // Update the status of the request with the given id
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Text>{item.description}</Text>
      <Text>Status: {item.status}</Text>
      <TouchableOpacity onPress={() => handleRequestStatusChange(item.id, 'In Progress')}>
        <Text>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRequestStatusChange(item.id, 'Done')}>
        <Text>Complete</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredRequests = requests.filter((request) =>
  route.params && route.params.roles && route.params.roles.includes(request.role)
);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Staff Dashboard</Text>
      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRequestItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  requestItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default StaffHomeScreen;
