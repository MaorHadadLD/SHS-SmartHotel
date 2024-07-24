import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Appbar, Badge, IconButton } from 'react-native-paper';
import io from 'socket.io-client';
import { getChatMessages, sendChatMessage } from '../../../API/chatCalls';
import { getDatabase, ref, onValue } from 'firebase/database';
import { LinearGradient } from 'expo-linear-gradient';

const socket = io('http://192.168.1.250:3002/');

const GuestChatScreen = ({ route, navigation }) => {
  const { guestData } = route.params;
  const roomNumber = guestData.roomNumber;
  const hotel = `${guestData.selectedHotel.hotelName}_${guestData.selectedHotel.city}`;
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const database = getDatabase();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await getChatMessages(hotel, roomNumber);
        const messagesArray = messages ? Object.entries(messages).map(([key, value]) => ({ id: key, ...value })) : [];
        setChatMessages(messagesArray);
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    fetchMessages();
    socket.emit('joinRoom', hotel, roomNumber);

    const chatRef = ref(database, `chats/${hotel}/${roomNumber}`);
    const unsubscribe = onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const messages = snapshot.val();
        const messagesArray = Object.entries(messages).map(([key, value]) => ({ id: key, ...value }));
        setChatMessages(messagesArray);
      }
    });

    socket.on('message', (msg) => {
      if (msg.room === roomNumber && msg.hotel === hotel) {
        setChatMessages((prevMessages) => [...prevMessages, { id: Date.now().toString(), ...msg }]);
        setUnreadCount((prevCount) => prevCount + 1);
      }
    });

    return () => {
      unsubscribe();
      socket.off('message');
    };
  }, [roomNumber, hotel]);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      setUnreadCount(0);
    });

    return unsubscribeFocus;
  }, [navigation]);

  const sendMessageHandler = async () => {
    if (!roomNumber || !hotel) return;

    const msg = { room: roomNumber, sender: 'guest', message, hotel, timestamp: new Date().toISOString() };
    try {
      await sendChatMessage(hotel, roomNumber, 'guest', message);
      socket.emit('chatMessage', msg);
      setMessage('');
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  const renderMessageItem = ({ item }) => (
    <View style={item.sender === 'guest' ? styles.guestMessage : styles.receptionMessage}>
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.timestampText}>{new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={`Room ${roomNumber}`} style={{ alignItems: 'center' }} />
        <Badge size={24} visible={unreadCount > 0}>{unreadCount}</Badge>
      </Appbar.Header>
      <LinearGradient colors={['#e0f7fa', '#80deea', '#00acc1']} style={styles.gradient}>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <FlatList
            data={chatMessages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessageItem}
            style={styles.messagesList}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message"
            />
            <IconButton
              icon="send"
              size={24}
              onPress={sendMessageHandler}
              color="#00acc1"
            />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  messagesList: {
    flex: 1,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#f1f1f1',
  },
  guestMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e1ffc7',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  receptionMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  timestampText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
});

export default GuestChatScreen;
