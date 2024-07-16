import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getChatMessages, sendChatMessage } from '../../../API/chatCalls';

const GuestChatScreen = ({ route }) => {
  const { roomNumber } = route.params.guestData || {};
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [messagesArray, setMessagesArray] = useState([]);
  const database = getDatabase();

  useEffect(() => {
    if (!roomNumber) {
      alert('You do not have an assigned room.');
      return;
    }

    const fetchMessages = async () => {
      try {
        const messages = await getChatMessages(roomNumber);
        const messagesArray = messages ? Object.entries(messages).map(([key, value]) => ({ id: key, ...value })) : [];
        setChatMessages(messagesArray);
        console.log("Fetched messages:", messagesArray);
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    fetchMessages();
    
    const chatRef = ref(database, `chats/${roomNumber}`);
    const unsubscribe = onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const messages = snapshot.val();
        setMessagesArray(Object.entries(messages).map(([key, value]) => ({ id: key, ...value })));
        setChatMessages(messagesArray);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [roomNumber, messagesArray]);

  const sendMessageHandler = async () => {
    if (!roomNumber) return;

    const msg = { room: roomNumber, sender: 'guest', message };
    try {
      await sendChatMessage(roomNumber, 'guest', message);
      setMessage('');
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  const renderMessageItem = ({ item }) => (
    <View style={item.sender === 'guest' ? styles.guestMessage : styles.receptionMessage}>
      <Text>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {roomNumber ? (
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
        <Text style={styles.errorText}>You do not have an assigned room.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default GuestChatScreen;
