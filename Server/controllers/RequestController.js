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

    const result = await getRequestByDepartment(reqBody );
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
    const result = await checkStatusbyRoomNumberAndHotel(reqBody.body);
    if (result) {
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
}

export const getTablesHotelController = async (reqBody) => {
    const result = await getTablesByHotel(reqBody);
    if (result) {
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
}

export const updateTableStatusController = async (reqBody) => {
    const result = await updateTableStatus(reqBody.hotel, reqBody.tableId, reqBody.status);
    if (result) {
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
}

export const deleteDiningTableController = async (reqBody) => {
    const result = await deleteRequest({id: reqBody.id, type: reqBody.type});
    const result2 = await updateTableStatus(reqBody.hotel, reqBody.tableId, 'available');
    if (result) {
        return requestSuccess(result);
    }
    else {
        return requestFailure("No Requests");
    }
}