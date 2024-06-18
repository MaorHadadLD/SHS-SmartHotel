import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue, push } from 'firebase/database';

const GuestChatScreen = ({ route }) => {
  const { roomNumber } = route.params;
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const chatRef = ref(db, `chats/${roomNumber}`);
    
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.values(data);
        setChatMessages(messages);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [roomNumber]);

  const sendMessage = async () => {
    const db = getDatabase();
    const chatRef = ref(db, `chats/${roomNumber}`);
    await push(chatRef, {
      sender: 'guest',
      message,
      timestamp: Date.now()
    });
    setMessage('');
  };

  const renderMessageItem = ({ item }) => (
    <View style={item.sender === 'guest' ? styles.guestMessage : styles.receptionMessage}>
      <Text>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatMessages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessageItem}
      />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message"
      />
      <Button title="Send" onPress={sendMessage} />
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
});

export default GuestChatScreen;
