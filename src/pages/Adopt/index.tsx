import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { API } from '../../service/api/interface';

export default function Adopt() {
  const navigation = useNavigation();

  let interface = new API();

  function request() {
    interface
      .pets()
      .then(v => {
        setPets(v);
      })
      .catch(e => {
        Alert.alert(e);
      });
  }

  const [pets, setPets] = useState('');

  return (
    <View style={styles.container}>
      <Button onPress={request}>carregar</Button>
      <Text>{pets}</Text>
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
