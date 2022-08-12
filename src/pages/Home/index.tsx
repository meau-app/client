import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Alert, Text, Image, View } from 'react-native';
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
      <Text style={styles.title}>Olá!</Text>
      <Text style ={styles.text}>
        Bem vindo ao Meau!
        Aqui você pode adotar, doar e ajudar 
        cães e gatos com facilidade.
        Qual o seu interesse?
      </Text>
      <View style={styles.buttonMargin48}></View>
      <Button
        style={styles.buttonStyle}
        mode="contained"
        onPress={() => to('Profile')}
      >
       <Text style={styles.buttonText}>Perfil</Text>
      </Button>
      <View style={styles.buttonMargin12}></View>
      <Button
        style={styles.buttonStyle}
        mode="contained"
        onPress={() => to('Adopt')}
      >
        <Text style={styles.buttonText}>Animais pra Adoção</Text>
      </Button>
      <View style={styles.buttonMargin12}></View>
      <Button
        style={styles.buttonStyle}
        mode="contained"
        onPress={() => to('RegisterAnimal')}
      >
        <Text style={styles.buttonText}>Cadastrar Animal</Text>
      </Button>
      <View style={styles.buttonMargin12}></View>
      <Button
        style={styles.buttonStyle}
        mode="contained"
        onPress={() => to('')}
        disabled
      >
        <Text style={styles.buttonText}>Meus Animais</Text>
      </Button>

      <Button
        style={styles.buttonMargin48}
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
      <Text style={styles.textlogout}>Logout</Text>
      </Button>
      <Image 
      style={styles.image} source={require('../../../assets/Meau_marca.png')} />
    </ScrollView>
  );
}
