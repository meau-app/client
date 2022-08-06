import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Interface } from '../../service/api/interface';
import { Pet } from '../../service/api/models/pet';

import styles from './styles'

export default function Adopt() {
  let api = new Interface();

  const [state, setState] = useState('loading')
  const [pets, setPets] = useState(Array<Pet>);

  function request() {
    api.get(new Pet()).then(v => {
        setPets(v as Array<Pet>)
        setState('')
    }).catch(e => {
        Alert.alert(e)
    })
  }

  return (
    request(),
    <View style={styles.container}>
        {state === 'loading' ? (
            <Text>Carregando...</Text>
        ) : (
            pets.map((p, i) => {
                return <Text>{p.name}</Text>
          })
        )}
    </View>
  );
}


