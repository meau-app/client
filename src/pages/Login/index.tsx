import { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { auth } from '../../service/database/firebase';

import styles from './styles';

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (credential) => {
        const user = credential.user?.email;
        const token = await credential.user?.getIdToken(true);

        if (token) {
          SecureStore.setItemAsync('secure_token', token);
          navigation.navigate('Home');
        } else {
          // TODO: handle error
        }
      })
      .catch((error) => {
        const code = error.code;
        const message = error.message;

        Alert.alert(
          'login failed with code ' + code + ' and reason ' + message
        );
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} />

      <Text>Senha</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry={true}
        value={password}
      />
      <Button style={styles.button} title="Login" onPress={login} />
    </ScrollView>
  );
}
