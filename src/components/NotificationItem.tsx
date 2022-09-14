import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";
import { Pet } from "../service/api/models/pet";
import { Notification } from "../service/api/models/notification";
import {
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, firestore } from "../service/database/firebase";

interface NotificationItemProps {
  item: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = (props) => {
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

  async function acceptAdoption(notification: Notification): Promise<void> {
    await setDoc(doc(firestore, "adoptions", notification.properties.id), {
      answered: true,
      pet_id: notification.properties.pet,
      old_proprietary: notification.properties.proprietary_email,
      new_proprietary: notification.properties.requestor_email,
    });
    await updateDoc(
      doc(firestore, "users", notification.properties.requestor_email),
      {
        Pets: arrayUnion(notification.properties.pet),
      }
    );
    try {
      await updateDoc(
        doc(firestore, "users", notification.properties.proprietary_email),
        {
          Pets: arrayRemove(notification.properties.pet),
        }
      );
    } catch (e) {}
    await deleteDoc(
      doc(firestore, "notifications", notification.properties.id)
    );
  }

  async function rejectAdoption(notificationId: string): Promise<void> {
    //HEHE
    await deleteDoc(doc(firestore, "notifications", notificationId));
  }

  return (
    <Card style={styles.card}>
      <Card.Title
        title={notification.properties.pet}
        subtitle={notification.properties.proprietary_email}
      />
      <Button
        style={styles.buttonAccept}
        mode="contained"
        onPress={async () => await acceptAdoption(notification)}
      >
        O
      </Button>
      <Button
        style={styles.buttonReject}
        mode="contained"
        onPress={async () => await rejectAdoption(notification.properties.id)}
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

export default NotificationItem;
