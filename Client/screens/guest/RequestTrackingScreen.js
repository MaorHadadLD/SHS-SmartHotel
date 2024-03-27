import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getAllRequstsByRoomNumberGuest } from '../../API/RequestCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RequestTracking() {
    const [requests, setRequests] = useState([]);
    const [guestData, setGuestData] = useState({});

    useEffect(() => {
        const getRequests = async () => {
            try {
                const guestData = await AsyncStorage.getItem('guestData');
                setGuestData(JSON.parse(guestData));
                console.log('guestData', guestData);
                const res = await getAllRequstsByRoomNumberGuest(guestData);
                console.log(' res', res);
                if (res.success) {
                    // Make sure res.data is an array before setting it
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
            }
        }
        getRequests();
    }, []);

    // Group requests by department
    const groupRequestsByDepartment = () => {
        const groupedRequests = {};
        requests.forEach(request => {
            if (!groupedRequests[request.department]) {
                groupedRequests[request.department] = [];
            }
            groupedRequests[request.department].push(request);
        });
        return groupedRequests;
    }

    const groupedRequests = groupRequestsByDepartment();

    return (
        <View style={styles.container}>
          <Text style={styles.heading}>Request Tracking</Text>
          {/* Display requests for each department */}
          {Object.keys(groupedRequests).map((department, index) => (
            <View key={index} style={styles.departmentContainer}>
              <Text style={styles.departmentTitle}>{department}</Text>
              {groupedRequests[department].map((request, index) => (
                <View key={index} style={styles.requestContainer}>
                  <Text>{request.notice}</Text>
                  <Text>{request.status}</Text>
                  {/* Check if the request type is for dining */}
                  {request.arrivalTime != undefined && (
                    <View>
                      <Text>Number of diners: {request.numberOfDiners}</Text>
                      <Text>Arrival time: {request.arrivalTime}</Text>
                    </View>
                  )}
                  {/* Add more conditions for other request types */}
                  
                </View>
              ))}
            </View>
          ))}
        </View>
      );
}      

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    departmentContainer: {
        marginBottom: 20,
    },
    departmentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    requestContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
    },
});

export default RequestTracking;
