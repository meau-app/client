import React, { useCallback, useEffect, useState } from "react";
import { View, Alert, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatItem from "../../../components/ChatItem";
import { Chat } from "../../../service/api/models/chat";

import styles from "./styles";
import { Text } from "react-native-paper";

interface ChatProps {}

const Chats: React.FC<ChatProps> = (props) => {
  const [chats, setChats] = useState<Array<Chat>>([]);
  const [isLoading, setLoading] = useState<Boolean>(false);

  const request = useCallback(async () => {
    setLoading(true);
    try {
      let response = await Chat.all();
      setChats(response as Array<Chat>);
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
            isLoading == false && chats.length == 0 ? (
              <Text style={styles.center}>Você não tem chats</Text>
            ) : (
              <Text>Carregando...</Text>
            )
          }
          onScrollToTop={request}
          data={chats}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => <ChatItem item={item} />}
          style={styles.cards}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chats;
