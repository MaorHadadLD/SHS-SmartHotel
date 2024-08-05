import axios from 'axios';
// import { BaseURL } from '../config';
const BaseURL = process.env.EXPO_PUBLIC_BASE_URL;

export const sendLoginStaff = async (employeeNumber, password) => {
  try {
    const response = await axios.post(`${BaseURL}staff`, { employeeNumber, password }); 
    return response.data;
  } catch (error) {
    console.error("send login", error);
  }
};

export const getAvailableRooms = async (hotelName) => {
  try {
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

export const getMealsHotel = async (hotel) => {
  try {
    const response = await axios.post(`${BaseURL}getMealsHotel`, { hotel });
    return response.data.data;
  } catch (error) {
    console.error("getMealsHotel", error);
  }
}

export const updateMealHotel = async (hotel, meal) => {
  try {
    const response = await axios.put(`${BaseURL}updateMealHotel`,  hotel, meal );
    return response.data;
  } catch (error) {
    console.error("updateMealHotel", error);
  }

}

export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${BaseURL}addEmployee`, employeeData);
    return response.data;
  } catch (error) {
    console.error("addEmployee", error);
  }
}

export const deleteEmployee = async (employeeNumber) => {
  try {
    const response = await axios.post(`${BaseURL}deleteEmployee`,  {employeeNumber});
    return response.data;
  } catch (error) {
    console.error("deleteEmployee", error);
  }
}

export const fetchFeedbackForHotel = async (hotelName, city) => {
  try {
    const response = await axios.post(`${BaseURL}fetchFeedbackForHotel`, { hotelName, city });
    return response.data;
  } catch (error) {
    console.error("fetchFeedbackForHotel", error);
  }
}