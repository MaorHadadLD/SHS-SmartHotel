import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button, Appbar, Card, Title, Paragraph } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { addEmployee, deleteEmployee, fetchFeedbackForHotel } from '../../API/StaffCalls';
import LogoutButton from '../../components/LogoutButton';
import { FontAwesome } from '@expo/vector-icons';

const ManagerScreen = ({ route }) => {
  const { staffData } = route.params;
  const { hotel } = staffData;

  const [newEmployeeData, setNewEmployeeData] = useState({
    employeeName: '',
    employeeNumber: '',
    hotel: { city: hotel.city, hotelName: hotel.hotelName },
    password: '',
    role: ''
  });

  const [employeeNumberToDelete, setEmployeeNumberToDelete] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]); // State to store feedback data

  // State to manage visibility of sections (collapsed by default)
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showDeleteEmployee, setShowDeleteEmployee] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Fetch feedback when the component mounts
  useEffect(() => {
    const fetchFeedback = async () => {
      const feedback = await fetchFeedbackForHotel(hotel.hotelName, hotel.city); // Pass both hotel name and city
      if (feedback && feedback.data) { // Access feedback data correctly
        setFeedbackData(Object.values(feedback.data));
      } else {
        setFeedbackData([]);
      }
    };

    fetchFeedback();
  }, [hotel.hotelName, hotel.city]);

  const handleAddEmployee = async () => {
    try {
      if (newEmployeeData.employeeName === '') {
        Alert.alert('Error', 'Please enter employee name');
        return;
      }
      if (newEmployeeData.employeeNumber === '') {
        Alert.alert('Error', 'Please enter employee number');
        return;
      }
      if (newEmployeeData.password === '') {
        Alert.alert('Error', 'Please enter password');
        return;
      }
      if (newEmployeeData.role === '') {
        Alert.alert('Error', 'Please select role');
        return;
      }
      // Check if the employee number is a number
      if (isNaN(newEmployeeData.employeeNumber)) {
        Alert.alert('Error', 'Employee number should be a number');
        return;
      }

      const result = await addEmployee(newEmployeeData);
      if (result.success) {
        Alert.alert('Success', 'Employee added successfully');
        // Clear the form
        setNewEmployeeData({
          employeeName: '',
          employeeNumber: '',
          hotel: { city: hotel.city, hotelName: hotel.hotelName },
          password: '',
          role: ''
        });
        setSelectedRole(null);
      } else {
        Alert.alert('Error', result.data.message);
      }
    } catch (error) {
      console.error('Error adding employee:', error.message);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      const result = await deleteEmployee(employeeNumberToDelete);
      if (result.success) {
        Alert.alert('Success', 'Employee deleted successfully');
        setEmployeeNumberToDelete('');
      } else {
        Alert.alert('Error', result.data.message);
      }
    } catch (error) {
      console.error('Error deleting employee:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Manager Panel" />
        <LogoutButton />
      </Appbar.Header>
      <Title style={{ alignSelf: 'center' }}>{hotel.hotelName}, {hotel.city}</Title>

      {/* Add Employee Section */}
      <Card style={styles.card}>
        <Card.Content>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setShowAddEmployee(!showAddEmployee)}
          >
            <Title>Add New Employee</Title>
            <FontAwesome
              name={showAddEmployee ? "chevron-up" : "chevron-down"}
              size={20}
              color="#FF6B3C"
            />
          </TouchableOpacity>
          {showAddEmployee && (
            <>
              <Paragraph>Fill in the details to add a new employee to your hotel.</Paragraph>

              <TextInput
                label="Employee Name"
                value={newEmployeeData.employeeName}
                onChangeText={(text) => setNewEmployeeData({ ...newEmployeeData, employeeName: text })}
                style={styles.input}
                mode="outlined"
                theme={{ colors: { primary: '#FF6B3C' } }}
              />
              <TextInput
                label="Employee Number"
                value={newEmployeeData.employeeNumber}
                onChangeText={(text) => setNewEmployeeData({ ...newEmployeeData, employeeNumber: text })}
                style={styles.input}
                keyboardType="numeric"
                mode="outlined"
                theme={{ colors: { primary: '#FF6B3C' } }}
              />
              <TextInput
                label="Password"
                secureTextEntry
                value={newEmployeeData.password}
                onChangeText={(text) => setNewEmployeeData({ ...newEmployeeData, password: text })}
                style={styles.input}
                mode="outlined"
                theme={{ colors: { primary: '#FF6B3C' } }}
              />
              <RNPickerSelect
                onValueChange={(value) => {
                  setNewEmployeeData({ ...newEmployeeData, role: value });
                  setSelectedRole(value);
                }}
                items={[
                  { label: 'Reception', value: 'reception' },
                  { label: 'Spa', value: 'spa' },
                  { label: 'Dining', value: 'dining' },
                  { label: 'Cleaning', value: 'cleaning' },
                  { label: 'Room Service', value: 'RoomService' },
                  { label: 'Pool Bar', value: 'PoolBar' }
                ]}
                placeholder={{ label: 'Select Role', value: null }}
                value={selectedRole}
                style={pickerSelectStyles}
              />
              <Button
                mode="contained"
                onPress={handleAddEmployee}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Add Employee
              </Button>
            </>
          )}
        </Card.Content>
      </Card>

      {/* Delete Employee Section */}
      <Card style={styles.card}>
        <Card.Content>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setShowDeleteEmployee(!showDeleteEmployee)}
          >
            <Title>Delete Employee</Title>
            <FontAwesome
              name={showDeleteEmployee ? "chevron-up" : "chevron-down"}
              size={20}
              color="#FF6B3C"
            />
          </TouchableOpacity>
          {showDeleteEmployee && (
            <>
              <Paragraph>Enter the employee number to delete an employee from your hotel.</Paragraph>

              <TextInput
                label="Employee Number to Delete"
                value={employeeNumberToDelete}
                onChangeText={setEmployeeNumberToDelete}
                style={styles.input}
                keyboardType="numeric"
                mode="outlined"
                theme={{ colors: { primary: '#FF6B3C' } }}
              />
              <Button
                mode="contained"
                onPress={handleDeleteEmployee}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Delete Employee
              </Button>
            </>
          )}
        </Card.Content>
      </Card>

      {/* Feedback Section */}
      <Card style={styles.card}>
        <Card.Content>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setShowFeedback(!showFeedback)}
          >
            <Title>Guest Feedback</Title>
            <FontAwesome
              name={showFeedback ? "chevron-up" : "chevron-down"}
              size={20}
              color="#FF6B3C"
            />
          </TouchableOpacity>
          {showFeedback && (
            <>
              <Paragraph>Read what guests have to say about their stay at your hotel.</Paragraph>
              {feedbackData.length === 0 ? (
                <Text>No feedback available.</Text>
              ) : (
                feedbackData.map((feedback, index) => (
                  <View key={index} style={styles.feedbackCard}>
                    <Text style={styles.feedbackHeader}>
                      {feedback.firstname} {feedback.lastname} - Rating: {feedback.rating || 'No rating'}/5
                      
                    </Text>
                    <Text style={styles.feedbackDate}>
                      {feedback.timestamp ? new Date(feedback.timestamp).toLocaleDateString() : 'Invalid Date'}
                    </Text>
                    <Text style={styles.feedbackHotel}>
                      Room: {feedback.roomNumber || 'Unknown'}
                    </Text>
                    <Text style={styles.feedbackText}>
                      {feedback.feedback ? feedback.feedback : 'No feedback provided.'}
                    </Text>
                   
                    
                  </View>
                ))
              )}
            </>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  card: {
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FF6B3C',
  },
  buttonLabel: {
    color: '#FFFFFF',
  },
  feedbackCard: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  feedbackHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  feedbackText: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
  },
  feedbackDate: {
    fontSize: 12,
    color: '#777',
  },
  feedbackHotel: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  }
});

const pickerSelectStyles = {
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 15,
  },
};

export default ManagerScreen;
