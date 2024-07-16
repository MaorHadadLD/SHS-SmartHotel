import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import io from 'socket.io-client';
import { getChatMessages, sendChatMessage, getActiveChats } from '../../API/chatCalls';
import { getDatabase, ref, onValue } from 'firebase/database'; // Import Firebase database methods

const socket = io('http://192.168.1.124:3002');

const ReceptionChatScreen = () => {
  const [activeChats, setActiveChats] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messagesArray, setMessagesArray] = useState([]);
  const [message, setMessage] = useState('');
  const database = getDatabase(); // Initialize Firebase database

  useEffect(() => {
    const fetchActiveChats = async () => {
      try {
        const chats = await getActiveChats();
        const chatList = chats ? Object.entries(chats).map(([roomNumber, value]) => ({ roomNumber, ...value })) : [];
        setActiveChats(chatList);
      } catch (error) {
        console.error("Error fetching active chats:", error.message);
      }
    };

    fetchActiveChats();

    socket.on('message', (msg) => {
      if (msg.room === selectedRoom) {
        setChatMessages((prevMessages) => [...prevMessages, { id: Date.now().toString(), ...msg }]);
      } else {
        Alert.alert("New message", `New message in room ${msg.room}`);
      }
    });

    return () => {
      socket.off('message');
    };
  }, [selectedRoom]);

  useEffect(() => {
    if (selectedRoom) {
      const fetchMessages = async () => {
        try {
          const messages = await getChatMessages(selectedRoom);
          setMessagesArray(messages ? Object.entries(messages).map(([key, value]) => ({ id: key, ...value })) : []);
          setChatMessages(messagesArray);
          console.log("Fetched messages:", messagesArray);
        } catch (error) {
          console.error("Error fetching messages:", error.message);
        }
      };

      fetchMessages();
      socket.emit('joinRoom', selectedRoom);

      const chatRef = ref(database, `chats/${selectedRoom}`);
      const unsubscribe = onValue(chatRef, (snapshot) => {
        if (snapshot.exists()) {
          const messages = snapshot.val();
          const messagesArray = Object.entries(messages).map(([key, value]) => ({ id: key, ...value }));
          setChatMessages(messagesArray);
        }
      });

      return () => {
        unsubscribe(); // Clean up the listener on component unmount
      };
    }
  }, [selectedRoom, messagesArray]);

  const sendMessageHandler = async () => {
    if (!selectedRoom) return;

    const msg = { room: selectedRoom, sender: 'reception', message };
    try {
      await sendChatMessage(selectedRoom, 'reception', message);
      socket.emit('chatMessage', msg);
      setMessage('');
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedRoom(item.roomNumber)}>
      <View style={styles.chatItem}>
        <Text>Room {item.roomNumber}</Text>
        <Text>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }) => (
    <View style={item.sender === 'guest' ? styles.guestMessage : styles.receptionMessage}>
      <Text>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.chatListContainer}>
        <FlatList
          data={activeChats}
          keyExtractor={(item) => item.roomNumber}
          renderItem={renderChatItem}
        />
      </View>
      <View style={styles.chatContainer}>
        {selectedRoom ? (
          <>
            <FlatList
              data={chatMessages}
              keyExtractor={(item) => item.id}
              renderItem={renderMessageItem}
            />
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message"
            />
            <Button title="Send" onPress={sendMessageHandler} />
          </>
        ) : (
          <Text style={styles.infoText}>Select a chat to start messaging.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  chatListContainer: {
    width: '30%',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  chatContainer: {
    width: '70%',
    paddingLeft: 10,
  },
  chatItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  guestMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e1ffc7',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  receptionMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
  },
});

export default ReceptionChatScreen;
