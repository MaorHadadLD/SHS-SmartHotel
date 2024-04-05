import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo Icons
import { getTablesHotel,updateTables } from '../../../API/RequestCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dummy data for illustration purposes


const TableReservation = () => {
  const [tables, setTables] = useState([]);
  const [guest, setGuest] = useState([]);

  useEffect(() => {
    
    const getTables = async () => {
        try {
          const guestData = await AsyncStorage.getItem('guestData');

            setGuest(JSON.parse(guestData));
            const res = await getTablesHotel(guest.selectedHotel);
            if (res.success) {
                const tablesArray = Object.keys(res.data).map((key) => ({
                    id: parseInt(key),
                    status: res.data[key],
                  }));
                  setTables(tablesArray);
                
            }
        } catch(error){
            console.error('AsyncStorage error', error);
    
        }
    }
    getTables();
  
  }, [guest]);

  const handleTableClick = async (tableId) => {
    const table = tables.find((item) => item.id === tableId);
    if (table.status === 'available') {
        setTables(tables.map((item) => {
            if (item.id === tableId) {
                return { ...item, status: 'reserved' };
            }
            return item;
            }));
            try {
              const res = await updateTables(guest.selectedHotel, tableId, 'reserved');
              if(res.success){
                  alert('Table reserved successfully');
                  
              } else {
                  alert('Table reservation failed');
              }

          } catch(error){
              console.error('AsyncStorage error', error);
          }
      // Logic to reserve the table
      alert(`Table ${tableId} is available. You can reserve it.`);
    } else {
      // Display message for non-available table
      alert(`Table ${tableId} is not available.`);
    }
  };

  const renderTableItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.tableItem, item.status === 'available' ? styles.availableTable : styles.nonAvailableTable]}
      onPress={() => handleTableClick(item.id)}
    >
      <FontAwesome name="table" size={24} color="white" />
      <Text style={styles.tableText}>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Table Reservation</Text>
      <FlatList
        data={tables}
        renderItem={renderTableItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} // Adjust based on your layout
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%', // Adjust width as needed for spacing
    height: 100,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  availableTable: {
    backgroundColor: 'green',
  },
  nonAvailableTable: {
    backgroundColor: 'grey',
  },
  tableText: {
    marginLeft: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TableReservation;
