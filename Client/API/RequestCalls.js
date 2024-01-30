import axios from "axios";

const BaseURL = 'http://192.168.1.175:3002/';

export const sendRoomRequest = async (guest, hotel) => {
    try {
      const response = await axios.post(`${BaseURL}/request/guestroom`, { guest, hotel });
      return response.data;
    } catch (error) {
      console.error("sendRoomRequest", error);
    }
  };