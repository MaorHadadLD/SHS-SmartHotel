import firebaseApp from '../firebaseConfig.js';
import { getDatabase, ref, get, query, orderByChild, equalTo ,update, remove, push} from 'firebase/database';
import { sendEmail } from '../routes/MailRoute.js';

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
            roomNumber: "waiting for room assignment",
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

// Function to generate a random room key
const generateRandomRoomKey = () => {
    // Generate a random number between 1000 and 9999
    return Math.floor(1000 + Math.random() * 9000);
}

export const updateGuestRoomNumber = async (guestEmail, roomNumber) => {
    try {
        // Check if the roomNumber is a message
        if (roomNumber === "Your request for your room has been sent to the hotel reception") {
            // Update guest data without generating a room key
            const result = await getGuestByEmail(guestEmail);
            const guestData = Object.values(result)[0];
            const guestKey = Object.keys(result)[0]; 
            if (!guestData) {
                return false;
            }

            // Update the guest data with the provided roomNumber
            const updatedGuestData = {
                ...guestData,
                roomNumber: roomNumber
            };

            const guestRef = ref(db, `guests/${guestKey}`);
            // Use update to set the new guest data
            await update(guestRef, updatedGuestData);

            return true;
        } else {
            // If roomNumber is an actual room number, generate a room key
            const result = await getGuestByEmail(guestEmail);
            const guestData = Object.values(result)[0];
            const guestKey = Object.keys(result)[0]; 
            if (!guestData) {
                return false;
            }

            // Check if the generated room key already exists in the keys collection
            let roomKeyExists = true;
            let roomKey;
            while (roomKeyExists) {
                roomKey = generateRandomRoomKey();
                const keysRef = ref(db, 'keys/' + roomKey);
                const keySnapshot = await get(keysRef);
                roomKeyExists = keySnapshot.exists();
            }

            // Update the guest data with the selected hotel and generated room key
            const updatedGuestData = {
                ...guestData,
                roomNumber: roomNumber,
                roomKey: roomKey
            };

            const guestRef = ref(db, `guests/${guestKey}`);
            const keysRef = ref(db, `keys/${roomKey}`);

            // Use update to set the new guest data
            await Promise.all([
                update(guestRef, updatedGuestData),
                update(keysRef, { [roomKey]: true }) // Add the room key to the keys collection
            ]);
            
            return true;
        }
    } catch (error) {
        console.error("updateGuestRoomNumber", error);
        return false;
    }
}

export const updateGuestOPT = async (guestEmail) => {
    try {
        const result = await getGuestByEmail(guestEmail);
        const guestData = Object.values(result)[0];
        const guestKey = Object.keys(result)[0]; 
        if (!guestData) {
            return false;
        }

        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Update the guest data with the generated OTP
        const updatedGuestData = {
            ...guestData,
            otp: otp
        };
        const guestRef = ref(db, `guests/${guestKey}`);
        // Use update to set the new guest data
        await update(guestRef, updatedGuestData);

        // Send the email with the updated OTP
        await sendEmail(guestEmail, otp);

        return true;
    } catch (error) {
        console.error("updateGuestOPT", error);
        return false;
    }
}
export const deleteGuest = async (email) => {
    console.log("deleteGuest", email);
    try {
        const result = await getGuestByEmail(email);
        const guestData = Object.values(result)[0];
        const guestKey = Object.keys(result)[0]; 
        if (!guestData) {
            return false;
        }
        const guestRef = ref(db, `guests/${guestKey}`);
        await remove(guestRef);
        return true;
    } catch (error) {
        console.error("deleteGuest", error);
        return false;
    }
    
}

export const saveFeedback = async (feedbackData) => {
    const feedbackRef = ref(db, 'feedbacks');
    
    try {
        // Push creates a new child node with a unique key under 'feedbacks'
        const newFeedbackRef = await push(feedbackRef, {
            email: feedbackData.email,
            firstname: feedbackData.firstname,
            lastname: feedbackData.lastname,
            checkIn: feedbackData.checkIn,
            checkOut: feedbackData.checkOut,
            phone: feedbackData.phone,
            rating: feedbackData.rating,
            feedback: feedbackData.feedback,
            selectedHotel: feedbackData.selectedHotel,
            roomNumber: feedbackData.roomNumber,
            timestamp: new Date().toISOString(),
        });

        console.log('Feedback saved successfully');
        return true;
    } catch (error) {
        console.error('Error saving feedback:', error);
        return false;
    }
};