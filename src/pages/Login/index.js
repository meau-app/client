import { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { auth } from "../../service/database/firebase";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    auth.signInWithEmailAndPassword(email, password)
        .then(credential => {
            const user = credential.user.email;
            const token = credential.user.getIdToken(true);
            /*auth.currentUser.getIdToken(true)
                .then(token => {

                })*/

            alert("credential is " + token + " for user " + user);


        })
        .catch(error => {
            const code = error.code;
            const message = error.message;

            alert("login failed with code " + code + " and reason " + message);
        });
  }

  return(
    <View style={styles.container}>
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
        value={password}
      />

      <Button
        style={styles.button}
        title="Login"
        onPress={login}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  button: {
    alignItems: "center",
    padding:10
  },
  input:{
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 45,
    fontSize: 17
  }
})