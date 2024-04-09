import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles, staffHomeStyles } from '../../styles/globalStyle';
import { getRequests, sendDeleteRequest, sendUpdateRequest } from '../../API/RequestCalls';

const PoolBarScreen = ({ route }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await getRequests(route.params.staffData.hotel, 'PoolBar');
                if (response.success) {
                    setRequests(response.data);
                }
            } catch (error) {
                console.error('fetchRequests error:', error);
            }
        };

        fetchRequests();
    }, [requests]);

    const handleRequestStatusChange = async (id, newStatus) => {
        if (newStatus === 'Done') {
            const response = await sendDeleteRequest(id, 'PoolBar');
            setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
        } else {
            setRequests(prevRequests =>
                prevRequests.map(request =>
                    request.id === id ? { ...request, status: newStatus } : request
                )
            );
            const response = await sendUpdateRequest(id, newStatus, 'PoolBar');
        }
    };

    const renderRequestItem = ({ item }) => (
        <View style={staffHomeStyles.requestItem}>
            <Text style={staffHomeStyles.requestItemText}>Description: {item.notice}</Text>
            <Text style={staffHomeStyles.requestItemText}>Room Number: {item.roomNumber}</Text>
            <Text style={staffHomeStyles.requestItemText}>Status: {item.status}</Text>
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
            <Text style={globalStyles.header}>PoolBarScreen</Text>
            {requests.length > 0 ? (
                <FlatList
                    data={requests}
                    renderItem={renderRequestItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text>There are no requests to perform in Pool bar Services {route.params.staffData.hotel.hotelName}{' '}
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

export default PoolBarScreen;