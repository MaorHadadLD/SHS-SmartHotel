import firebaseApp from '../firebaseConfig.js';
import { getDatabase, ref, get, orderByChild, equalTo, query } from 'firebase/database';

const db = getDatabase(firebaseApp);
export const StaffLogin = async (employeeNumber, password) => {
    try {
        // Remove the duplicate declaration of employeeRef
        // const employeeRef = ref(db, `staff/${employeeNumber}`);

        // Move the declaration to the correct position
        const employeeRef = ref(db, `staff/${employeeNumber}`);

        const snapshot = await get(employeeRef);
        if (snapshot.exists()) {
            // Employee exists, check the password
            const employeeData = snapshot.val();
            // console.log("employeeData", employeeData);
            // Ensure employeeData.password is a string before trimming
            const trimmedPassword = String(employeeData.password).trim();
          
            if (trimmedPassword === password.trim()) {
                return {sucess:true, data: employeeData}
            }
            else {
                return {sucess:false, data:"Incorrect password"}
            }
        }
        else {
            return {sucess:false, data:"Employee does not exist"}
        }
    }
    catch (error) {
        return {sucess:false, data:error.message}
    }
}

export const getAvailableRooms = async (hotel) => {
    try {
        const hotelsRef = ref(db, 'Hotels');
        const hotelsQuery = query(hotelsRef, orderByChild('hotelName'),equalTo(hotel.hotelName));
        const snapshot = await get(hotelsQuery);
        
        if (snapshot.exists()) {
            const hotels = snapshot.val();
            // Find the hotel with matching city
            const hotelKey = Object.keys(hotels).find(key => {
            const hotelFound = hotels[key];
            const hotelCity = hotelFound.city || ''; // Handle the case where the city property might not be present
            return hotelCity === hotel.city;
        });
  
          if (hotelKey) {
            const roomList = hotels[hotelKey].roomList;

          // Get indices of available rooms
            const availableRoomNumber = roomList.reduce((indices, status, index) => {
                if (status === 'available') {
                    indices.push(index);
                }
            return indices;
            }, []);
            if (availableRoomNumber.length === 0) {
                return 'No rooms available';
            }
          return availableRoomNumber.map(String);
          } else {
            console.log('Hotel not found in the given city');
            return null;
          }
        } else {
          console.log('Hotel not found');
          return null;
        }
    } catch (error) {
      console.error('Error getting available rooms:', error.message);
      throw error;
    }
  };