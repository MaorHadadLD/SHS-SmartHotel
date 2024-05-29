import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import BookingSpaModal from './BookingSpaModal'; // Import the BookingSpaModal component

function CalendarModal({ route }) {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
  const [markedDates, setMarkedDates] = useState({}); // State to manage marked dates

  const availableTimeSlots = [
    { id: 1, time: '10:00 AM' },
    { id: 2, time: '11:00 AM' },
    { id: 3, time: '12:00 PM' },
    { id: 4, time: '2:00 PM' },
    { id: 5, time: '3:00 PM' },
    { id: 6, time: '4:00 PM' },
  ];

  const handleDateSelect = date => {
    setSelectedDateTime({ date, time: null });
    setMarkedDates({ [date.dateString]: { selected: true,  selectedColor: '#FF6B3C' } });
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
      <Text style={styles.timeSlotText}>{item.time}</Text>
    </TouchableOpacity>
  );

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spa Booking</Text>
      <Calendar
        style={{ borderRadius: 10, elevation: 4, marginBottom: 20 }}
        minDate={new Date().toISOString().split('T')[0]}
        maxDate={maxDate.toISOString().split('T')[0]}
        onDayPress={handleDateSelect}
        markedDates={markedDates}
      />
      {selectedDateTime && selectedDateTime.date && (
        <FlatList
          data={availableTimeSlots}
          keyExtractor={item => item.id.toString()}
          renderItem={renderTimeSlot}
        />
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
  );
}

const styles = StyleSheet.create({
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
});

export default CalendarModal;
