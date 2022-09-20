import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";
import { Pet } from "../service/api/models/pet";
import { Chat } from "../service/api/models/chat";
import {
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, firestore } from "../service/database/firebase";

interface ChatItemProps {
  item: Chat;
}

const ChatItem: React.FC<ChatItemProps> = (props) => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    background: {},
    card: {},

    buttonAccept: {
      backgroundColor: "green",
      width: 30,
      margin: 6,
    },
    buttonReject: {
      backgroundColor: "red",
      width: 30,
      margin: 6,
    },
  });
  const { item: notification } = props;

  async function openChat(notification: Chat): Promise<void> {
    //Go to chat
  }

  async function cancelChat(notificationId: string): Promise<void> {
    await deleteDoc(doc(firestore, "chats", notificationId));
  }

  return (
    <Card style={styles.card}>
      <Card.Title
        title={notification.properties.from}
        subtitle={notification.properties.msg}
      />
      <Button
        style={styles.buttonAccept}
        mode="contained"
        onPress={async () => await openChat(notification)}
      >
        O
      </Button>
      <Button
        style={styles.buttonReject}
        mode="contained"
        onPress={async () => await cancelChat(notification.properties.id)}
      >
        X
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
  },
});

export default ChatItem;
