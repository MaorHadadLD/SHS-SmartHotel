import React, { useState } from 'react';
import { View, Alert, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Appbar, Card, Title, Paragraph } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { addEmployee, deleteEmployee } from '../../API/StaffCalls';

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

      const result = await addEmployee(newEmployeeData);
      if (result.success) {
        Alert.alert('Success', 'Employee added successfully');
        // clear the form
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
        </Appbar.Header>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Add New Employee</Title>
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
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Delete Employee</Title>
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
