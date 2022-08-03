import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { auth } from '../../service/database/firebase'
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import * as SecureStore from 'expo-secure-store';
import styles from './styles';


const firestore = getFirestore();

export default function RegisterUser() {
  const navigation = useNavigation();

  function to(page: string): void {
    navigation.navigate(page);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');

  function register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async value => {
        let token = await value.user?.getIdToken();
        if (token) {
          SecureStore.setItemAsync('user_secure_token', token);
        }

        setDoc(doc(firestore, 'users', email), {
          id: value.user?.email,
          age: birthdate,
          name: name,
          phone: phone,
          username: username,
          city: city,
          state: state,
          address: address,
        });

        to('Home');
      })
      .catch(error => {
        if (error.code === 'auth/weak-password') {
          Alert.alert('Sua senha deve ter pelo menos 6 caracteres');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Email inválido');
        } else {
          Alert.alert('Email em uso, tente outro.' + error.code);
        }
      });
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="Nome"
        onChangeText={setName}
        value={name}
      />

      <TextInput
        mode="outlined"
        placeholder="Idade"
        onChangeText={setBirthdate}
        value={birthdate}
      />

      <TextInput
        mode="outlined"
        placeholder="Endereço"
        onChangeText={setAddress}
        value={address}
      />

      <TextInput
        mode="outlined"
        placeholder="Cidade"
        onChangeText={setCity}
        value={city}
      />

      <TextInput
        mode="outlined"
        placeholder="Estado"
        onChangeText={setState}
        value={state}
      />

      <TextInput
        mode="outlined"
        placeholder="Telefone"
        onChangeText={setPhone}
        value={phone}
      />

      <TextInput
        mode="outlined"
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        mode="outlined"
        placeholder="Nome de usuário"
        onChangeText={setUsername}
        value={username}
      />

      <TextInput
        mode="outlined"
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <Button style={styles.buttonMargin} mode="contained" onPress={register}>
        Cadastrar
      </Button>
    </ScrollView>
  );
}
