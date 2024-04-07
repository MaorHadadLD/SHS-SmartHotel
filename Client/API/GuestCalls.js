import axios from "axios";

const BaseURL = 'http://192.168.1.124:3002/';
// const BaseURL = 'http://192.168.1.175:3002/';


export const sendLoginGuest = async (email, password, selectedHotel) => {
  try {
    const response = await axios.post(`${BaseURL}guestlogin`, { email, password, selectedHotel });
    return response.data;
  } catch (error) {
    console.error("sendLoginGuest", error);
  }
};

export const sendRooomStatus = async (email) => {
  console.log("sendRooomStatus", email);
  try {
    const response = await axios.post(`${BaseURL}roomstatus`, { email});
    return response.data;
  } catch (error) {
    console.error("sendRooomStatus", error);
  }
}

export const getGuestDetails = async (email) => {
  try {
    const response = await axios.post(`${BaseURL}getGuestDetails`, { email });
    return response.data;
  } catch (error) {
    console.error("getGuestDetails", error);
  }
}