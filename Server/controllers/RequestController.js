import {postRoomRequest} from '../actions/RequestAction.js';

export const requestSuccess = (data) => ({success: true, data})
export const requestFailure = (data) => ({ success: false, data });

export const getRequestsByDepartmentController = async (department) => {
    console.log("getRequestsByDepartmentController", department);
    const result = await getRequestByDpartment(department);
    console.log("getRequestsByDepartmentController result", result);
    if (result) {
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
}
//* POST REQUEST CONTROLLER *// 
export const postRoomRequestController = async (body) => {
    const result  = await postRoomRequest(body);
    if (result.succees) {
        console.log("-> POST ROOM REQUEST SUCCESSFUL \n\t GUEST: ",result.guestEmail);
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
}