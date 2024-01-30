import firebaseApp from '../firebaseConfig.js';
import { getDatabase, ref, set, push } from 'firebase/database';

const db = getDatabase(firebaseApp);

export const postRoomRequest = async (request) => {
    console.log("postRoomRequest", request);
    try {
        const requestRef = ref(db, `roomRequests/`);
        const newRef = push(requestRef);
        set(newRef, {
            guestEmail: request.guest.email,
            guestName: request.guest.firstname + " " + request.guest.lastname,
            hotel: request.hotel,
            checkInDate: request.guest.checkIn,        
            checkOutDate: request.guest.checkOut,
            status: "waiting",
        });
        return {succees: true, guestEmail: request.guest.email};
    }
    catch (error) {
        console.error("postRoomRequest", error);
        return {succees: false};
    }
}

export const updateGuest = async (guest) => {}

export const deleteGuest = async (guest) => {}