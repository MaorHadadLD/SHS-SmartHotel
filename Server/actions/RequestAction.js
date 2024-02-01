import firebaseApp from '../firebaseConfig.js';
import { getDatabase, ref, set, push, query, orderByChild, equalTo } from 'firebase/database';
import { updateGuestRoomNumber } from './GuestAction.js';

const db = getDatabase(firebaseApp);

export const postRoomRequest = async (request) => {
    // console.log("postRoomRequest", request);
    try {
        const requestRef = ref(db, `roomRequests/`);
        const newRef = push(requestRef);
        set(newRef, {
            guestEmail: request.guest.email,
            guestName: request.guest.firstname + " " + request.guest.lastname,
            hotel:{
                hotelName: request.guest.selectedHotel.hotelName,
                city: request.guest.selectedHotel.city,
            
            },
            checkInDate: request.guest.checkIn,        
            checkOutDate: request.guest.checkOut,
            status: "waiting",
        });
        const res = await updateGuestRoomNumber(request.guest.email, "Your request for your room has been sent to the hotel reception");
        console.log("postRoomRequestreslut", res);
        return {succees: true, guestEmail: request.guest.email};
    }
    catch (error) {
        console.error("postRoomRequest", error);
        return {succees: false};
    }
}

export const updateRequest = async (guest) => {}

export const deleteRequest = async (guestEmail, type) => {
    try {
        const requestRef = ref(db, `${type}`);
        const reqQuery = query(requestRef, orderByChild('guestEmail'), equalTo(guestEmail));
        set(reqQuery, null);
        return {success: true};
    }
    catch (error) {
        console.error("deleteRequest", error);
        return {success: false};
    }
}