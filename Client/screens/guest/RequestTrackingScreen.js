import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getAllRequstsByRoomNumberGuest } from '../../API/RequestCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackGround from '../../components/BackGround';
import { FontAwesome5 } from '@expo/vector-icons';

function RequestTracking() {
    const [requests, setRequests] = useState([]);
    const [guestData, setGuestData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getRequests = async () => {
            setLoading(true);
            try {
                const guestData = await AsyncStorage.getItem('guestData');
                setGuestData(JSON.parse(guestData));
                const res = await getAllRequstsByRoomNumberGuest(guestData);
                if (res.success) {
                    if (Array.isArray(res.data)) {
                        setRequests(res.data);
                    } else {
                        console.error("RequestTracking: Data received is not an array.");
                    }
                } else {
                    console.error("RequestTracking: API call failed with message:", res.message);
                }
            } catch (error) {
                console.error("RequestTracking: Error fetching requests:", error);
            } finally {
                setLoading(false);
            }
        };
        getRequests();
    }, []);

    const groupRequestsByDepartment = () => {
        const groupedRequests = {};
        requests.forEach(request => {
            if (!groupedRequests[request.department]) {
                groupedRequests[request.department] = [];
            }
            groupedRequests[request.department].push(request);
        });
        return groupedRequests;
    };

    const groupedRequests = groupRequestsByDepartment();

    return (
        <BackGround>
            {loading &&
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF6B3C" style={styles.loadingIndicator} />
                </View>
            }
            <ScrollView style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.heading}>Request Tracking</Text>
                </View>
                {Object.keys(groupedRequests).map((department, index) => (
                    <View key={index} style={styles.departmentContainer}>
                        <View style={styles.departmentHeader}>
                            <FontAwesome5 name="tasks" size={24} color="#FF6B3C" />
                            <Text style={styles.departmentTitle}>{department}</Text>
                        </View>
                        {groupedRequests[department].map((request, index) => (
                            <View key={index} style={styles.requestCard}>
                                <View style={styles.requestHeader}>
                                    <Text style={styles.requestType}>Request:</Text>
                                    <Text style={styles.requestNotice}>{request.notice}</Text>
                                </View>
                                <Text style={styles.requestStatus}>Status: {request.status}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </BackGround>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    titleContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    heading: {
        color: "white",
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    departmentContainer: {
        marginBottom: 20,
    },
    departmentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    departmentTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#FF6B3C',
    },
    requestCard: {
        backgroundColor: '#fff',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    requestType: {
        fontWeight: 'bold',
        color: '#333',
    },
    requestNotice: {
        color: '#555',
    },
    requestStatus: {
        color: '#777',
    },
    loadingIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 1000,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        elevation: 1000,
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
});

export default RequestTracking;
