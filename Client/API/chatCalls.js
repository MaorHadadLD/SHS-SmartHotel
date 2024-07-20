import axios from 'axios';

const BaseURL = 'https://shs-smarthotel.onrender.com/';
// const BaseURL = 'http://192.168.183.198:3002/';

export const getChatMessages = async (roomNumber) => {
  try {
    const response = await axios.get(`${BaseURL}chats/${roomNumber}`);
    return response.data;
  } catch (error) {
    console.error("getChatMessages", error.message);
    throw error;
  }
};

export const sendChatMessage = async (roomNumber, sender, message) => {
  try {
    const response = await axios.post(`${BaseURL}chats/${roomNumber}`, { sender, message });
    return response.data;
  } catch (error) {
    console.error("sendChatMessage", error.message);
    throw error;
  }
};

export const getActiveChats = async () => {
  try {
    const response = await axios.get(`${BaseURL}chats/active`);
    return response.data;
  } catch (error) {
    console.error("getActiveChats", error.message);
    throw error;
  }
};


