import React from "react";
import {View, Text, StyleSheet, Button} from 'react-native';

import { useNavigation } from "@react-navigation/native";

export default function Home()  {
  const navigation = useNavigation();

  function go(page) {
    navigation.navigate(page);
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Meau</Text>
      <Button title="Login" onPress={()=>go('Login')}/>
      <Button title="Cadastrar" onPress={()=>go('RegisterUser')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    fontSize: 50,
    fontWeight: "300",
  }
})