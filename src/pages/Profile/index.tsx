import { useMemo, useState } from 'react';
import { View, ScrollView, Alert, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { User } from '../../service/api/models/user';
import { Interface } from '../../service/api/interface';

import styles from './styles';
import { auth } from '../../service/database/firebase';

export default function Profile() {
  let api = new Interface();

  const [state, setState] = useState(0);

  async function request() {
    try {
      const v = await api.get(new User(), email);
      return v[0] as User;
    } catch (e) {
      Alert.alert(e as string);
    }
  }

  const email = auth.currentUser?.email!;
  const user = useMemo(() => {
    request()
      .then(v => {
        setState(1);
        return v;
      })
      .catch(e => {
        Alert.alert('Falha ao carregar dados, ' + e as string)
      });
  }, [email]);

  return (
    <ScrollView style={styles.container}>
      {state === 0 ? (
        <Text>Carregando...</Text>
      ) : (
        <View>
          <Text>Nome </Text>
          <Text>Idade </Text>
          <Text>Endereço </Text>
          <Text>Cidade </Text>
          <Text>Estado </Text>
          <Text>Telefone </Text>
          <Text>Email </Text>
          <Text>Usuário </Text>
        </View>
      )}
    </ScrollView>
  );
}
