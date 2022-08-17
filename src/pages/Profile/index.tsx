import { useMemo, useState } from 'react';
import { View, ScrollView, Alert, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { User } from '../../service/api/models/user';
import { Interface } from '../../service/api/interface';

import styles from './styles';
import { auth } from '../../service/database/firebase';
import Authentication from '../../service/authentication/authenticate';

export default function Profile({ navigation }) {
  let api = new Interface();

  const [state, setState] = useState(0);
  const [user, setUser] = useState(new User());

  function to(page: string): void {
    let m = {
      name: page,
      key: page,
    };
    navigation.navigate(m);
  }

  function request() {
    const email = auth.currentUser?.email!;
    api
      .get(new User(), email)
      .then(v => {
        setState(1);
        setUser(v as User);
      })
      .catch(e => {
        Alert.alert(('Falha ao carregar dados, ' + e) as string);
      });
  }

  function logout() {
    Authentication.logout()
      .then(v => {
        to('Preload');
      })
      .catch(e => {
        Alert.alert('Falha ao sair, tente novamente');
      });
  }

  return (
    request(),
    (
      <ScrollView style={styles.container}>
        {state === 0 ? (
          <Text>Carregando...</Text>
        ) : (
          <View>
            <Text>Nome {user.name} {user.surname}</Text>
            <Text>Idade {user.age}</Text>
            <Text>Endereço {user.address}</Text>
            <Text>Cidade {user.city}</Text>
            <Text>Estado {user.state}</Text>
            <Text>Telefone {user.phone}</Text>
            <Text>Email {user.email}</Text>
            <Text>Usuário {user.username}</Text>
          </View>
        )}
        <Button onPress={logout}>Logout</Button>
      </ScrollView>
    )
  );
}
