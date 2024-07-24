import axios from "axios";
// import { BaseURL } from "../config";
const BaseURL = process.env.EXPO_PUBLIC_BASE_URL;

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

export const resendOTP = async (email) => {
  try {
    const response = await axios.post(`${BaseURL}resendOTP`, { email });
    return response.data;
  } catch (error) {
    console.error("resendOTP", error);
  }
}

export const sendCheckOutRequest = async (guest) => {
  try {
    const response = await axios.post(`${BaseURL}checkout`, guest);
    return response.data;
  } catch (error) {
    console.error("sendCheckOut", error);
  }
}