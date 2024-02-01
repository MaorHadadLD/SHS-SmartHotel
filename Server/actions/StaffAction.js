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

export const getAvailableRooms = async (hotelNameAndCity) => {
    try {
      const firstSpaceIndex = hotelNameAndCity.indexOf(' ');
      const secondSpaceIndex = hotelNameAndCity.indexOf(' ', firstSpaceIndex + 1);
  
      if (firstSpaceIndex !== -1 && secondSpaceIndex !== -1) {
        const hotelName = hotelNameAndCity.substring(0, secondSpaceIndex);
        const city = hotelNameAndCity.substring(secondSpaceIndex + 1);
        console.log('Hotel name:', hotelName);
        console.log('City:', city);
  
        const hotelsRef = ref(db, 'Hotels');
        const hotelsQuery = query(hotelsRef, orderByChild('hotelName'),equalTo(hotelName));
        const snapshot = await get(hotelsQuery);
  
        if (snapshot.exists()) {
          const hotels = snapshot.val();
  
          // Find the hotel with matching city
          const hotelKey = Object.keys(hotels).find(key => {
            const hotel = hotels[key];
            const hotelCity = hotel.city || ''; // Handle the case where the city property might not be present
            return hotelCity === city;
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
          console.log('Number of Available Rooms:', availableRoomNumber);
          return availableRoomNumber.map(String);
          } else {
            console.log('Hotel not found in the given city');
            return null;
          }
        } else {
          console.log('Hotel not found');
          return null;
        }
      } else {
        console.log('Invalid input format');
        return null;
      }
    } catch (error) {
      console.error('Error getting available rooms:', error.message);
      throw error;
    }
  };