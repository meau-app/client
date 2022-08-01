import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../service/database/firebase';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import * as SecureStore from 'expo-secure-store';

export default function Adopt() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text> Tela Adotar </Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button
        title="Logout"
        onPress={() => {
          SecureStore.setItemAsync('secure_token', '');
          navigation.navigate('Home');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
