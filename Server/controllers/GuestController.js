import {getGuestByEmail, updateGuestSelectedHotel} from '../actions/GuestAction.js';    

export const requestSuccess = (data) => ({success: true, data})
export const requestFailure = (data) => ({ success: false, data });

export const LogInGuestController = async (body) => {
    const result = await getGuestByEmail(body.email);
    console.log("LogInGuestController result", result);
    if (result) {
        const guestData = Object.values(result)[0];
        if (guestData.otp === body.password){
            const resultupdate = await updateGuestSelectedHotel(guestData.email, body.selectedHotel.selectedHotel.hotelName, body.selectedHotel.selectedHotel.city);
            return requestSuccess(resultupdate);
            // guestData.otp = null;
            // guestData.password = body.password;
            // console.log("LogInGuestController guestData", guestData);
            // updateGuest(guestData);
            // return requestSuccess(guestData);
        }
        else
            return requestFailure("Incorrect Password");
    } else {
        return requestFailure("Email not found");
    }
}

export const RoomStatusController = async (body) => {
    const result = await getGuestByEmail(body.email);
    const guestData = Object.values(result)[0];
    if (guestData) {
        return requestSuccess(guestData);
    } else {
        return requestFailure("Email not found");
    }
}

export const getGuestDetailsController = async (body) => {
    const result = await getGuestByEmail(body.email);
    const guestData = Object.values(result)[0];
    if (guestData) {
        return requestSuccess(guestData);
    } else {
        return requestFailure("Email not found");
    }
}
