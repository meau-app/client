import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import Authentication from '../../../service/authentication/authenticate';

import styles from './styles';

export default function Login() {
  const navigation = useNavigation();

  function to(page: string): void {
    let m = {
      name: page,
      key: '',
    };
    navigation.navigate(m);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    Authentication.login(email, password)
      .then(() => {
        to('Home');
      })
      .catch(() => {
        Alert.alert('Email ou senha inválidos');
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        mode="outlined"
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <Button style={styles.buttonMargin} mode="contained" onPress={login}>
        Login
      </Button>
    </ScrollView>
  );
}