import axios from "axios";

const BaseURL = 'http://192.168.1.126:3002/';

export const sendRoomRequest = async (guest, hotel) => {
    try {
      const response = await axios.post(`${BaseURL}request/guestroom`, { guest, hotel });
      return response.data;
    } catch (error) {
      console.error("sendRoomRequest", error);
    }
  };

  export const sendPostRequest = async (request, type) => {
    try {
      const response = await axios.post(`${BaseURL}request/post`, {request, type});
      return response.data;
    } catch (error) {
      console.error("sendRoomCleaningRequest", error);
    }
  }

  export const getRequests = async (hotel, type) => {
    try {
      const response = await axios.post(`${BaseURL}request/get`, { hotel, type });
      return response.data;
    } catch (error) {
      console.error("getRequests", error);
    }
  };


  export const checkStatusReq = async (roomNumber, type) => {
    try {
      const response = await axios.post(`${BaseURL}request/checkstatus`, { roomNumber, type });
      return response.data;
    } catch (error) {
      console.error("checkStatusReq", error);
    }
  }


  