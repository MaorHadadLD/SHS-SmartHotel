import axios from 'axios';

const BaseURL = 'http://192.168.1.161:3002/';

export const sendLoginStaff = async (employeeNumber, password) => {
    console.log("sendLoginStaff", employeeNumber, password);
  try {
    console.log("sendLoginStaff try");
    const response = await axios.post(`${BaseURL}staff`, { employeeNumber, password }); 
    // console.log("sendLoginStaff response", response.data);
    return response.data;
  } catch (error) {
    console.error("send login", error);
  }
};


export const getAvialableRooms = async (hotelName) => {
  try {
    console.log("getAvialableRooms", hotelName);
    const response = await axios.post(`${BaseURL}availableRooms`, { hotelName });
    return response.data;
  } catch (error) {
    console.error("getAvialableRooms", error);
  }
}

