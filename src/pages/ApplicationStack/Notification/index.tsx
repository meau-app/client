import React, { useCallback, useEffect, useState } from "react";
import { View, Alert, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationItem from "../../../components/NotificationItem";
import { Notification } from "../../../service/api/models/notification";

import styles from "./styles";
import { Text } from "react-native-paper";

interface NotificationProps {}

const NotificationView: React.FC<NotificationProps> = (props) => {
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const [isLoading, setLoading] = useState<Boolean>(false);

  const request = useCallback(async () => {
    setLoading(true);
    try {
      let response = await Notification.all();
      setNotifications(response as Array<Notification>);
    } catch (e: any) {
      Alert.alert(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    request();
  }, [request]);

  return (
    <SafeAreaView>
      <View>
        <FlatList
          ListEmptyComponent={
            isLoading == false && notifications.length == 0 ? (
              <Text>Você não tem notificações</Text>
            ) : (
              <Text>Carrregando...</Text>
            )
          }
          onScrollToTop={request}
          data={notifications}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => <NotificationItem item={item} />}
          style={styles.cards}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationView;
