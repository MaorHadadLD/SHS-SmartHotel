import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Platform } from 'react-native';
import NfcManager , { NfcTech } from 'react-native-nfc-manager'; // Import NFC Manager
import { sendRooomStatus } from '../../API/GuestCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoomKeyScreen = ({ route }) => {
    const [guest, setGuest] = useState(route.params.guestData);
    

    useEffect(() => {
        const fetchGuestData = async () => {
            try {
                const results = await sendRooomStatus(guest.email);
                setGuest(results.data);
                await AsyncStorage.setItem('guestData', JSON.stringify(results.data));
            } catch (error) {
                console.error("fetchGuestData error", error);
            }
        }
        fetchGuestData();

        // Initialize NFC Manager when component mounts
        initNfc();
       
    }, []);

    // Function to initialize NFC Manager
    const initNfc = async () => {
        try {
            await NfcManager.start();
        } catch (ex) {
            console.warn('NFC init error', ex.message);
        }
    };

    // Function to broadcast room key using NFC
    const broadcastRoomKey = async () => {
        try {
            console.log("key")
            const allo = await NfcManager.requestTechnology(NfcTech.Ndef);
            console.log("rapehello", allo)
            

            const bytes = NfcManager.createNdefMessage({
                roomKey: guest.roomKey // Assuming roomKey is a string

            });
          
            console.log("bytes")
            await NfcManager.setNdefPushMessage(bytes);
        } catch (ex) {
            console.warn('NFC broadcast error', ex.message);
        }
    };

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
                <Text style={styles.label}>keyNumber:</Text>
                <Text style={styles.text}>{guest.roomKey}</Text>
            </View>
            <Button title="Broadcast Room Key" onPress={broadcastRoomKey} />

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