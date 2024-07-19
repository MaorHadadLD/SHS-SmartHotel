import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, query, orderByChild, equalTo, get, update } from 'firebase/database';
import firebaseApp from '../../firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

function GuestAppointmentsScreen({ route }) {
    const [appointments, setAppointments] = useState([]);
    const guestEmail = route.params.guestData.email;

    useEffect(() => {
        const fetchAppointments = async () => {
            const db = getDatabase(firebaseApp);
            const appointmentsRef = ref(db, 'appointments');
            const guestAppointmentsQuery = query(appointmentsRef, orderByChild('guest'), equalTo(guestEmail));

            const snapshot = await get(guestAppointmentsQuery);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const formattedData = Object.values(data);
                setAppointments(formattedData);
            }
        };

        fetchAppointments();
    }, [guestEmail]);

    const handleCancelAppointment = (appointmentId) => {
        const db = getDatabase(firebaseApp);
        const appointmentRef = ref(db, `appointments/${appointmentId}`);

        update(appointmentRef, { status: 'canceled' })
            .then(() => {
                Alert.alert('Appointment Canceled', 'Your appointment has been canceled successfully.');
                setAppointments((prevAppointments) =>
                    prevAppointments.map((appointment) =>
                        appointment.id === appointmentId ? { ...appointment, status: 'canceled' } : appointment
                    )
                );
            })
            .catch((error) => {
                Alert.alert('Error', 'There was an error canceling your appointment. Please try again.');
                console.error('Error canceling appointment:', error);
            });
    };

    const renderAppointment = ({ item }) => {
        const appointmentTime = new Date(`${item.date}T${item.time}`);
        const currentTime = new Date();
        const canCancel = (appointmentTime - currentTime) > 60 * 60 * 1000; // Check if more than 1 hour before appointment

        return (
            <View style={styles.appointmentContainer}>
                <LinearGradient
                    colors={['#83a4d4', '#b6fbff']}
                    style={styles.gradient}
                />
                <View style={styles.appointmentContent}>
                    <Text style={styles.appointmentDate}>{item.date}</Text>
                    <Text style={styles.appointmentTime}>Time: {appointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    <Text style={styles.appointmentStatus}>Status: <Text style={styles.statusText(item.status)}>{item.status}</Text></Text>
                    <Text style={styles.appointmentMasseuse}>Masseuse: {item.therapistGender} {item.massageType === 'double' ? `and ${item.secondTherapistGender}` : ''}</Text>
                    <Text style={styles.appointmentTreatment}>Treatment Type: {item.treatmentType}</Text>
                    <Text style={styles.appointmentComments}>Comments: {item.additionalComments ? item.additionalComments : 'No Comments Entered'}</Text>
                    {canCancel && item.status !== 'canceled' && (
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => handleCancelAppointment(item.id)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../assets/Spa-background.jpg')} style={styles.backgroundImage}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.6)', 'transparent']}
                    style={styles.overlay}
                />
                <View style={styles.container}>
                    <Text style={styles.title}>Your Appointments</Text>
                    <FlatList
                        data={appointments}
                        renderItem={renderAppointment}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#fff',
        textAlign: 'center',
    },
    appointmentContainer: {
        marginVertical: 8,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.9)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    appointmentContent: {
        padding: 20,
    },
    appointmentDate: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#3A7D44',
    },
    appointmentTime: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    appointmentStatus: {
        fontSize: 16,
        marginBottom: 8,
    },
    statusText: (status) => ({
        color: status === 'declined' ? '#ff3b30' : status === 'approved' ? '#2e8b57' : status === 'pending' ? '#ffcc00' : '#555',
        fontWeight: 'bold',
    }),
    appointmentMasseuse: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    appointmentTreatment: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    appointmentComments: {
        fontSize: 16,
        color: '#777',
    },
    cancelButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ff3b30',
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default GuestAppointmentsScreen;
