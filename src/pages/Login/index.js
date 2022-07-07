import React from "react";
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';

import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();

  function navigate(page) {
    navigation.navigate(page);
  }

  return(
    <View style={styles.container}>
      <Text>Login</Text>
      <input
        placeholder="E-mail"
        keyboardType="email-address"
      />
      <input
        placeholder="Senha"
        keyboardType="password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={navigate('RegisterUser')}>Cadastrar</TouchableOpacity>
      <Button title="Home" onPress={navigate('Home')}/>
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