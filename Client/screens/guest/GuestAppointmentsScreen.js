import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, query, orderByChild, equalTo, get, update, remove } from 'firebase/database';
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
    }, [appointments]);

    const handleCancelAppointment = (appointmentId) => {
        const db = getDatabase(firebaseApp);
        const appointmentRef = ref(db, `appointments/${appointmentId}`);

        update(appointmentRef, { status: 'canceled' })
            .then(() => {
                Alert.alert('Treatments Canceled', 'Your treatment has been canceled successfully.');
                setAppointments((prevAppointments) =>
                    prevAppointments.map((appointment) =>
                        appointment.id === appointmentId ? { ...appointment, status: 'canceled' } : appointment
                    )
                );
            })
            .catch((error) => {
                Alert.alert('Error', 'There was an error canceling your treatments. Please try again.');
                console.error('Error canceling treatments:', error);
            });
    };

    const handleDeleteAppointment = (appointmentId) => {
        const db = getDatabase(firebaseApp);
        const appointmentRef = ref(db, `appointments/${appointmentId}`);

        remove(appointmentRef)
            .then(() => {
                Alert.alert('Treatments Deleted', 'Your treatment has been deleted successfully.');
                setAppointments((prevAppointments) =>
                    prevAppointments.filter((appointment) => appointment.id !== appointmentId)
                );
            })
            .catch((error) => {
                Alert.alert('Error', 'There was an error deleting your treatments. Please try again.');
                console.error('Error deleting treatments:', error);
            });
    };

    const renderAppointment = ({ item }) => {
        let hour;
        let minute;
        if(item.time.split('A')[1]) {
            const time = item.time.split('A')[0];
            hour = time.split(':')[0];
            minute = time.split(':')[1];
        }else {
            const time = item.time.split('P')[0];
            hour = time.split(':')[0];
            minute = time.split(':')[1];
            if(hour < 12) {
                hour = parseInt(hour) + 12;
            }
        }
        const appointmentTime = new Date(`${item.date}`);
        appointmentTime.setHours(hour+3);
        appointmentTime.setMinutes(minute);
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + 3);
        const canCancel = (appointmentTime - currentTime) > 60 * 60 * 1000; // Check if more than 1 hour before appointment

        return (
            <TouchableOpacity
                onLongPress={() => item.status === 'declined' && handleDeleteAppointment(item.id)}
            >
                <View style={styles.appointmentContainer}>
                    <LinearGradient
                        colors={['#83a4d4', '#b6fbff']}
                        style={styles.gradient}
                    />
                    <View style={styles.appointmentContent}>
                        <Text style={styles.appointmentDate}>{item.date}</Text>
                        <Text style={styles.appointmentTime}>Time: {item.time}</Text>
                        <Text style={styles.appointmentStatus}>Status: <Text style={styles.statusText(item.status)}>{item.status}</Text></Text>
                        <Text style={styles.appointmentMassageType}>{item.massageType === 'double' ? 'Double' : 'Single'} Massage</Text>
                        <Text style={styles.appointmentMasseuse}>Primary Masseuse: {item.therapistGender}</Text>
                        {item.massageType === 'double' && (
                            <Text style={styles.appointmentMasseuse}>Secondary Masseuse: {item.secondTherapistGender}</Text>
                        )}
                        <Text style={styles.appointmentTreatment}>Treatment Type: {item.treatmentType}</Text>
                        <Text style={styles.appointmentComments}>Comments: {item.additionalComments ? item.additionalComments : 'No Comments Entered'}</Text>
                        {canCancel && item.status !== 'canceled' && item.status !== 'declined' && (
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => handleCancelAppointment(item.id)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel treatments</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
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
                    <Text style={styles.title}>My Treatments</Text>
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
    appointmentMassageType: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
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
