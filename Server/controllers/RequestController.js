import {postRoomRequest, getRequestByDepartment, postRequest} from '../actions/RequestAction.js';


export const requestSuccess = (data) => ({success: true, data})
export const requestFailure = (data) => ({ success: false, data });

//* GET REQUEST CONTROLLER *//
export const getRequestsByDepartmentController = async (reqBody) => {
    console.log("getRequestsByDepartmentController", reqBody);
    const result = await getRequestByDepartment(reqBody );
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

export const postRequestController = async (body) => {
    console.log("postRequestController", body);
    const result  = await postRequest(body);
    console.log("postRequestController", result);
    if (result.succees) {
        console.log("-> POST REQUEST SUCCESSFUL \n\t GUEST: ",result);
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
}