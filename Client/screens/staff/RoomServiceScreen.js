import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles, staffHomeStyles } from '../../styles/globalStyle';
import { getRequests, sendDeleteRequest, sendUpdateRequest } from '../../API/RequestCalls';

const RoomServiceScreen = ({ route }) => {
    const [requests, setRequests] = useState([]);
    const pollingInterval = 5000; // Polling interval in milliseconds

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await getRequests(route.params.staffData.hotel, 'RoomService');
                console.log("Fetched Requests: ", response); // Debugging: Log fetched data
                if (response && response.success && Array.isArray(response.data)) {
                    setRequests(response.data);
                } else if (response && response.data === "No request found") {
                    setRequests([]); // Set requests to an empty array if no requests found
                } else {
                    console.error('Failed to fetch requests');
                    setRequests([]); // Set requests to an empty array in case of error
                }
            } catch (error) {
                console.error('fetchRequests error:', error);
                setRequests([]); // Set requests to an empty array in case of error
            }
        };

        // Initial fetch
        fetchRequests();

        // Polling interval
        const intervalId = setInterval(fetchRequests, pollingInterval);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [route.params.staffData.hotel]);

    const handleRequestStatusChange = async (id, newStatus) => {
        try {
            if (newStatus === 'Done') {
                await sendDeleteRequest(id, 'RoomService');
                setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
            } else {
                await sendUpdateRequest(id, newStatus, 'RoomService');
                setRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.id === id ? { ...request, status: newStatus } : request
                    )
                );
            }
        } catch (error) {
            console.error('handleRequestStatusChange error:', error);
        }
    };

    const renderRequestItem = ({ item }) => (
        <View style={staffHomeStyles.requestItem}>
            <Text style={staffHomeStyles.requestItemText}>Room Number: {item.roomNumber}</Text>
            <Text style={staffHomeStyles.requestItemText}>Status: {item.status}</Text>
            <Text style={staffHomeStyles.requestItemText}>Hotel: {item.hotel.hotelName}, {item.hotel.city}</Text>
            {item.cart && item.cart.length > 0 ? (
                <FlatList
                    data={item.cart}
                    renderItem={({ item }) => (
                        <Text style={staffHomeStyles.requestItemText}>
                            {item.productName}: {item.quantity}
                        </Text>
                    )}
                    keyExtractor={(cartItem) => cartItem.productId.toString()}
                />
            ) : (
                <Text style={staffHomeStyles.requestItemText}>No items in the cart</Text>
            )}
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
            <Text style={globalStyles.header}>Room Service Screen</Text>
            {requests.length > 0 ? (
                <FlatList
                    data={requests}
                    renderItem={renderRequestItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text>There are no requests to perform in Room Services at {route.params.staffData.hotel.hotelName} {route.params.staffData.hotel.city}</Text>
            )}
            <View style={staffHomeStyles.staffDetailsContainer}>
                <Text style={staffHomeStyles.detailText}>
                    Name: {route.params.staffData.employeeName}
                </Text>
                <Text style={staffHomeStyles.detailText}>
                    Role: {route.params.staffData.role}
                </Text>
                <Text style={staffHomeStyles.detailText}>
                    Hotel: {route.params.staffData.hotel.hotelName} {route.params.staffData.hotel.city}
                </Text>
            </View>
        </View>
    );
};

export default RoomServiceScreen;
