import axios from "axios";

const BaseURL = 'http://192.168.1.124:3002/';
// const BaseURL = 'http://192.168.1.186:3002/';


export const sendRoomRequest = async (guest, hotel) => {
    try {
      const response = await axios.post(`${BaseURL}request/guestroom`, { guest, hotel });
      return response.data;
    } catch (error) {
      console.error("sendRoomRequest", error);
    }
  };

  export const sendPostRequest = async ( bodyrequest) => {
    console.log('sendPostRequest bodyrequestTest1:', bodyrequest);
    try {
      const response = await axios.post(`${BaseURL}request/post`, { bodyrequest });
      return response.data;
    } catch (error) {
      console.error("sendRoomCleaningRequest", error);
    }
  }

  export const getRequests = async (hotel, type) => {
    try {
      const response = await axios.post(`${BaseURL}request/get`, { hotel, type });
      console.log("getRequests", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("getRequests", error);
    }
  };

export const getAllRequstsByRoomNumberGuest = async (roomNumber) => {
    try {
      console.log("getAllRequstsByRoomNumberGuest", roomNumber);
      const response = await axios.post(`${BaseURL}request/getallbyroomnumber`, { roomNumber });
      return response.data.data;
    } catch (error) {
      console.error("getAllRequstsByRoomNumberGuest", error);
    }
  };

  export const checkStatusReq = async (body) => {
    try {
      console.log("checkStatusReq:::body:", body);
      const response = await axios.post(`${BaseURL}request/status`, {body});
      return response.data.data;
    } catch (error) {
      console.error("checkStatusReq::::", error);
    }
  }


  export const sendUpdateRequest = async (id, newStatus ,type) => {
    try {
      const response = await axios.put(`${BaseURL}request/update`, { id, newStatus, type });
      return response.data;
    } catch (error) {
      console.error("sendUpdateRequest", error);
    }
  }

  export const sendDeleteRequest = async (id ,type) => {
    try {
      const response = await axios.put(`${BaseURL}request/delete`, { id, type});
      return response.data;
    } catch (error) {
      console.error("sendDeleteRequest", error);
    }
  }