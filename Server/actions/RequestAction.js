import firebaseApp from '../firebaseConfig.js';
import { getDatabase, ref, set, push, query, orderByChild, equalTo, get } from 'firebase/database';
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

export const updateRequest = async (guest) => {}


export const deleteRequest = async (guestEmail, type) => {
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

export const getRequestByDpartment = async (reqBody) => {
    const requestsRef = ref(db, `${reqBody.type, reqBody.hotel.hotelName, reqBody.hotel.city}`);
    console.log("getRequestByDpartment", requestsRef);
    const snapshot = await get(requestsRef);
    console.log("getRequestByDpartment", snapshot);
    const data = snapshot.val();
    console.log("getRequestByDpartment", data);
    if (data) {
        console.log("getRequestByDpartment", hotel.hotelName, hotel.city, data);
        const requestList = Object.values(data)
          .filter(request =>request.hotel.hotelName === reqBody.hotel.hotelName && request.hotel.city === reqBody.hotel.city)
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

export const postRequest = async (body) => {
    try {
        const requestRef = ref(db, `requests/${body.type}/`);
        console.log("postRequest", requestRef);
        const newRef = push(requestRef);
        set(newRef,{
            status: "waiting",
            notice: body.request,
    });
        return {succees: true};
    }
    catch (error) {
        console.error("postRequest", error);
        return {succees: false};
    }
}