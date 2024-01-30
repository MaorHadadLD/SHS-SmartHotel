import {getGuestByEmail, updateGuestSelectesHotel} from '../actions/GuestAction.js';    

export const requestSuccess = (data) => ({success: true, data})
export const requestFailure = (data) => ({ success: false, data });

export const LogInGuestController = async (body) => {
    console.log("LogInGuestController", body.email, body.password);
    const result = await getGuestByEmail(body.email);
    console.log("LogInGuestController result", result);
    
    if (result) {
        const guestData = Object.values(result)[0];
        console.log("LogInGuestController guestData", guestData);
        if (guestData.otp === body.password){
            await updateGuestSelectesHotel(guestData, body.selectedHotel.selectedHotel.hotelName, body.selectedHotel.selectedHotel.city);
            return requestSuccess(guestData);

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


