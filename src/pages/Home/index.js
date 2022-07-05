import React from "react";
import {View, Text, StyleSheet, Button} from 'react-native';

import { useNavigation } from "@react-navigation/native";
export default function Home(){

  const navigation = useNavigation();

  return(
    <View style={styles.container}>
      <Text> Olá </Text>
      <Button title= "Adotar" onPress={() => navigation.navigate('Adotar')}/>
      <Button title= "Ajudar" onPress={() => navigation.navigate('Ajudar')}/>
      <Button title= "Cadastrar Animal" onPress={() => navigation.navigate('CadastrarAnimal')}/>
      <Button title= "Login" onPress={() => navigation.navigate('Login')}/>
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