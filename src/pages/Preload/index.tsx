import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image } from 'react-native';
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
      <Text style={styles.title}>Ola!</Text>
      <Text style ={styles.text}>
        Bem vindo ao Meau!
        Aqui voce pode adotar, doar e ajudar 
        caes e gatos com facilidade.
        Qual o seu interesse?
      </Text>
      <View style={styles.buttonList}>
        <Button style={styles.buttonStyle} mode="contained" onPress={() => to('Login')}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </Button>
      <View style={styles.buttonMargin}></View>
        <Button
          style={styles.buttonStyle}
          mode="contained"
          onPress={() => to('RegisterUser')}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Button>
        <View style={styles.buttonMargin2}></View>
        <Image style={styles.image} source={require('../../../assets/Meau_marca.png')} />
      </View>
    </View>
  );
}
