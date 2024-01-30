import firebaseApp from '../firebaseConfig.js';
import { getDatabase, ref, get } from 'firebase/database';

const db = getDatabase(firebaseApp);

export const postRoomRequest = async (request) => {
    const requestData = {
        guestEmail: request.guest.email,
        guestName: request.guest.name,
        hotel: request.hotel,
        checkInDate: request.guset.checkIn,        
        checkOutDate: request.guset.checkOut,
        status: "waiting",
    
    }
    try {
        const requestRef = ref(db, `roomRequests/${request.guest.email}`);
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