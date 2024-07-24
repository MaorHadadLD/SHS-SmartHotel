import axios from 'axios';

const BaseURL = process.env.EXPO_PUBLIC_BASE_URL;
export const getChatMessages = async (hotel, roomNumber) => {
  try {
    const response = await axios.get(`${BaseURL}chats/${hotel}/${roomNumber}`);
    return response.data;
  } catch (error) {
    console.error("getChatMessages", error.message);
    throw error;
  }
};

export const sendChatMessage = async (hotel, roomNumber, sender, message) => {
  try {
    const response = await axios.post(`${BaseURL}chats/${hotel}/${roomNumber}`, { sender, message });
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
