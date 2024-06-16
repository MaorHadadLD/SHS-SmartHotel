import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import CalendarModal from "../../components/CalendarModal";
import { getDatabase, ref, get } from "firebase/database";
import firebaseApp from "../../firebaseConfig";

function SpaScreen({ navigation, route }) {
  console.log('SpaScreen route:', route.params);  

  const spaOperatingHours = { start: 11, end: 18 }; // Updated spa operating hours
  const massageDuration = 30;

  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  const generateAvailableTimeSlots = () => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(spaOperatingHours.start, 0, 0, 0);

    const db = getDatabase(firebaseApp);
    const appointmentsRef = ref(db, 'appointments');
    const selectedDate = new Date().toLocaleDateString(); // or get the selected date from your state

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
            const isFullyBooked = appointmentsCount[timeKey] >= 10; // Assume 10 appointments per slot

            if (!isFullyBooked) {
                slots.push({ time: new Date(currentTime), disabled: false });
            }

            currentTime.setMinutes(currentTime.getMinutes() + massageDuration);
        }

        setAvailableTimeSlots(slots);
    });
  };

  useEffect(() => {
    generateAvailableTimeSlots();
  }, [selectedTime]); // Update useEffect dependency

  return (
    <View style={styles.container}>
      <CalendarModal route={route.params} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default SpaScreen;
