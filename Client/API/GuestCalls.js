import axios from "axios";

const BaseURL = 'http://192.168.1.161:3002/';

export const sendLoginGuest = async (email, password, selectedHotel) => {
  try {
    const response = await axios.post(`${BaseURL}guestlogin`, { email, password, selectedHotel });
    return response.data;
  } catch (error) {
    console.error("sendLoginGuest", error);
  }
};

