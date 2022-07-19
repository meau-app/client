import { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, firebaseConfig, app } from "../../service/database/firebase";
import { getFirestore, setDoc, doc, } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";

const firestore = getFirestore();

export default function RegisterUser() {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  function register() {
    auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        alert('Usuário criado: ' + value.user.email);
        value.user.getIdToken().then((value) => SecureStore.setItemAsync('secure_token', value));
        setDoc(doc(firestore, "users", email), {
          userId: value.user.uid,
          age: birthdate,
          name: name,
          phone: phone,
          username: username,
          address: address,
        });
        navigation.navigate('Adopt');
      })
      .catch(error => {
        if (error.code === 'auth/weak-password') {
          alert('Sua senha deve ter pelo menos 6 caracteres');
        } else if (error.code === 'auth/invalid-email') {
          alert('Email invalido');
        } else {
          alert('Email ja cadastrado! ' + error.code);
        }
      })
  }

  return (
    <View style={styles.container}>
      <Text>Nome</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
      />

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
      <TextInput
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />

      <Text>Nome de usuário</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />

      <Text>Senha</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Button
        style={styles.button}
        title="Cadastrar"
        onPress={register}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  texto: {
    fontSize: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 45,
    fontSize: 17
  }
});