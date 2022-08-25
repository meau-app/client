import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";
import { Pet } from "../service/api/models/pet";
import { Notification } from "../service/api/models/notification";

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

  function to(page: string): void {
    let m = {
      name: page,
      key: page,
    };
    navigation.navigate(m);
  }

  return (
    <Card
      style={styles.card}
      onPress={() => {
        to("");
      }}
    >
      <Card.Title
        title={notification.properties.name}
        subtitle={notification.properties.temper}
      />
      <Button
        style={styles.buttonAccept}
        mode="contained"
        onPress={() => to("")}
      >
        O
      </Button>
      <Button
        style={styles.buttonReject}
        mode="contained"
        onPress={() => to("")}
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
