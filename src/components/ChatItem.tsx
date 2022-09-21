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

  function to(page: string): void {
    let m = {
      name: page,
      key: page,
    };
    navigation.navigate(m);
  }

  const styles = StyleSheet.create({
    background: {},
    card: {},

    buttonAccept: {
      backgroundColor: "green",
      width: "90%",
      alignSelf: "center",
    },
    buttonReject: {
      backgroundColor: "red",
      width: "90%",
      alignSelf: "center",
      margin: 6,
    },
  });
  const { item: notification } = props;

  async function openChat(notification: Chat): Promise<void> {
    to("Chat");
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
        Abrir
      </Button>
      <Button
        style={styles.buttonReject}
        mode="contained"
        onPress={async () => await cancelChat(notification.properties.id)}
      >
        Excluir
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
