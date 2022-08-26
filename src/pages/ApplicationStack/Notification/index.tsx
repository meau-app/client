import React, { useCallback, useEffect, useState } from 'react';
import { View, Alert, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationItem from '../../../components/NotificationItem';
import { Notification } from '../../../service/api/models/notification';

import styles from './styles';
import {
  Text,
} from 'react-native-paper';

interface NotificationProps {}

const NotificationView: React.FC<NotificationProps> = props => {
  const [notifications, setNotifications] = useState<Array<Notification>>([]);

  const request = useCallback(async () => {
    try {
      let response = await Notification.all();
      setNotifications(response as Array<Notification>);
    } catch (e: any) {
      Alert.alert(e);
    }
  }, []);

  useEffect(() => {
    request();
  }, [request]);

  return (
    <SafeAreaView>
      <View>
        <FlatList
          ListEmptyComponent={<Text>Carregando...</Text>}
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
