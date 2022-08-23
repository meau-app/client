import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, ScrollView, Alert, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { User } from '../../service/api/models/user';

import styles from './styles';
import { auth } from '../../service/database/firebase';
import Authentication from '../../service/authentication/authenticate';
import { useNavigation } from '@react-navigation/native';

const Profile: React.FC = () => {
  const navigation = useNavigation();

  const [state, setState] = useState(0);
  const [user, setUser] = useState(new User());

  function to(page: string): void {
    let m = {
      name: page,
      key: page,
    };
    navigation.navigate(m);
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

  const request = useCallback(async () => {
    const email = auth.currentUser?.email!;
    try {
      let response = await User.get(email);

      setState(1);
      setUser(response as User);
    } catch (e: any) {
      Alert.alert(('Falha ao carregar dados, ' + e) as string);
    }
  }, []);

  useEffect(() => {
    request();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {state === 0 ? (
        <Text>Carregando...</Text>
      ) : (
        <View>
          <Text>Nome {user.properties.name}</Text>
          <Text>Idade {user.properties.age}</Text>
          <Text>Endereço {user.properties.address}</Text>
          <Text>Cidade {user.properties.city}</Text>
          <Text>Estado {user.properties.state}</Text>
          <Text>Telefone {user.properties.phone}</Text>
          <Text>Email {user.properties.email}</Text>
          <Text>Usuário {user.properties.username}</Text>
        </View>
      )}
      <Button onPress={logout}>Logout</Button>
    </ScrollView>
  );
};

export default Profile;
