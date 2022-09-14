import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MEAU</Text>
      <View style={styles.buttonList}>
        <Button mode="contained" onPress={() => to('SignIn')}>
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
