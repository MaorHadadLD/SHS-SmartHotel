import  { StaffLogin, getAvailableRooms } from '../actions/StaffAction.js';

export const requestSuccess = (data) => ({success: true, data})
export const requestFailure = (data) => ({ success: false, data });


export const StaffLoginController = async (req, res) => {
    // console.log("StaffLoginController", req);
    const { employeeNumber, password } = req;
    const result = await StaffLogin(employeeNumber, password);
    if (result.sucess) {

        console.log("=> STAFF LOGIN SUCCESS \n\t",result.data.employeeName,"\t", result.data.employeeNumber );
        return requestSuccess(result.data);
       
    }
    else {
        return requestFailure(result.data);
    }
}

export const availableRooms = async (req, res) => {
    const { hotelName } = req;
    const result = await getAvailableRooms(hotelName);
    if (result !== null ) {
        console.log("=> AVIALABLE ROOMS SUCCESS \n\t",result);
        return requestSuccess(result);
    }
    else {
        return requestFailure(result);
    }
}