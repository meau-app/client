import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

import Authentication from '../../service/authentication/authenticate';

import styles from './styles';

export default function Preload() {
  const navigation = useNavigation();

  function to(page: string): void {
    navigation.navigate(page);
  }

  Authentication.check().then(() => {
    to('Home');
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MEAU</Text>
      <View style={styles.buttonList}>
        <Button mode="contained" onPress={() => to('Login')}>
          Login
        </Button>
        <Button
          style={styles.buttonMargin}
          mode="contained"
          onPress={() => to('RegisterUser')}
        >
          Cadastrar
        </Button>
      </View>
    </View>
  );
}
