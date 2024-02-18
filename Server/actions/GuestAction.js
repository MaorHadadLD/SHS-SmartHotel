import firebaseApp from '../firebaseConfig.js';
import { getDatabase, ref, get, query, orderByChild, equalTo ,update} from 'firebase/database';

const db = getDatabase(firebaseApp);

export const getGuestByEmail = async (email) => {
    try {
        const guestRef = ref(db, 'guests/');
        const emailQuery = query(guestRef, orderByChild('email'), equalTo(email));
        const snapshot = await get(emailQuery);

        if (snapshot.exists()) {
            const guestData = snapshot.val();
            const guestKey = Object.keys(guestData)[0]; // Get the key of the matching guest node
            return guestData;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving guest:', error);
        return null;
    }
}

export const createGuest = async (guest) => {}

export const updateGuestSelectedHotel = async (guestEmail, hotelName, city) => {
    try {
        const result = await getGuestByEmail(guestEmail);
        const guestData = Object.values(result)[0];
        const guestKey = Object.keys(result)[0];
        console.log("guestData", guestData);
        if (!guestData) {
            return false;
        }
        // Update the guest data with the selectedHotel
        let updatedGuestData = guestData;
        if (guestData.selectedHotel === undefined && guestData.roomNumber === undefined) {
            updatedGuestData = {
            ...guestData,
            selectedHotel: {
                hotelName: hotelName,
                city: city
            },
            roomNumber: "waitaing for room assignment",
        };
    }
        const guestRef = ref(db, `guests/${guestKey}`);
        // Use update to set the new guest data
        await update(guestRef, updatedGuestData);
        return  updatedGuestData;
    } catch (error) {
        console.error("updateGuestSelectedHotel", error);
        return false;
    }
};
export const updateGuestRoomNumber = async (guestEmail, roomNumber) => {
    try {
        const result = await getGuestByEmail(guestEmail);
        const guestData = Object.values(result)[0];
        const guestKey = Object.keys(result)[0]; 
        if (!guestData) {
            return false;
        }
        // Update the guest data with the selectedHotel
        const updatedGuestData = {
            ...guestData,
            roomNumber: roomNumber,
        };
        const guestRef = ref(db, `guests/${guestKey}`);
        // Use update to set the new guest data
        await update(guestRef, updatedGuestData);
        return true;
    } catch (error) {
        console.error("updateGuestSelectedHotel", error);
        return false;
    }
}


export const deleteGuest = async (guest) => {}