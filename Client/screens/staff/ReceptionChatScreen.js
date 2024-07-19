import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Appbar, Banner } from 'react-native-paper';
import io from 'socket.io-client';
import { getChatMessages, sendChatMessage, getActiveChats } from '../../API/chatCalls';
import { getDatabase, ref, onValue } from 'firebase/database';

const socket = io('https://shs-smarthotel.onrender.com/');

const ReceptionChatScreen = () => {
  const [activeChats, setActiveChats] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [bannerVisible, setBannerVisible] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState({});
  const database = getDatabase();

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
        setUnreadMessages((prevUnread) => ({
          ...prevUnread,
          [msg.room]: (prevUnread[msg.room] || 0) + 1,
        }));
        setBannerVisible(true);
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
          const messagesArray = messages ? Object.entries(messages).map(([key, value]) => ({ id: key, ...value })) : [];
          setChatMessages(messagesArray);
          setUnreadMessages((prevUnread) => ({
            ...prevUnread,
            [selectedRoom]: 0,
          }));
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
        unsubscribe();
      };
    }
  }, [selectedRoom]);

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
        <Text style={styles.chatItemText}>Room {item.roomNumber}</Text>
        <Text style={styles.chatItemLastMessage}>{item.lastMessage}</Text>
        {unreadMessages[item.roomNumber] > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>{unreadMessages[item.roomNumber]}</Text>
          </View>
        )}
        {bannerVisible && <Banner visible={bannerVisible} icon="message" actions={[{ label: 'Dismiss', onPress: () => setBannerVisible(false) }]}>New message in this room</Banner>}
      </View>
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }) => (
    <View style={item.sender === 'guest' ? styles.guestMessage : styles.receptionMessage}>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" />
      <Appbar.Header>
        <Appbar.Content title="Reception Chat" />
      </Appbar.Header>
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
                style={styles.messagesList}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Type your message"
                />
                <TouchableOpacity onPress={sendMessageHandler} style={styles.sendButton}>
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Select a chat to start messaging</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  chatListContainer: {
    width: '30%',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    backgroundColor: '#fff',
  },
  chatContainer: {
    width: '70%',
    paddingLeft: 10,
  },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  chatItemText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatItemLastMessage: {
    color: '#888',
    marginTop: 5,
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
    borderRadius: 10,
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
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#888',
  },
  unreadBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 12,
    padding: 5,
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReceptionChatScreen;
