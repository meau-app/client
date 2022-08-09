import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import Authentication from '../../service/authentication/authenticate';

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
    <View contentContainerStyle={styles.container}>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.textInput}
        mode="outlined"
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <View style={styles.buttonMargin}></View>
      <Button style={styles.buttonStyle} mode="contained" onPress={login}>
        Login
      </Button>
    </View>
  );
}
