import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles, staffHomeStyles } from '../../styles/globalStyle';
import { getRequests, sendDeleteRequest, sendUpdateRequest } from '../../API/RequestCalls';

const RoomServiceScreen = ({ route }) => {
    const [requests, setRequests] = useState([]);
    /*
    * The useEffect hook is used to fetch the requests from the server when the component is mounted.
    */
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await getRequests(route.params.staffData.hotel, 'RoomService');
                // console.log('fetchRequests response', response.success);
                if (response.success) {
                    setRequests(response.data);
                    console.log('fetchRequestsghhgjjgjgjgjgjgj requests', response.data);
                }
            } catch (error) {
                console.error('fetchRequests error:', error);
            }
        };

        fetchRequests();
    }, []);

    /**
     * This function is used to handle the status change of a request.
     */
    const handleRequestStatusChange = async (id, newStatus) => {
        if (newStatus === 'Done') {
            const response = await sendDeleteRequest(id, 'RoomService');

            // Filter out the request with the specified ID
            setRequests(prevRequests => prevRequests.filter(request => request.id !== id));

        } else {
            // Update the status of the request

            setRequests(prevRequests =>
                prevRequests.map(request =>
                    request.id === id ? { ...request, status: newStatus } : request
                )
            );
            const response = await sendUpdateRequest(id, newStatus, 'RoomService');
        }
    };


    /*
    * This function is used to render each request item in the list.
    */
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
            <Text style={globalStyles.header}>RoomServiceScreen</Text>
            {requests.length > 0 ? (
                <FlatList
                    data={requests}
                    renderItem={renderRequestItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text>There are no requests to perform in Room Services {route.params.staffData.hotel.hotelName}{' '}
                {route.params.staffData.hotel.city}</Text>
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

export default RoomServiceScreen;