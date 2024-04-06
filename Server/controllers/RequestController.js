import {
    checkStatusbyRoomNumberAndHotel, 
    postRoomRequest, 
    getRequestByDepartment, 
    postRequest, 
    updateRequest, 
    deleteRequest, 
    getAllRequstsByRoomNumber,
    getTablesByHotel,
    updateTableStatus
} from '../actions/RequestAction.js';


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
    const result  = await postRequest(body);
    if (result.succees) {
        console.log("-> POST REQUEST SUCCESSFUL \n\t GUEST: ",result);
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
}

export const updateRequestController = async (reqBody) => {
    const result = await updateRequest(reqBody);
    if (result) {
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
}

export const deleteRequestController = async (reqBody) => {
    const result = await deleteRequest(reqBody);
    if (result) {
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
}

export const getRequestsByRoomNumberController = async (reqBody) => {
    const result = await getAllRequstsByRoomNumber(JSON.parse(reqBody.roomNumber));
    if (result) {
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
} 

export const checkStatusReqController = async (reqBody) => {
    // console.log("checkStatusReqController", reqBody);
    const result = await checkStatusbyRoomNumberAndHotel(reqBody.body);
    // console.log("checkStatusReqController result", result);
    if (result) {
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
}

export const getTablesHotelController = async (reqBody) => {
    // console.log("getTablesHotelController", reqBody);
    const result = await getTablesByHotel(reqBody);
    // console.log("getTablesHotelController result", result);
    if (result) {
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
}

export const updateTableStatusController = async (reqBody) => {
    console.log("updateTableStatusController", reqBody);
    const result = await updateTableStatus(reqBody.hotel, reqBody.tableId, reqBody.status);
    // console.log("updateTableStatusController result", result);
    if (result) {
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
}