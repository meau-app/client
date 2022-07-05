import React from "react";
import {View, Text, StyleSheet, Button, Input, TouchableOpacity} from 'react-native';

import { useNavigation } from "@react-navigation/native";
export default function CadastrarUsuario(){

  const navigation = useNavigation();

  return(
    <View style={styles.container}>
      <Text> Tela Cadastrar </Text>
      <input
        placeholder="Nome Completo"     
      />
      <input
        placeholder="E-mail"
        keyboardType="email-address"      
      />
      <input
        placeholder="Senha"
        keyboardType="password"
        secureTextEntry={true}      
      />
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Login')}>Login</TouchableOpacity>
      <Button title= "Home" onPress={() => navigation.navigate('Home')}/>

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