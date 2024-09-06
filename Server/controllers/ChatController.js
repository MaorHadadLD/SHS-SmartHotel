import app from '../firebaseConfig.js';
import { getDatabase, ref, get, push, update, remove } from 'firebase/database';

const database = getDatabase(app);

export const getActiveChats = async (req, res) => {
  try {
    const activeChatsRef = ref(database, 'activeChats');
    const snapshot = await get(activeChatsRef);
    console.log(snapshot.val());
    if (snapshot.val()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(200).json({});
    }
  } catch (error) {
    console.error("Error fetching active chats:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  const { hotel, roomNumber } = req.params;
  console.log(`Fetching messages for hotel: ${hotel}, room: ${roomNumber}`);
  try {
    const chatRef = ref(database, `chats/${hotel}/${roomNumber}`);
    const snapshot = await get(chatRef);
    if (snapshot.val()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(200).json({});
    }
  } catch (error) {
    console.error(`Error fetching messages for hotel ${hotel}, room ${roomNumber}:`, error.message);
    res.status(500).json({ error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  const { hotel, roomNumber } = req.params;
  const { sender, message } = req.body;
  console.log(`Sending message to hotel: ${hotel}, room: ${roomNumber}, sender: ${sender}, message: ${message}`);
  try {
    const chatRef = ref(database, `chats/${hotel}/${roomNumber}`);
    await push(chatRef, {
      sender,
      message,
      timestamp: new Date().toISOString(),
    });

    const activeChatsRef = ref(database, `activeChats/${hotel}/${roomNumber}`);
    await update(activeChatsRef, { lastMessage: message, timestamp: new Date().toISOString() });

    res.status(200).json({ message: 'Message sent' });
  } catch (error) {
    console.error(`Error sending message to hotel ${hotel}, room ${roomNumber}:`, error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteChat = async (hotel, roomNumber) => {
  console.log(`Deleting chat for hotel: ${hotel.hotelName}`);
  const hotelref = hotel.hotelName + '_'+ hotel.city;
  console.log(`Deleting chat for hotel: ${hotelref}, room: ${roomNumber}`);
  try {
    const chatRef = ref(database, `chats/${hotelref}/${roomNumber}`);
    await remove(chatRef);

    const activeChatsRef = ref(database, `activeChats/${hotelref}/${roomNumber}`);
    await remove(activeChatsRef);

    return true;
  } catch (error) {
    console.error(`Error deleting chat for hotel ${hotelref}, room ${roomNumber}:`, error.message);
    return false;
  }
}