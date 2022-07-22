import { useState } from 'react';
import { ScrollView, Text, Button, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../service/database/firebase';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import * as SecureStore from 'expo-secure-store';
import styles from './styles';

const firestore = getFirestore();

export default function RegisterUser() {
  const navigation = useNavigation();

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
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        Alert.alert('Usuário criado: ' + value.user?.email);
        value.user
          ?.getIdToken()
          .then((value) => SecureStore.setItemAsync('secure_token', value));
        setDoc(doc(firestore, 'users', email), {
          userId: value.user?.uid,
          age: birthdate,
          name: name,
          phone: phone,
          username: username,
          city: city,
          state: state,
          address: address,
        });

        navigation.navigate('Adopt');
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          Alert.alert('Sua senha deve ter pelo menos 6 caracteres');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Email inválido');
        } else {
          Alert.alert('Email já cadastrado! ' + error.code);
        }
      });
  }

  return (
    <ScrollView style={styles.container}>
      <Text>Nome</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} />

      <Text>Data de nascimento</Text>
      <TextInput
        style={styles.input}
        onChangeText={setBirthdate}
        value={birthdate}
      />

      <Text>Endereço</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={address}
      />

      <Text>Telefone</Text>
      <TextInput style={styles.input} onChangeText={setPhone} value={phone} />

      <Text>Email</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} />

      <Text>Nome de usuário</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />

      <Text>Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <Button style={styles.button} title="Cadastrar" onPress={register} />
    </ScrollView>
  );
}
