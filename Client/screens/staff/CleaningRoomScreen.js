import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { getRequests, sendDeleteRequest, sendUpdateRequest } from '../../API/RequestCalls';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LogoutButton from '../../components/LogoutButton';

const backgroundImageUri = require('../../assets/resort_cleaning.jpg');

const CleaningRoomScreen = ({ route }) => {
  const [requests, setRequests] = useState([]);
  const pollingInterval = 5000; // Polling interval in milliseconds

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getRequests(route.params.staffData.hotel, 'CleaningRoom');
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
        await sendDeleteRequest(id, 'CleaningRoom');
        setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
      } else {
        await sendUpdateRequest(id, newStatus, 'CleaningRoom');
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
    <View style={styles.requestItem}>
      <Text style={styles.requestHeader}>Room Number: {item.roomNumber}</Text>
      <Text style={styles.requestItemText}>Status: {item.status}</Text>
      <Text style={styles.requestItemText}>Description: {item.notice}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => handleRequestStatusChange(item.id, 'In Progress')}
        >
          <Icon name="play" size={16} color="#fff" />
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => handleRequestStatusChange(item.id, 'Done')}
        >
          <Icon name="check" size={16} color="#fff" />
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground source={backgroundImageUri} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.header}>Cleaning Staff</Text>
        {requests.length > 0 ? (
          <FlatList
            data={requests}
            keyExtractor={(item) => item.id.toString()} // Ensure unique keys
            renderItem={renderRequestItem}
          />
        ) : (
          <Text style={styles.noRequestsText}>There are no requests to perform in Cleaning Room {route.params.staffData.hotel.hotelName} {route.params.staffData.hotel.city}</Text>
        )}

        <View style={styles.staffDetailsContainer}>
          <Text style={styles.detailText}>
            Name: {route.params.staffData.employeeName}
          </Text>
          <Text style={styles.detailText}>
            Role: {route.params.staffData.role}
          </Text>
          <Text style={styles.detailText}>
            Hotel: {route.params.staffData.hotel.hotelName} {route.params.staffData.hotel.city}
          </Text>
          <LogoutButton />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adding a semi-transparent overlay for better readability
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  noRequestsText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  requestItem: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  requestItemText: {
    color: "#333333",
    fontSize: 16,
    marginBottom: 5,
  },
  requestHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  staffDetailsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
  },
  detailText: {
    color: "#333333",
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CleaningRoomScreen;
