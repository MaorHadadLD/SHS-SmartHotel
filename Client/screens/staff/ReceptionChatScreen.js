import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue, push } from 'firebase/database';

const ReceptionChatScreen = ({ route, navigation }) => {
  const { roomNumber } = route.params || {}; // Ensure roomNumber is extracted properly
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (!roomNumber) return; // Check if roomNumber is available

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
    if (!roomNumber) return; // Ensure roomNumber is available

    const db = getDatabase();
    const chatRef = ref(db, `chats/${roomNumber}`);
    await push(chatRef, {
      sender: 'reception',
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
      {roomNumber ? (
        <>
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
        </>
      ) : (
        <Text style={styles.errorText}>No room selected for chat.</Text>
      )}
      <Button title="Back to Requests" onPress={() => navigation.goBack()} />
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

export default ReceptionChatScreen;
