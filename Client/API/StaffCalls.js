import axios from 'axios';

const BaseURL = 'http://192.168.1.126:3002/';

export const sendLoginStaff = async (employeeNumber, password) => {
    console.log("sendLoginStaff", employeeNumber, password);
  try {
    const response = await axios.post(`${BaseURL}staff`, { employeeNumber, password }); 
    // console.log("sendLoginStaff response", response.data);
    return response.data;
  } catch (error) {
    console.error("send login", error);
  }
};

export const getAvailableRooms = async (hotelName) => {
  try {
    console.log("getAvialableRooms", hotelName);
    const response = await axios.post(`${BaseURL}availableRooms`, { hotelName });
    return response.data;
  } catch (error) {
    console.error("getAvialableRooms", error);
  }
}

export const updateRoomStatusAndGuestRoom = async (guestEmail, selectedRoom, hotel, status) => {
  try {
    const response = await axios.put(`${BaseURL}updateRoomStatusAndGuestRoom`, { guestEmail, selectedRoom, hotel, status });
    return response.data;
  } catch (error) {
    console.error("updateRoomStatusAndGuestRoom", error);
  }
}