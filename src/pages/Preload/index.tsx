import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import styles from './styles';

export default function Preload() {
  const navigation = useNavigation();

  function go(page: string) {
    navigation.navigate(page);
  }

  function isUserSignedIn() {
    SecureStore.getItemAsync('secure_token').then((value) => {
      if (value != '' && value != null) {
        Alert.alert(value);
        navigation.navigate('Home');
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
  );
}
