import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styles from './styles';
import * as SecureStore from 'expo-secure-store';

export default function Home() {
  const navigation = useNavigation();

  function to(page: string): void {
    navigation.navigate(page);
  }

  function registerAnimal() {
    to('RegisterAnimal');
  }

  function adopt() {
    to('Adopt');
  }

  function myAnimals() {
    to('RegisterAnimal');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button style={styles.buttonMargin} mode="contained" onPress={adopt}>
        Animais pra Adoção
      </Button>

      <Button
        style={styles.buttonMargin}
        mode="contained"
        onPress={registerAnimal}
      >
        Cadastrar Animal
      </Button>

      <Button style={styles.buttonMargin} mode="contained" onPress={myAnimals}>
        Meus Animais
      </Button>

      <Button
        onPress={() => {
          SecureStore.setItemAsync('secure_token', '');
          navigation.navigate('Login');
        }}
      >
        Logout
      </Button>
    </ScrollView>
  );
}
