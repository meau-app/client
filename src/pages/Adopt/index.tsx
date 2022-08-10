import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Appbar, Avatar, Button, Card, IconButton, Text, } from 'react-native-paper';
import { SafeAreaView, } from 'react-native-safe-area-context';

import { Interface } from '../../service/api/interface';
import { Pet } from '../../service/api/models/pet';

import styles from './styles'

export default function Adopt() {
  let api = new Interface();
    let navigation = useNavigation();

  const [state, setState] = useState('loading')
  const [pets, setPets] = useState(Array<Pet>);

  function to(page: string): void {
    let m = {
      name: page,
      key: '',
    };
    navigation.navigate(m);
  }

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
    <SafeAreaView>
    <Appbar.Header style={styles.bar}>
        <Appbar.Content title="ADOTE" titleStyle={styles.title}/>
        <Appbar.Action icon="plus" style={styles.bar} onPress={() => {to('RegisterAnimal')}} />
    </Appbar.Header>
    <ScrollView>
    <View>
            {state === 'loading' ? (
                <Text>Carregando...</Text>
            ) : (
                pets.map((p, i) => {
                    return <Card onPress={() =>{to('')}}>
                        <Card.Title
                            title={p.name}
                            subtitle={p.temper}
                        />
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                  </Card>
                })
            )}
        </View>
    </ScrollView>
    </SafeAreaView>
  );
}


