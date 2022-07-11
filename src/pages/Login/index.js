import React from "react";
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { auth } from "../../service/database/firebase";
import { TextInput } from "react-native-web";

export default function Login() {
  const navigation = useNavigation();

  function navigate(page) {
    navigation.navigate(page);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    auth.signInWithEmailAndPassword(email, password)
        .then((credential) => {
            console.log("credential is " + credential + " for user " + credential.user);
        })
        .catch(error => {
            const code = error.code;
            const message = error.message;

            console.log("login failed with code " + code + " and reason " + message);
        });
  }

  return(
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
      />

      <Text>Senha</Text>
      <TextInput
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={()=>login()}>
        Login
      </TouchableOpacity>
      <Button title="Home" onPress={()=>navigate('Home')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: "center",
    padding:10
  }
})