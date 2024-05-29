import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import { getAllRequstsByRoomNumberGuest } from '../../API/RequestCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackGround from '../../components/BackGround';

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
            }finally {
                // Artificial delay to show the loading indicator
                setTimeout(() => {
                  setLoading(false);
                }, 500); // 2 seconds delay
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
                console.log('groupedRequests:::', request.department);
                
            }
            groupedRequests[request.department].push(request);
            console.log('groupedRequests', groupedRequests);
        });
        return groupedRequests;
    }

    const groupedRequests = groupRequestsByDepartment();

    return (
        <BackGround>
            {loading && 
          <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B3C" style={styles.loadingIndicator} />
          </View>} 
        <View style={styles.container}>
          <Text style={{ color: "white", fontSize: 58, fontWeight: 'bold', marginBottom: 10, }}>Request Tracking</Text>
          {/* Display requests for each department */}
          {Object.keys(groupedRequests).map((department, index) => (
            <View key={index} style={styles.departmentContainer}>
              <Text style={styles.departmentTitle}>{department}</Text>             
              {groupedRequests[department].map((request, index) => (
                <View key={index} style={styles.requestContainer}>
                  
                  {/* Check if the request type is for dining */}
                  {request.department != 'Dinning' && (
                   <><Text>Request: {request.notice}</Text><Text>Status: {request.status}</Text></>
                   
                  )}
                  {request.department === 'Dinning' && (
                     <View>
                     <Text>Number of diners: {request.numberOfDiners}</Text>
                     <Text>Arrival time: {request.arrivalTime}</Text>
                     <Text>Table Number: {request.tableId}</Text>
                   </View>
                   )}
                  {/* Add more conditions for other request types */}
                  
                </View>
              ))}
            </View>
          ))}
        </View>
        </BackGround>
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
        color: '#FF6B3C'
    },
    requestContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
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
