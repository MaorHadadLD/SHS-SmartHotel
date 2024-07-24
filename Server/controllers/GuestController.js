import {getGuestByEmail, updateGuestOPT, updateGuestSelectedHotel} from '../actions/GuestAction.js';    
import { deleteChat } from './ChatController.js';

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
    console.log("deleteGuestController", body);
    try {
       const deleteGuestChats = await deleteChat(hotel, roomNumber);
    }catch (error) {
        console.error("deleteGuestController", error);
        return false;
    }
};