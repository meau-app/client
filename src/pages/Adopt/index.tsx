import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Alert, ScrollView, FlatList } from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Card,
  IconButton,
  Text,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdoptItem from '../../components/AdoptItem';

import { Interface } from '../../service/api/interface';
import { Pet } from '../../service/api/models/pet';

import styles from './styles';

interface AdoptProps {}

const Adopt: React.FC<AdoptProps> = props => {
  let api = new Interface();

  const navigation = useNavigation();

  const [pets, setPets] = useState<Array<Pet>>([]);

  function to(page: string): void {
    let m = {
      name: page,
      key: page,
    };
    navigation.navigate(m);
  }

  const request = useCallback(async () => {
    try {
      let response = await api.get(new Pet());
      setPets(response as Array<Pet>);
    } catch (e: any) {
      Alert.alert(e);
    }
  }, []);

  useEffect(() => {
    request();
  }, [request]);

  return (
    <SafeAreaView>
      <Appbar.Header style={styles.bar}>
        <Appbar.Content title="MEAU" titleStyle={styles.title} />
        <Appbar.Action
          icon="plus"
          style={styles.bar}
          onPress={() => {
            to('RegisterAnimal');
          }}
        />
      </Appbar.Header>
      <View>
        <FlatList
          ListEmptyComponent={<Text>Carregando...</Text>}
          onScrollToTop={request}
          data={pets}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => <AdoptItem item={item} />}
          style={styles.cards}
        />
      </View>
    </SafeAreaView>
  );
};

export default Adopt;
