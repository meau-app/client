import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import Authentication from '../../service/authentication/authenticate';

import styles from './styles';

export default function Login() {
  const navigation = useNavigation();

  function to(page: string): void {
    navigation.navigate(page);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    Authentication.authenticate(email, password)
      .then(value => {
        to('Home');
      })
      .catch(error => {
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
