import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Interface } from '../../service/api/interface';
import { Pet } from '../../service/api/models/pet';

export default function Adopt() {
  let api = new Interface();

  function request() {
    api.get(new Pet()).then(v => {
        setPets(v as Array<Pet>)
    }).catch(e => {
        Alert.alert(e)
    })
  }

  const [pets, setPets] = useState(Array<Pet>);

  return (
    <View style={styles.container}>
      <Button onPress={request}>carregar</Button>
      {pets.map((p, i) => {
        return <Text>{p.name}</Text>
      })}
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
