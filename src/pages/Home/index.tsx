import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styles from './styles';
import * as SecureStore from 'expo-secure-store';

export default function Home() {
  const navigation = useNavigation();

  function to(page: string): void {
    navigation.navigate(page);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button style={styles.buttonMargin} mode="contained" onPress={() => to('Adopt')}>
        Animais pra Adoção
      </Button>

      <Button
        style={styles.buttonMargin}
        mode="contained"
        onPress={() => to('RegisterAnimal')}
      >
        Cadastrar Animal
      </Button>

      <Button style={styles.buttonMargin} mode="contained" onPress={() => to('')}>
        Meus Animais
      </Button>

      <Button
        onPress={() => {
          SecureStore.setItemAsync('user_secure_token', '');
          to('Login');
        }}
      >
        Logout
      </Button>
    </ScrollView>
  );
}
