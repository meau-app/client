import React from "react";
import {View, Text, StyleSheet, Button, Input} from 'react-native';

import { useNavigation } from "@react-navigation/native";
export default function Login(){

  const navigation = useNavigation();

  return(
    <View style={styles.container}>
      <Text> Tela de Login </Text>
      <input
        placeholder="E-mail"
        keyboardType="email-address"      
      />
      <input
        placeholder="Senha"
        keyboardType="password"
        secureTextEntry={true}      
      />
      <Button title= "Home" onPress={() => navigation.navigate('Home')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})