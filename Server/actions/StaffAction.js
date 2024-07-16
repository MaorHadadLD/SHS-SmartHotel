import e from 'express';
import firebaseApp from '../firebaseConfig.js';
import { getDatabase, ref, get, orderByChild, equalTo, query, update,push, set, remove } from 'firebase/database';

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

  export const updateRoomStatus = async (hotel, roomNumber, status) => {
    console.log(`Update room ${roomNumber} status to ${status} in hotel ${hotel.hotelName}`);
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
            roomList[roomNumber] = status;
            const hotelRef = ref(db, `Hotels/${hotelKey}`);
            await update(hotelRef, {roomList});
            // const availableRooms = await getAvailableRooms(hotel);
            return {success: true, data: 'Room status updated'};
        }
        } else {
            console.log('Hotel not found in the given city');
            return {success: false, data: 'Hotel not found in the given city'};
        }
    } catch (error) {  
        console.error('Error updating room status:', error.message);
        return {success: false, data: error.message};
    }
}

export const getHotelByNameAndCity = async (hotelName, city) => {
    try {
        const hotelsRef = ref(db, 'Hotels');
        const hotelsQuery = query(hotelsRef, orderByChild('hotelName'),equalTo(hotelName));
        const snapshot = await get(hotelsQuery);
        if (snapshot.exists()) {
            const hotels = snapshot.val();
            // Find the hotel with matching city
            const hotelKey = Object.keys(hotels).find(key => {
            const hotelFound = hotels[key];
            const hotelCity = hotelFound.city || ''; // Handle the case where the city property might not be present
            return hotelCity === city;
        });
        if (hotelKey) {
            const hotel = hotels[hotelKey];
            return {hotel, hotelKey};
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

}
export  const getMealByHotel = async (hotel) => {
    try{
        const hotelref = await getHotelByNameAndCity(hotel.hotelName, hotel.city);
        // console.log("getMealByHotel", hotelref.hotel.meals);
        if(hotelref){
            return {success: true, data: hotelref.hotel.meals};
        }
        else {
            return {success: false, data: "Hotel not found"};
        }
    }
    catch (error) {
        console.error('Error getting meal:', error.message);
        throw error;
    }
}

export const updateMealByHotel = async (hotel, meals) => {
    console.log("updateMealHotel", hotel, meals);
    try {
        const hotelRefold = await getHotelByNameAndCity(hotel.hotelName, hotel.city);
        console.log("hotelref", hotelRefold);
        if (hotelRefold && hotelRefold.hotel.meals) {
            const updatedMeals = { meals };
            console.log("updatedMealssssssss", updatedMeals);
            //get ref hotel acording to hotel name and city
            // const hotelsRef = ref(db, 'Hotels');
            // const hotelsQuery = query(hotelsRef, orderByChild('hotelName'),equalTo(hotel.hotelName));
            // const snapshot = await get(hotelsQuery);
            // if (snapshot.exists()) {
            //     const hotels = snapshot.val();
            //     // Find the hotel with matching city
            //     const hotelKey = Object.keys(hotels).find(key => {
            //     const hotelFound = hotels[key];
            //     const hotelCity = hotelFound.city || ''; // Handle the case where the city property might not be present
            //     return hotelCity === hotel.city;
            // }
            // );
            // if (hotelKey) {
                const hotelRef = ref(db, `Hotels/${hotelRefold.hotelKey}`);
                console.log("hotelRefaaaaaaaa", hotelRefold.hotelKey);
                await update(hotelRef, {meals: updatedMeals.meals});
                return { success: true, data: 'Meals updated successfully' };
                
            } else {
                return { success: false, data: 'Hotel or meals not found' };
            }
        } catch (error) {
        console.error('Error updating meal:', error.message);
        return { success: false, data: error.message };
    }
}


export const addEmployee = async (employeeData) => {
  try {
    const employeeRef = ref(db, `staff/${employeeData.employeeNumber}`);
    const employeeSnapshot = await get(employeeRef);
    console.log("employeeSnapshot", employeeSnapshot.exists());
    if (employeeSnapshot.exists()) {
      return { success: false, message: 'Employee already exists' };
    }
    await set(employeeRef, employeeData);
    return { success: true, message: 'Employee added successfully' };
  } catch (error) {
    console.error('Error adding employee:', error);
    return { success: false, message: error.message };
  }
};

export const deleteEmployee = async (employeeNumber) => {
    if (employeeNumber === '' || employeeNumber === null) {
      return { success: false, message: 'Employee number is required' };
    }
  try {
    const employeeRef = ref(db, `staff/${employeeNumber}`);
    const employeeSnapshot = await get(employeeRef);
    if (!employeeSnapshot.exists()) {
      return { success: false, message: 'Employee not found' };
    }
    await remove(employeeRef);
    return { success: true, message: 'Employee deleted successfully' };
  } catch (error) {
    console.error('Error deleting employee:', error);
    return { success: false, message: error.message };
  }
};
