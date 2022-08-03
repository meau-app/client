import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

import Authentication from '../../service/authentication/authenticate';
import { User } from '../../service/api/models/user';

export default function RegisterUser() {
  const navigation = useNavigation();

  function to(page: string): void {
    navigation.navigate(page);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');

  function setAgeHandler(text: string) {
    setAge(text.replace(/[^0-9]/g, ''));
  }

  function register() {
    let user = new User(
      name,
      '',
      email,
      phone,
      username,
      city,
      state,
      address,
      Number(age),
      "won't say",
      '',
      []
    );

    Authentication.register(user, email, password)
      .then(() => {
        to('Home');
      })
      .catch(e => {
        Alert.alert(e);
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
        onChangeText={setAgeHandler}
        keyboardType="numeric"
        value={age}
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
