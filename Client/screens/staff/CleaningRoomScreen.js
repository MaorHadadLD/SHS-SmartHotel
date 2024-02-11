import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles, staffHomeStyles } from '../../styles/globalStyle';
import { useState,useEffect } from 'react';
import { getRequests } from '../../API/RequestCalls';

const CleaningRoomScreen = ({ route }) => {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await getRequests(route.params.staffData.hotel, 'RoomCleaningRequest');
                if (response.success) {
                    setRequests(response.data);
                }
            } catch (error) {
                console.error('fetchRequests', error);
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
      <Text style={staffHomeStyles.requestItemText}>{item.description}</Text>
      <TouchableOpacity style={staffHomeStyles.startCompleteButton} onPress={() => handleRequestStatusChange(item.id, 'In Progress')}>
        <Text style={staffHomeStyles.startCompleteButtonText}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={staffHomeStyles.startCompleteButton} onPress={() => handleRequestStatusChange(item.id, 'Done')}>
        <Text style={staffHomeStyles.startCompleteButtonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
  const filteredRequests = requests.length > 0 ? requests.filter((request) =>
  route.params && route.params.roles && route.params.roles.includes(request.role)
) : [];

return (
  <View style={globalStyles.container}>
    <Text style={globalStyles.header}>Cleaning Staff </Text>
    {filteredRequests.length > 0 ? (
      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRequestItem}
      />
    ) : (
      <Text>No requests available</Text>
    )}
    
    <View style={staffHomeStyles.staffDetailsContainer}>
      <Text style={staffHomeStyles.detailText}>Name: {route.params.employeeName}</Text>
      <Text style={staffHomeStyles.detailText}>Role: {route.params.role}</Text>
      <Text style={staffHomeStyles.detailText}>Hotel: {route.params.hotel}</Text>
    </View>
  </View>
);
};

export default CleaningRoomScreen;
