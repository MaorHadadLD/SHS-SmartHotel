import {deleteGuest, getGuestByEmail, updateGuestOPT, updateGuestSelectedHotel,saveFeedback} from '../actions/GuestAction.js';    
import { deleteChat } from './ChatController.js';
import { updateRoomStatus } from '../actions/StaffAction.js';


export const requestSuccess = (data) => ({success: true, data})
export const requestFailure = (data) => ({ success: false, data });

export const LogInGuestController = async (body) => {
    const result = await getGuestByEmail(body.email);
    if (result) {
        const guestData = Object.values(result)[0];
        if (guestData.otp === body.password){
            const resultupdate = await updateGuestSelectedHotel(guestData.email, body.selectedHotel.selectedHotel.hotelName, body.selectedHotel.selectedHotel.city);
            return requestSuccess(resultupdate);
        }
        else
            return requestFailure("Incorrect Password");
    } else {
        return requestFailure("Email not found");
    }
}

export const RoomStatusController = async (body) => {
    const result = await getGuestByEmail(body.email);
    if (result) {
        const guestData = Object.values(result)[0];
        if (guestData) {
            return requestSuccess(guestData);
        }
    } else {
        return requestFailure("Email not found");
    }
}

export const getGuestDetailsController = async (body) => {
    const result = await getGuestByEmail(body.email);
    if (result) {
        const guestData = Object.values(result)[0];
        if (guestData) {
            return requestSuccess(guestData);
        }
    } else {
        return requestFailure("Email not found");
    }
}

export const requestOTP = async (body) => {
    const result = await updateGuestOPT(body.email);
    if (result) {
        return requestSuccess("OTP resent successfully!");
    } else {
        return requestFailure("Email not found");
    }
}

export const CheckOutGuestController = async (body) => {
    console.log("CheckOutGuestController", body);
    try {
        // Save feedback first
        const feedbackSaved = await saveFeedback(body);
        
        if (!feedbackSaved) {
            return requestFailure("Error saving feedback");
        }
        const deleteGuestChats = await deleteChat(body.selectedHotel, body.roomNumber);
        const updateRoom = await updateRoomStatus(body.selectedHotel, body.roomNumber, 'available');
        const checkOutGuest = await deleteGuest(body.email);
        
        if (deleteGuestChats && updateRoom.success && checkOutGuest) {
            return requestSuccess("Guest checked out successfully!");
        } else {
            return requestFailure("Error checking out guest");
        }
    } catch (error) {
        console.error("CheckOutGuestController", error);
        return requestFailure("Internal server error");
    }
};