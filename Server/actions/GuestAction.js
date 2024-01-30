import firebaseApp from '../firebaseConfig.js';
import { getDatabase, ref, get } from 'firebase/database';

const db = getDatabase(firebaseApp);

export const getGuestByEmail = async (email) => {
    try {
        const guestRef = ref(db, `guests/`);
        const snapshot = await get(guestRef);
        if (snapshot.exists()) {
            const guestData = snapshot.val();
            return guestData;
        }
        else {
            return null;
        }
    }
    catch (error) {
        return null;
    }
}

export const createGuest = async (guest) => {}

export const updateGuestSelectesHotel = async (guest, hotelName, city) => {
    try {
        const guestRef = ref(db, `guests/`);
        if (!guestRef) {
            return false;
        }
        await update(guestRef, {
           selectedHotel: {
               hotelName: hotelName,
               city: city
           }
        });
        return true;
    }
    catch (error) {
        console.error("updateGuestSelectesHotel", error);
        return false;
    }


}

export const deleteGuest = async (guest) => {}