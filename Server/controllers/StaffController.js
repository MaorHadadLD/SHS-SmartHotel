import  { StaffLogin, getAvailableRooms, updateRoomStatus, getMealByHotel, updateMealByHotel,addEmployee, deleteEmployee , fetchFeedbackForHotel} from '../actions/StaffAction.js';
import { updateGuestRoomNumber } from '../actions/GuestAction.js';
import { deleteRoomRequest } from '../actions/RequestAction.js';
import { sendEmailRoom } from '../routes/MailRoute.js';

export const requestSuccess = (data) => ({success: true, data})
export const requestFailure = (data) => ({ success: false, data });


export const StaffLoginController = async (req, res) => {
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

export const updateRoomController = async (req, res) => {
    const guestEmail = req.guestEmail;
    const selectedRoom = req.selectedRoom;
    const hotel = req.hotel;
    const status = req.status;
    const updateReq = await deleteRoomRequest(guestEmail, 'roomRequests');
    const updateRoom = await updateRoomStatus(hotel, selectedRoom, status);
    const updateGuest = await updateGuestRoomNumber(guestEmail, selectedRoom);
    if (updateReq.success && updateRoom.success && updateGuest) {
        await sendEmailRoom(guestEmail, selectedRoom);
        return requestSuccess(updateReq.data, updateRoom.data);
    }
    else {
        return requestFailure("Room Not Assigned");
    }
}

export const getMealsHotelController = async (req, res) => {
    const { hotel } = req;
    const result = await getMealByHotel(hotel);
    if (result !== null) {
        return requestSuccess(result);
    }
    else {
        return requestFailure(result);
    }
}

export const updateMealHotelController = async (req, res) => {
    const { hotel, meals } = req;
    const result = await updateMealByHotel(hotel, meals);
    
    if (result !== null) {
        return requestSuccess(result);
    }
    else {
        return requestFailure(result);
    }
}

export const addEmployeeController = async (req, res) => {
    const employeeData = req;
    const result = await addEmployee(employeeData);
    if (result.success) {
        return requestSuccess(result);
    }
    else {
        return requestFailure(result);
    }
}

export const deleteEmployeeController = async (req, res) => {
    const employeeNumber  = req.employeeNumber;
    const result = await deleteEmployee(employeeNumber);
    if (result.success) {
        return requestSuccess(result);
    }
    else {
        return requestFailure(result);
    }
}

export const getFeedBackController = async (req, res) => {
    console.log("getFeedBackController", req);
  
    const result = await fetchFeedbackForHotel(req.hotelName, req.city);
    if (result !== null) {
        return requestSuccess(result);
    }
    else {
        return requestFailure(result);
    }
}