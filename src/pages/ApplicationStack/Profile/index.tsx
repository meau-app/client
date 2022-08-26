import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, ScrollView, Alert, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { User } from '../../../service/api/models/user';

import styles from './styles';
import { auth } from '../../../service/database/firebase';
import Authentication from '../../../service/authentication/authenticate';
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
        <View style={styles.marginView}>
          <Text style={styles.text}>Nome</Text>
          <Text style={styles.textBd}>{user.properties.name}</Text>
          <Text style={styles.text}>Idade</Text>
          <Text style={styles.textBd}>{user.properties.age}</Text>
          <Text style={styles.text}>Endereço</Text>
          <Text style={styles.textBd}>{user.properties.address}</Text>
          <Text style={styles.text}>Cidade</Text>
          <Text style={styles.textBd}>{user.properties.city}</Text>
          <Text style={styles.text}>Estado</Text>
          <Text style={styles.textBd}>{user.properties.state}</Text>
          <Text style={styles.text}>Telefone</Text>
          <Text style={styles.textBd}>{user.properties.phone}</Text>
          <Text style={styles.text}>Email</Text>
          <Text style={styles.textBd}>{user.properties.email}</Text>
          <Text style={styles.text}>Usuario</Text>
          <Text style={styles.textBd}>{user.properties.username}</Text>
        </View>
      )}
      <Button onPress={logout}>Logout</Button>
    </ScrollView>
  );
};

export default Profile;
