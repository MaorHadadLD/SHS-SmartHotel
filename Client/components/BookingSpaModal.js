import React, { useState } from "react";
import RNPickerSelect from 'react-native-picker-select';
import { Modal, Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, push } from 'firebase/database';
import firebaseApp from '../firebaseConfig';

function BookingSpaModal({ route, time, date, isVisible, closeModal }) {
    const [massageType, setMassageType] = useState('');
    const [therapistGender, setTherapistGender] = useState('');
    const [secondTherapistGender, setSecondTherapistGender] = useState('');
    const [additionalComments, setAdditionalComments] = useState('');
    const navigation = useNavigation();
    const selectedTime = time;
    console.log('BookingSpaModal route:', route);

    const handleBookingConfirmation = () => {
        if (massageType === '' || therapistGender === '') {
            Alert.alert('Attention!', 'Please select a massage type and therapist before confirming the booking.');
            return;
        }
        if (massageType === 'double' && secondTherapistGender === '' ) {
            Alert.alert('Attention!', 'Please select 2 therapists before confirming the booking.');
            return;
        }

        if (massageType === 'single'){
            setSecondTherapistGender('none');
            console.log('secondTherapistGender:', secondTherapistGender);
        }
        const appointmentData = {
            guest: route.guestData.email,
            hotel: route.guestData.selectedHotel,
            date: date.dateString,
            time: selectedTime,
            
            massageType: massageType,
            therapistGender: therapistGender,
            secondTherapistGender: secondTherapistGender,
            additionalComments: additionalComments,
        };

        const db = getDatabase(firebaseApp);
        const appointmentsRef = ref(db, 'appointments');
        push(appointmentsRef, appointmentData);

        closeModal(); // Close the modal
        navigation.navigate('ClientMainMenu', {selectedHotel: route.selectedHotel, guestData: route.guestData}); // Navigate to the SpaScreen
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>Massage Options</Text>

                    <RNPickerSelect
                        placeholder={{
                            label: 'Select Massage Type',
                            value: '',
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
                            value: '',
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
                                value: '',
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
                        onPress={closeModal}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#007bff',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#fafafa',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#007bff',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#fafafa',
    },
});

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentsInput: {
        height: 80,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    confirmButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BookingSpaModal;
