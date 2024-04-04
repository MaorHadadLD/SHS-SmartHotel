import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SpaCalendar = () => {
  // Generate an array of hours from spaOperatingHours
  const spaOperatingHours = { start: 11, end: 18 };
  const hours = [];
  for (let i = spaOperatingHours.start; i < spaOperatingHours.end; i++) {
    hours.push(i);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Today's Date: {new Date().toLocaleDateString()}</Text>
      <View style={styles.hoursContainer}>
        {hours.map((hour, index) => (
          <View key={index} style={styles.hourItem}>
            <Text>{hour}:00</Text>
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
