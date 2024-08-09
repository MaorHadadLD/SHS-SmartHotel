import React, { useState } from "react";
import RNPickerSelect from 'react-native-picker-select';
import { Modal, Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, push, update, query, orderByChild, equalTo, get } from 'firebase/database';
import firebaseApp from '../firebaseConfig';
import { spaTreatments } from '../data/spaTreatments';

const treatmentOptions = spaTreatments.map(treatment => ({
    label: treatment.type,
    value: treatment.type,
}));

function BookingSpaModal({ route, time, date, isVisible, closeModal }) {
    const [massageType, setMassageType] = useState('');
    const [therapistGender, setTherapistGender] = useState('');
    const [secondTherapistGender, setSecondTherapistGender] = useState('');
    const [additionalComments, setAdditionalComments] = useState('');
    const [selectedTreatment, setSelectedTreatment] = useState('');
    const navigation = useNavigation();
    const selectedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log("Selected time: ", selectedTime);

    const handleBookingConfirmation = () => {
        const db = getDatabase(firebaseApp);
        const appointmentsRef = ref(db, 'appointments');
        const selectedDate = date.dateString;

        const guestAppointmentsQuery = query(appointmentsRef, orderByChild('guest'), equalTo(route.guestData.email));
        get(guestAppointmentsQuery).then((snapshot) => {
            const appointments = snapshot.val();
            const hasValidAppointmentToday = appointments && Object.values(appointments).some(appt => appt.date === selectedDate && appt.status !== 'declined');

            if (hasValidAppointmentToday) {
                Alert.alert('Attention!', 'You can only book one massage per day unless your previous appointment was refused.');
                return;
            }

            if (massageType === '' || therapistGender === '' || selectedTreatment === '') {
                Alert.alert('Attention!', 'Please select a massage type, therapist, and treatment before confirming the booking.');
                return;
            }
            if (massageType === 'double' && secondTherapistGender === '') {
                Alert.alert('Attention!', 'Please select 2 therapists before confirming the booking.');
                return;
            }

            if (massageType === 'single') {
                setSecondTherapistGender('none');
            }
            console.log("Selected time: ", selectedTime);
            const appointmentData = {
                id: '',
                guest: route.guestData.email,
                phone: route.guestData.phone,
                name: route.guestData.firstname + ' ' + route.guestData.lastname,
                hotel: route.guestData.selectedHotel,
                date: selectedDate,
                time: selectedTime,
                status: 'pending',
                massageType: massageType,
                therapistGender: therapistGender,
                secondTherapistGender: secondTherapistGender,
                additionalComments: additionalComments,
                treatmentType: selectedTreatment,
            };

            const newAppointmentRef = push(appointmentsRef);
            const appointmentId = newAppointmentRef.key;
            appointmentData.id = appointmentId;

            update(newAppointmentRef, appointmentData)
                .then(() => {
                    closeModal();
                    navigation.navigate('ClientMainMenu', { selectedHotel: route.selectedHotel, guestData: route.guestData });
                })
                .catch(error => {
                    Alert.alert('Error', 'There was an error making the appointment. Please try again.');
                    console.error('Error updating appointment:', error);
                });
        }).catch(error => {
            Alert.alert('Error', 'There was an error retrieving appointments. Please try again.');
            console.error('Error retrieving appointments:', error);
        });
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
                            label: 'Select Type of Treatment',
                            value: '',
                            color: '#9EA0A4',
                        }}
                        items={treatmentOptions}
                        value={selectedTreatment}
                        onValueChange={(value) => setSelectedTreatment(value)}
                        style={pickerSelectStyles}
                    />

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
