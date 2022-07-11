import { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { auth } from "../../service/database/firebase";


export default function RegisterUser() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function register() {
    auth.createUserWithEmailAndPassword(email, password)
        .then(value => {
            alert('Usuário criado: ' + value.user.email);
            navigation.navigate('Login');
        })
        .catch(error => {
          if (error.code === 'auth/weak-password')  {
            alert('Sua senha deve ter pelo menos 6 caracteres');
          } else if (error.code === 'auth/invalid-email') {
            alert('Email invalido');
          } else {
            alert('Email ja cadastrado!');
          }
        })
  }

  return(
    <View style={styles.container}>
      <Text style={styles.texto}>Email</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={setEmail}
        value={email}
      />

      <Text style={styles.texto}>Senha</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={setPassword}
        value={password}
      />

      <Button
        title="Cadastrar"
        onPress={register}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin: 10,
  },
  texto: {
    fontSize: 20,
  },
  input:{
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 45,
    fontSize: 17
  }
});