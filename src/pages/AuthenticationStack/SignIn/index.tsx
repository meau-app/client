import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState, useContext } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { AuthContext } from '../../../../App';
import Authentication from '../../../service/authentication/authenticate';

import styles from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AuthContext);

  function to(page: string): void {
    let m = {
      name: page,
      key: page,
    };
    navigation.navigate(m);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      let result = await Authentication.login(email, password);
      if (result) {
        dispatch('SIGN_IN');
        to('Preload');
      } else {
        Alert.alert('Falha ao realizar login');
      }
    } catch (e) {
      Alert.alert('Email ou senha inválidos');
    }
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
};

export default SignIn;
