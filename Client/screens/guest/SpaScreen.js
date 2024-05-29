import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import CalendarModal from "../../components/CalendarModal";
import { getDatabase, ref, push } from "firebase/database";
import firebaseApp from "../../firebaseConfig";

function SpaScreen({ navigation, route }) {
  console.log('SpaScreen route:', route.params);  

  const spaOperatingHours = { start: 11, end: 18 }; // Updated spa operating hours
  const massageDuration = 30;

  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [massageType, setMassageType] = useState('Select Massage Type');
  const [therapistGender, setTherapistGender] = useState('Select Therapist Gender');
  const [secondTherapistGender, setSecondTherapistGender] = useState('Select Therapist Gender');
  const [additionalComments, setAdditionalComments] = useState('');

  const generateAvailableTimeSlots = () => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(spaOperatingHours.start, 0, 0, 0);
  
    while (currentTime.getHours() < spaOperatingHours.end) {
      if (currentTime.getTime() !== selectedTime?.getTime()) {
        slots.push({ time: new Date(currentTime), disabled: false });
      } else {
        slots.push({ time: new Date(currentTime), disabled: true });
      }
      currentTime.setMinutes(currentTime.getMinutes() + massageDuration);
    }
  
    setAvailableTimeSlots(slots);
  };

  useEffect(() => {
    generateAvailableTimeSlots();
  }, [selectedTime]); // Update useEffect dependency

  const handleTimeSlotSelection = (time) => {
    setSelectedTime(time);
    setModalVisible(true);
  };

  const handleBookingConfirmation = () => {
    const appointmentData = {
      time: selectedTime,
      massageType: massageType,
      therapistGender: therapistGender,
      secondTherapistGender: secondTherapistGender,
      additionalComments: additionalComments,
    };

    const db = getDatabase(firebaseApp);
    const appointmentsRef = ref(db, 'appointments');
    push(appointmentsRef, appointmentData);

    setModalVisible(false);
    setSelectedTime(null);
    setMassageType('Select Massage Type');
    setTherapistGender('Select Therapist Gender');
    setSecondTherapistGender('Select Therapist Gender');
    setAdditionalComments('');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.timeSlotItem,
        item.disabled && { backgroundColor: '#ccc' },
      ]}
      onPress={() => handleTimeSlotSelection(item.time)}
      disabled={item.disabled}
    >
      <Text style={styles.timeSlotText}>
        {item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CalendarModal
      route={route.params}/>
      {/* <Text style={styles.header}> Spa Schedule </Text>

      <FlatList
        data={availableTimeSlots}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Massage Options</Text>

            <RNPickerSelect
              placeholder={{
                label: 'Select Massage Type',
                value: 'Select Massage Type',
                color: '#9EA0A4',
              }}
              items={[
                { label: 'Single Massage', value: 'single' },
                { label: 'Double Massage', value: 'double' },
              ]}
              value={massageType}
              onValueChange={(value) => setMassageType(value)}
              style={pickerSelectStyles}
            />

            <RNPickerSelect
              placeholder={{
                label: 'Select Therapist Gender',
                value: 'Select Therapist Gender',
                color: '#9EA0A4',
              }}
              items={[
                { label: 'Any Gender', value: 'any' },
                { label: 'Male Therapist', value: 'male' },
                { label: 'Female Therapist', value: 'female' },
              ]}
              value={therapistGender}
              onValueChange={(value) => setTherapistGender(value)}
              style={pickerSelectStyles}
            />

            {massageType === 'double' && (
              <RNPickerSelect
                placeholder={{
                  label: 'Select Second Therapist Gender',
                  value: null,
                  color: '#9EA0A4',
                }}
                items={[
                  { label: 'Any Gender', value: 'any' },
                  { label: 'Male Therapist', value: 'male' },
                  { label: 'Female Therapist', value: 'female' },
                ]}
                value={secondTherapistGender}
                onValueChange={(value) => setSecondTherapistGender(value)}
                style={pickerSelectStyles}
              />
            )}

            <TextInput
              style={styles.commentsInput}
              placeholder="Additional Comments"
              multiline
              numberOfLines={3}
              value={additionalComments}
              onChangeText={(text) => setAdditionalComments(text)}
            />

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleBookingConfirmation}
            >
              <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: '#007bff',
//     borderRadius: 4,
//     color: 'black',
//     paddingRight: 30,
//     backgroundColor: '#fafafa',
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderWidth: 0.5,
//     borderColor: '#007bff',
//     borderRadius: 8,
//     color: 'black',
//     paddingRight: 30,
//     backgroundColor: '#fafafa',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  // header: {
  //   fontSize: 24,
  //   marginBottom: 20,
  // },
  // flatListContainer: {
  //   paddingBottom: 20,
  // },
  // timeSlotItem: {
  //   height: 60,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#007bff',
  //   borderRadius: 10,
  //   marginBottom: 10,
  // },
  // timeSlotText: {
  //   fontSize: 16,
  //   color: '#fff',
  //   fontWeight: 'bold',
  // },
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  // modalContent: {
  //   width: '80%',
  //   padding: 20,
  //   backgroundColor: '#fff',
  //   borderRadius: 10,
  // },
  // modalHeader: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  // commentsInput: {
  //   height: 80,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   marginBottom: 10,
  //   padding: 10,
  // },
  // confirmButton: {
  //   backgroundColor: '#007bff',
  //   padding: 10,
  //   borderRadius: 5,
  //   alignItems: 'center',
  //   marginBottom: 10,
  // },
  // confirmButtonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  // closeButton: {
  //   backgroundColor: 'red',
  //   padding: 10,
  //   borderRadius: 5,
  //   alignItems: 'center',
  // },
  // closeButtonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
});

export default SpaScreen;
