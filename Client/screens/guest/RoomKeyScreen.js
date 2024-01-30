import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../../styles/globalStyle';

function RoomKeyScreen({route}) {
    const guestEmail = route.params.guest || {};
    console.log("RoomKeyScreen guestEmail", guestEmail)
    useEffect(() => {
        const fetchGuestData = async () => {
            try {
                const results = await sendRooomStatus();
            } catch (error) {
                    
            }
        }
        fetchGuestData();
    },[]);

  return (
    <View style={globalStyles.container}>
        <Text>RoomKeyScreen {guestEmail}</Text>
    </View>
  )
}

export default RoomKeyScreen;
