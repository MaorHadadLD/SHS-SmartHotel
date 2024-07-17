import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReceptionMainScreen from '../screens/staff/ReceptionMainScreen';
import ReceptionChatScreen from '../screens/staff/ReceptionChatScreen';
import { getDatabase, ref, onValue } from 'firebase/database';

const Tab = createBottomTabNavigator();

const BadgeIcon = ({ name, badgeCount, color, size }) => (
  <View style={{ width: 24, height: 24, margin: 5 }}>
    <Ionicons name={name} size={size} color={color} />
    {badgeCount > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badgeCount}</Text>
      </View>
    )}
  </View>
);

const ReceptionTabNavigator = ({ route }) => {
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const staffData = route.params?.staffData || {};

  useEffect(() => {
    const db = getDatabase();
    const chatRef = ref(db, 'chats');
    const unsubscribeChats = onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const messages = snapshot.val();
        const newMessages = Object.values(messages).filter(
          (message) => message.sender === 'guest'
        ).length;
        setNewMessagesCount(newMessages);
      }
    });

    return () => {
      unsubscribeChats();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let badgeCount = 0;
          if (route.name === 'ReceptionMain') {
            iconName = 'home';
          } else if (route.name === 'ReceptionChat') {
            iconName = 'chatbubbles';
            badgeCount = newMessagesCount;
          }
          return <BadgeIcon name={iconName} badgeCount={badgeCount} color={color} size={size} />;
        },
      })}

    >
      <Tab.Screen
        name="ReceptionMain"
        component={ReceptionMainScreen}
        initialParams={{ staffData }}
        options={{ headerShown: false }}

      />
      <Tab.Screen
        name="ReceptionChat"
        component={ReceptionChatScreen}
        initialParams={{ staffData }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
});

export default ReceptionTabNavigator;
