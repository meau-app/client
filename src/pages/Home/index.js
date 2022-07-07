import React from "react";
import {View, Text, StyleSheet, Button} from 'react-native';

import { useNavigation } from "@react-navigation/native";

export default function Home()  {
  const navigation = useNavigation();

  function navigate(page) {
    navigation.navigate(page);
  }

  return(
    <View style={styles.container}>
      <Text>Meau</Text>
      <Button title="Adotar" onPress={navigate('Adopt')}/>
      <Button title="Ajudar" onPress={navigate('Help')}/>
      <Button title="Cadastrar Animal" onPress={navigate('RegisterAnimal')}/>
      <Button title="Login" onPress={navigate('Login')}/>
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