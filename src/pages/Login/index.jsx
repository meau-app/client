import { useState } from "react";
import { ScrollView, Text, StyleSheet, Button, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { auth } from "../../service/database/firebase";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    auth.signInWithEmailAndPassword(email, password)
      .then(async credential => {
        const user = credential.user.email;
        const token = await credential.user.getIdToken(true);
        SecureStore.setItemAsync('secure_token', token);
        navigation.navigate('Adopt');
      })
      .catch(error => {
        const code = error.code;
        const message = error.message;

        alert("login failed with code " + code + " and reason " + message);
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />

      <Text>Senha</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry={true}
        value={password}
      />
      <Button
        style={styles.button}
        title="Login"
        onPress={login}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  button: {
    alignItems: 'center',
    padding: 10
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 45,
    fontSize: 17
  }
})