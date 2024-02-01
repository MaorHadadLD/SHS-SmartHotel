import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
// import { globalStyles } from '../../styles/globalStyle';
import { sendRooomStatus } from '../../API/GuestCalls';

const RoomKeyScreen = ({ route }) => {
    const [guest, setGuest] = useState({});
    const guestEmail = route.params.guest || {};

    useEffect(() => {
        const fetchGuestData = async () => {
            try {
                const results = await sendRooomStatus(guestEmail);
                // console.log("fetchGuestData results", results.data);
                setGuest(results.data);
            } catch (error) {
                console.error("fetchGuestData error", error);
            }
        }
        fetchGuestData();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>RoomKeyScreen</Text>
            </View>
            <View style={styles.infoContainer}>
                <Image
                    source={require('../../assets/room_key_icon.png')}
                    style={styles.icon}
                />
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.text}>{guest.email}</Text>
                <Text style={styles.label}>Room Number:</Text>
                <Text style={styles.text}>{guest.roomNumber}</Text>
                {/* Add other relevant properties here */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f8f8f8', // Light gray background
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    headerContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    infoContainer: {
        alignItems: 'center',
    },
    icon: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 10,
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
        color: '#333',
    },
    // Add more styles as needed
});

export default RoomKeyScreen;