import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getRequests, sendDeleteRequest, sendUpdateRequest } from '../../API/RequestCalls';
import { Ionicons } from '@expo/vector-icons';
import LogoutButton from '../../components/LogoutButton';

const RoomServiceScreen = ({ route }) => {
    const [requests, setRequests] = useState([]);
    const pollingInterval = 5000; // Polling interval in milliseconds

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await getRequests(route.params.staffData.hotel, 'RoomService');
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
        <View style={styles.requestCard}>
            <Text style={styles.requestHeader}>Room Number: {item.roomNumber}</Text>
            <Text style={styles.requestStatus}>Status: {item.status}</Text>
            <Text style={styles.requestHotel}>Hotel: {item.hotel.hotelName}, {item.hotel.city}</Text>
            {item.cart && item.cart.length > 0 ? (
                <FlatList
                    data={item.cart}
                    renderItem={({ item }) => (
                        <Text style={styles.requestItem}>
                            {item.productName}: {item.quantity}
                        </Text>
                    )}
                    keyExtractor={(cartItem) => cartItem.productId.toString()}
                />
            ) : (
                <Text style={styles.requestItem}>No items in the cart</Text>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.startButton]}
                    onPress={() => handleRequestStatusChange(item.id, 'In Progress')}>
                    <Ionicons name="play-circle" size={24} color="white" />
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.completeButton]}
                    onPress={() => handleRequestStatusChange(item.id, 'Done')}>
                    <Ionicons name="checkmark-circle" size={24} color="white" />
                    <Text style={styles.buttonText}>Complete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ImageBackground source={require('../../assets/room_service.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Room Service Screen</Text>
                </View>
                {requests.length > 0 ? (
                    <FlatList
                        data={requests}
                        renderItem={renderRequestItem}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <Text style={styles.noRequestsText}>No requests for Room Services at {route.params.staffData.hotel.hotelName}, {route.params.staffData.hotel.city}</Text>
                )}
                <View style={styles.staffDetailsContainer}>
                    <LogoutButton />
                    <Text style={styles.staffDetailsText}>
                        Name: {route.params.staffData.employeeName}
                    </Text>
                    <Text style={styles.staffDetailsText}>
                        Role: {route.params.staffData.role}
                    </Text>
                    <Text style={styles.staffDetailsText}>
                        Hotel: {route.params.staffData.hotel.hotelName}, {route.params.staffData.hotel.city}
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    headerContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    requestCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    requestHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    requestStatus: {
        fontSize: 16,
        color: '#555',
    },
    requestHotel: {
        fontSize: 16,
        color: '#777',
    },
    requestItem: {
        fontSize: 14,
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
    },
    startButton: {
        backgroundColor: '#FF6B3C',
    },
    completeButton: {
        backgroundColor: '#28a745',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    noRequestsText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    staffDetailsContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    staffDetailsText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
    },
});

export default RoomServiceScreen;
