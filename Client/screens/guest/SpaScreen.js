import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import CalendarModal from "../../components/CalendarModal";
import { LinearGradient } from 'expo-linear-gradient';

function SpaScreen({ navigation, route }) {
    const spaOperatingHours = { start: 10, end: 18 }; // Spa operating hours in local time
    const massageDuration = 30;

    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [spaClosed, setSpaClosed] = useState(false);

    const generateAvailableTimeSlots = (date) => {
        console.log('Generating time slots for date:', date);
        const slots = [];
        const currentDateTime = new Date();
        const selectedDateTime = new Date(date);

        const today = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate());
        const selectedDateOnly = new Date(selectedDateTime.getFullYear(), selectedDateTime.getMonth(), selectedDateTime.getDate());

        const isToday = selectedDateOnly.getTime() === today.getTime();

        if (isToday) {
            if (currentDateTime.getHours() >= spaOperatingHours.end) {
                setSpaClosed(true);
                setAvailableTimeSlots([]);
                console.log('Spa operating hours are over for today.');
                return;
            } else {
                setSpaClosed(false);
                let currentTime = new Date();
                if (currentDateTime.getHours() < spaOperatingHours.start) {
                    currentTime.setHours(spaOperatingHours.start, 0, 0, 0);
                } else {
                    currentTime.setHours(currentDateTime.getHours(), Math.ceil(currentDateTime.getMinutes() / 30) * 30, 0, 0);
                }
                while (currentTime.getHours() < spaOperatingHours.end) {
                    slots.push({ time: new Date(currentTime), disabled: false });
                    currentTime.setMinutes(currentTime.getMinutes() + massageDuration);
                }
            }
        } else {
            setSpaClosed(false);
            let currentTime = new Date();
            currentTime.setHours(spaOperatingHours.start, 0, 0, 0);
            while (currentTime.getHours() < spaOperatingHours.end) {
                slots.push({ time: new Date(currentTime), disabled: false });
                currentTime.setMinutes(currentTime.getMinutes() + massageDuration);
            }
        }

        console.log('Generated time slots:', slots); // Debug log
        setAvailableTimeSlots(slots);
    };

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(selectedDate).setHours(0, 0, 0, 0) >= today) {
            generateAvailableTimeSlots(selectedDate);
        } else {
            setAvailableTimeSlots([]);
        }
    }, [selectedDate]); // Update useEffect dependency

    return (
        <ImageBackground source={require('../../assets/Spa-background.jpg')} style={styles.backgroundImage}>
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.overlay}
            />
            <View style={styles.container}>
                <CalendarModal 
                    route={route.params} 
                    onSelectDate={(date) => setSelectedDate(date)} 
                    availableTimeSlots={availableTimeSlots}
                    spaClosed={spaClosed}
                />
                {spaClosed && (
                    <Text style={styles.closedText}>The spa's operating hours are over for today.</Text>
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closedText: {
        textAlign: 'center',
        color: 'red',
        marginTop: 20,
        fontSize: 16,
    },
});

export default SpaScreen;
