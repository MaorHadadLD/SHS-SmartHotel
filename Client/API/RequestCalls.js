import axios from "axios";

const BaseURL = process.env.EXPO_PUBLIC_BASE_URL;

export const sendRoomRequest = async (guest, hotel) => {
    try {
      const response = await axios.post(`${BaseURL}request/guestroom`, { guest, hotel });
      return response.data;
    } catch (error) {
      console.error("sendRoomRequest", error);
    }
  };

  export const sendPostRequest = async ( bodyrequest) => {
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
      return response.data.data;
    } catch (error) {
      console.error("getRequests", error);
    }
  };

export const getAllRequstsByRoomNumberGuest = async (roomNumber) => {
    try {
      const response = await axios.post(`${BaseURL}request/getallbyroomnumber`, { roomNumber });
      return response.data.data;
    } catch (error) {
      console.error("getAllRequstsByRoomNumberGuest", error);
    }
  };

  export const checkStatusReq = async (body) => {
    try {
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

  export const getTablesHotel = async (hotel) => {
    try {
      const response = await axios.post(`${BaseURL}request/gettabeleshotel`,  hotel );
      return response.data.data;
    } catch (error) {
      console.error("getTablesHotel", error);
    }
  }
  export const updateTables = async (hotel, tableId, status) => {
    try {
      const response = await axios.post(`${BaseURL}request/updatetables`, { hotel, tableId, status});
      return response.data.data;
    } catch (error) {
      console.error("updateTables", error);
    }
  }


export const deleteDiningTableRequest = async (reqBody) => {
  try {
    const response = await axios.put(`${BaseURL}request/deletediningtable`,  reqBody);
    return response.data;
  } catch (error) {
    console.error("deleteDiningTableRequest", error);
  }
}