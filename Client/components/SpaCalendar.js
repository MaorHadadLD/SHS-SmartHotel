import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';
import firebaseApp from '../firebaseConfig';

const SpaCalendar = () => {
  const spaOperatingHours = { start: 11, end: 18 };
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const generateAvailableTimeSlots = () => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(spaOperatingHours.start, 0, 0, 0);

    const db = getDatabase(firebaseApp);
    const appointmentsRef = ref(db, 'appointments');
    const selectedDate = new Date().toLocaleDateString();

    get(appointmentsRef).then((snapshot) => {
        const appointments = snapshot.val();
        const appointmentsCount = {};

        if (appointments) {
            Object.values(appointments).forEach(appt => {
                if (appt.date === selectedDate) {
                    const timeKey = `${new Date(appt.time).getHours()}:${new Date(appt.time).getMinutes()}`;
                    if (!appointmentsCount[timeKey]) {
                        appointmentsCount[timeKey] = 0;
                    }
                    appointmentsCount[timeKey]++;
                }
            });
        }

        while (currentTime.getHours() < spaOperatingHours.end) {
            const timeKey = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
            const isFullyBooked = appointmentsCount[timeKey] >= 10;

            if (!isFullyBooked) {
                slots.push({ time: new Date(currentTime), disabled: false });
            }

            currentTime.setMinutes(currentTime.getMinutes() + 30);
        }

        setAvailableTimeSlots(slots);
    });
  };

  useEffect(() => {
    generateAvailableTimeSlots();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Today's Date: {new Date().toLocaleDateString()}</Text>
      <View style={styles.hoursContainer}>
        {availableTimeSlots.map((slot, index) => (
          <View key={index} style={styles.hourItem}>
            <Text>{slot.time.getHours()}:00</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 18,
    marginBottom: 10,
  },
  hoursContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hourItem: {
    width: '33.33%', // 3 columns in a row
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default SpaCalendar;
