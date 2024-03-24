import firebaseApp from '../firebaseConfig.js';
import { getDatabase, ref, set, push, query, orderByChild, equalTo, get, update } from 'firebase/database';
import { updateGuestRoomNumber } from './GuestAction.js';



const db = getDatabase(firebaseApp);
export const getRequestsRoomByHotel = async (hotel) => {
    const requestsRef = ref(db, 'roomRequests');
    const snapshot = await get(requestsRef);
      const data = snapshot.val();
      if (data) {
        const requestList = Object.values(data)
          .filter(request => request.hotel.hotelName === hotel.hotelName && request.hotel.city === hotel.city)
          .map(request => ({
            checkInDate: request.checkInDate,
            checkOutDate: request.checkOutDate,
            guestEmail: request.guestEmail,
            guestName: request.guestName,
            hotel: request.hotel,
            status: request.status,
          }));
          return {success: true, data: requestList};
        }
        else {
            return {success: false, data: "No request found"};
        }
    }   
export const postRoomRequest = async (request) => {
    // console.log("postRoomRequest", request);
    try {
        const requestRef = ref(db, `roomRequests/`);
        const newRef = push(requestRef);
        set(newRef, {
            guestEmail: request.guest.email,
            guestName: request.guest.firstname + " " + request.guest.lastname,
            hotel:{
                hotelName: request.guest.selectedHotel.hotelName,
                city: request.guest.selectedHotel.city,
            
            },
            checkInDate: request.guest.checkIn,        
            checkOutDate: request.guest.checkOut,
            status: "waiting",
        });
        const res = await updateGuestRoomNumber(request.guest.email, "Your request for your room has been sent to the hotel reception");
        console.log("postRoomRequestreslut", res);
        return {succees: true, guestEmail: request.guest.email};
    }
    catch (error) {
        console.error("postRoomRequest", error);
        return {succees: false};
    }
}




export const deleteRoomRequest = async (guestEmail, type) => {
    try {
        const requestRef = ref(db, `${type}`);
        const reqQuery = query(requestRef, orderByChild('guestEmail'), equalTo(guestEmail));
        set(reqQuery, null);
        return {success: true};
    }
    catch (error) {
        console.error("deleteRequest", error);
        return {success: false};
    }
}

// get the request by department and by hotel 
export const getRequestByDepartment = async (reqBody) => {
    console.log("getRequestByDpartment", reqBody);
    const requestsRef = ref(db, `requests/${reqBody.type}`);
    const snapshot = await get(requestsRef);
    const data = snapshot.val();
    if (data) {
        const requestList = Object.values(data)
          .filter(request =>request.hotel.hotelName === reqBody.hotel.hotelName && request.hotel.city === reqBody.hotel.city)
          .map(request => ({
            id: request.id,
            notice: request.notice,
            roomNumber: request.roomNumber,
            hotel: request.hotel,
            status: request.status,
          }));
          console.log("getRequestByDpartment159",  requestList);
          return {success: true, data: requestList};
        }
        else {
            return {success: false, data: "No request found"};
        }
    }

    export const getAllRequstsByRoomNumber = async (guestData) => {
        console.log("getAllRequstsByRoomNumber", guestData.roomNumber);
        try {
            const requestList = [];
            
            // Call getRequestByDepartment for each department type
            const departmentTypes = ["CleaningRoom", "PoolBar", "RoomService"]; // Add more department types if needed
            for (const type of departmentTypes) {
                const res = await getRequestByDepartment({ type, hotel: guestData.selectedHotel });
                if (res.success) {
                    requestList.push(...res.data); // Add the requests from this department to the request list
                } else {
                    console.error(`Failed to fetch requests for department ${type}`);
                }
            }
            
            // Now requestList contains requests from all departments
            console.log("All requests:", requestList);
            
            // Filter requestList by room number
            const filteredRequests = requestList.filter(request => request.roomNumber === guestData.roomNumber);
            console.log("Filtered requests:", filteredRequests);
            
            return { success: true, data: filteredRequests };
        } catch (error) {
            console.error("getAllRequstsByRoomNumber", error);
            return { success: false };
        }
    }
    

export const postRequest = async (body) => {
    try {
        const requestRef = ref(db, `requests/${body.bodyrequest.type}/`);
        console.log("postRequestAction", body);
        const newRef = push(requestRef);
        if(body.bodyrequest.type === "Dinning"){
            set(newRef,{
                id: newRef.key,
                numberOfDiners: body.bodyrequest.numberOfDiners,
                arrivalTime : body.bodyrequest.arrivalTime,
                roomNumber: body.bodyrequest.roomNumber,
                hotel: body.bodyrequest.selectedHotel,
                timestamp: new Date().toISOString()
                // status: "waiting",
                // notice: body.bodyrequest.request,
        });
        } else {
            set(newRef,{
                id: newRef.key,
                status: "waiting",
                notice: body.bodyrequest.request,
                hotel: body.bodyrequest.selectedHotel,
                roomNumber: body.bodyrequest.roomNumber,
            });
        }
        return {succees: true};
    }
    catch (error) {
        console.error("postRequest", error);
        return {succees: false};
    }
}

export const updateRequest = async (body) => {
    console.log("updateRequest", body);
    try {
        const requestRef = ref(db, `requests/${body.type}/${body.id}`);
        update(requestRef, {
            status: body.newStatus,
        });
        return {success: true};
    }
    catch (error) {
        console.error("updateRequest", error);
        return {success: false};
    }


}

export const deleteRequest = async (body) => {
    console.log("deleteRequest", body);
    try {
        const requestRef = ref(db, `requests/${body.type}/${body.id}`);
        set(requestRef, null);
        return {success: true};
    }
    catch (error) {
        console.error("deleteRequest", error);
        return {success: false};
    
    }
}

