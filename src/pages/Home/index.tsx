import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styles from './styles';
import * as SecureStore from 'expo-secure-store';
import Authentication from '../../service/authentication/authenticate';
import { linkWithRedirect } from 'firebase/auth';

export default function Home() {
  const navigation = useNavigation();

  function to(page: string): void {
    let m = {
      name: page,
      key: page,
    };
    navigation.navigate(m);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Button
        style={styles.buttonMargin}
        mode="contained"
        onPress={() => to('Profile')}
      >
        Perfil
      </Button>
      <Button
        style={styles.buttonMargin}
        mode="contained"
        onPress={() => to('Adopt')}
      >
        Animais pra Adoção
      </Button>

      <Button
        style={styles.buttonMargin}
        mode="contained"
        onPress={() => to('RegisterAnimal')}
      >
        Cadastrar Animal
      </Button>

      <Button
        style={styles.buttonMargin}
        mode="contained"
        onPress={() => to('')}
        disabled
      >
        Meus Animais
      </Button>

      <Button
        style={styles.buttonMargin}
        onPress={() => {
          Authentication.logout()
            .then(() => {
              to('Preload');
            })
            .catch(e => {
              Alert.alert('Falha ao sair, tente novamente');
            });
        }}
      >
        Logout
      </Button>
    </ScrollView>
  );
}
