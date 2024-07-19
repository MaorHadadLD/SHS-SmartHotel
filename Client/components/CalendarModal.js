import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import BookingSpaModal from './BookingSpaModal'; // Import the BookingSpaModal component
import { SafeAreaView } from 'react-native-safe-area-context';

function CalendarModal({ route, onSelectDate, availableTimeSlots, spaClosed }) {
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
    const [markedDates, setMarkedDates] = useState({}); // State to manage marked dates

    useEffect(() => {
        console.log('Available time slots:', availableTimeSlots); // Debug log
    }, [availableTimeSlots]);

    const handleDateSelect = date => {
        setSelectedDateTime({ date, time: null });
        setMarkedDates({ [date.dateString]: { selected: true, selectedColor: '#FF6B3C' } });
        onSelectDate(date.dateString);
    };

    const handleTimeSelect = time => {
        setSelectedDateTime(prevState => ({ ...prevState, time }));
        setIsModalVisible(true);
    };

    const renderTimeSlot = ({ item }) => (
        <TouchableOpacity
            style={styles.timeSlotButton}
            onPress={() => handleTimeSelect(item.time)}
        >
            <Text style={styles.timeSlotText}>{item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
    );

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Spa Booking</Text>
                <Calendar
                    style={{ borderRadius: 10, elevation: 4, marginBottom: 20 }}
                    minDate={new Date().toISOString().split('T')[0]}
                    maxDate={maxDate.toISOString().split('T')[0]}
                    onDayPress={handleDateSelect}
                    markedDates={markedDates}
                />
                {selectedDateTime && selectedDateTime.date && !spaClosed && (
                    availableTimeSlots.length > 0 ? (
                        <FlatList
                            data={availableTimeSlots}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderTimeSlot}
                        />
                    ) : (
                        <Text style={styles.noSlotsText}>No available time slots for the selected date.</Text>
                    )
                )}
                {spaClosed && (
                    <Text style={styles.closedText}>The spa's operating hours are over for today.</Text>
                )}
                {isModalVisible && (
                    <BookingSpaModal
                        route={route}
                        date={selectedDateTime.date}
                        time={selectedDateTime.time}
                        closeModal={() => setIsModalVisible(false)}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: 'black',
    },
    timeSlotButton: {
        borderRadius: 100,
        alignItems: "center",
        width: 310,
        paddingVertical: 5,
        marginVertical: 10,
        backgroundColor: '#FF6B3C',
    },
    timeSlotText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    noSlotsText: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 20,
        fontSize: 16,
    },
    closedText: {
        textAlign: 'center',
        color: 'red',
        marginTop: 20,
        fontSize: 16,
    },
});

export default CalendarModal;
