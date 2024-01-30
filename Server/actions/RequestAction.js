import firebaseApp from '../firebaseConfig.js';
import { getDatabase, ref, set } from 'firebase/database';

const db = getDatabase(firebaseApp);

export const postRoomRequest = async (request) => {
    console.log("postRoomRequest???", request.guest.checkIn);
    const requestData = {
        guestEmail: request.guest.email,
        guestName: request.guest.firstname + " " + request.guest.lastname,
        hotel: request.hotel,
        checkInDate: request.guest.checkIn,        
        checkOutDate: request.guest.checkOut,
        status: "waiting",
    
    }
    try {
        const requestRef = ref(db, `roomRequests/`);
        await set(requestRef, requestData);
        return true;
    }
    catch (error) {
        console.error("postRoomRequest", error);
        return false;
    }
}

export const updateGuest = async (guest) => {}

export const deleteGuest = async (guest) => {}