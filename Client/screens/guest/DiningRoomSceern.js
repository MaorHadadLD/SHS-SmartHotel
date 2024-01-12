// Import necessary modules from react-native
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

// Define the data for the hotel dishes
const hotelDishes = {
  breakfast: [
    { id: '1', name: 'Omelette' },
    { id: '2', name: 'Scrambled Eggs' },
    { id: '3', name: 'Egg Ein' },
    { id: '4', name: "Chef's Special Breakfast" },
  ],
  lunch: [
    { id: '5', name: 'Schnitzel' },
    { id: '6', name: 'Chicken Breast' },
    { id: '7', name: "Chef's Special Lunch" },
  ],
  dinner: [
    { id: '8', name: 'Beef Fillet' },
    { id: '9', name: 'Fish' },
    { id: '10', name: "Chef's Special Dinner" },
  ],
};

// Create the DiningRoomScreen component
function DiningRoomScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Breakfast</Text>
      <FlatList
        data={hotelDishes.breakfast}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />

      <Text style={styles.header}>Lunch</Text>
      <FlatList
        data={hotelDishes.lunch}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />

      <Text style={styles.header}>Dinner</Text>
      <FlatList
        data={hotelDishes.dinner}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

// Create the styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

// Export the DiningRoomScreen component
export default DiningRoomScreen;
