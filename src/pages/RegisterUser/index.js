import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { async } from "@firebase/util";
import { auth } from "../../firebaseConnection";



export default function CadastrarUsuario(){

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  function cadastrar(){
    auth.createUserWithEmailAndPassword(email, password)
    .then( (value) => {
      alert('Usuario criado: ' + value.user.email);
    })
    .catch( (error) => {
      if(error.code === 'auth/weak-password'){
        alert('Sua senha deve ter pelo menos 6 caracteres');
        return;
      }
      if(error.code === 'auth/invalid-email'){
        alert('Email invalido');
        return;
      }else{
        alert('Email ja cadastrado!');
        return;
      }
    })

    setEmail('');
    setPassword('');
  }

  return(
    <View style={styles.container}>
      <Text style={styles.texto}>Email</Text>
      <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setEmail(texto) }
      value={email}
      />

      <Text style={styles.texto}>Senha</Text>
      <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setPassword(texto) }
      value={password}
      />

      <Button
      title="Cadastrar"
      onPress={cadastrar}
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
    borderColor: '#121212',
    height: 45,
    fontSize: 17
  }
});