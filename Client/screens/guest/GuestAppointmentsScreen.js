import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';
import firebaseApp from '../../firebaseConfig';

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

    const renderAppointment = ({ item }) => (
        <View style={styles.appointmentContainer}>
            <Text style={styles.appointmentText}>Date: {item.date}</Text>
            <Text style={styles.appointmentText}>Time: {item.time}</Text>
            <Text style={styles.appointmentText}>
                Status: <Text style={styles.statusText(item.status)}>{item.status}</Text>
            </Text>
            <Text style={styles.appointmentText}>Masseuse: {item.therapistGender} {item.massageType === 'double' ? `and ${item.secondTherapistGender}` : ''}</Text>
            <Text style={styles.appointmentText}>Comments: {item.additionalComments}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Appointments</Text>
            <FlatList
                data={appointments}
                renderItem={renderAppointment}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f4f7',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
    appointmentContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    appointmentText: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    statusText: (status) => ({
        color: status === 'declined' ? '#ff3b30' : status === 'approved' ? '#4cd964' : '#ffcc00',
        fontWeight: 'bold',
    }),
});

export default GuestAppointmentsScreen;
