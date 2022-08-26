import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

import Authentication from '../../../service/authentication/authenticate';

import styles from './styles';

export default function Preload() {
  const navigation = useNavigation();

  function to(page: string): void {
    let m = {
      name: page,
      key: page,
    };
    navigation.navigate(m);
  }

  Authentication.check()
    .then(() => {
      to('Home');
    })
    .catch(() => {
      // ignore
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
          onPress={() => to('SignUp')}
        >
          Cadastrar
        </Button>
      </View>
    </View>
  );
}
