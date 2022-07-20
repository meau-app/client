import React from "react";
import { View, Text, StyleSheet, Button, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";


export default function Home() {
  const navigation = useNavigation();

  function go(page) {
    navigation.navigate(page);
  }

  function isUserSignedIn() {
    SecureStore.getItemAsync('secure_token').then((value) => {
      if (value != '' && value != null) {
        alert(value);
        navigation.navigate('Adopt');
      }
    });
  }

  isUserSignedIn();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meau</Text>
      <Button title="Login" onPress={() => go('Login')} />
      <Button title="Cadastrar" onPress={() => go('RegisterUser')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 50,
    fontWeight: "300",
  }
})