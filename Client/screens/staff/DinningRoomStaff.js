import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getRequests } from '../../API/RequestCalls';
import { globalStyles, staffHomeStyles } from '../../styles/globalStyle';

function DinningRoomStaff({ route }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getRequests(route.params.staffData.hotel, 'Dinning');
        if (response.success) {
          setRequests(response.data);
        } else {
          console.error('fetchRequests failed:', response.error); // Handle error from API
        }
      } catch (error) {
        console.error('fetchRequests error:', error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Dinning Room Staff</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={staffHomeStyles.requestItem}>
            <Text style={staffHomeStyles.requestItemText}>Arrival Time: {item.arrivalTime}</Text>
            <Text style={staffHomeStyles.requestItemText}>Number of Diners: {item.numberOfDiners}</Text>
            <Text style={staffHomeStyles.requestItemText}>Room Number: {item.roomNumber}</Text>
            <Text style={staffHomeStyles.requestItemText}>Hotel: {item.hotel.hotelName}, {item.hotel.city}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No requests available</Text>}
      />
    
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  requestContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  requestText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DinningRoomStaff;
