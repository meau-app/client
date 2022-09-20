import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../service/database/firebase";
const Chats: React.FC = () => {
  const [messages, setMessages] = useState([]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  useEffect(() => {
    setMessages([]);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email!,
        name: auth?.currentUser?.displayName!,
        avatar: auth?.currentUser?.photoURL!,
      }}
    />
  );
};

export default Chats;
