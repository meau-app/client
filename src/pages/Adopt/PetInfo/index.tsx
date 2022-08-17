import { useMemo, useState } from 'react';
import { View, ScrollView, Alert, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Pet } from '../../../service/api/models/pet';
import { Interface } from '../../../service/api/interface';

import styles from './styles';
import { auth } from '../../../service/database/firebase';
import Authentication from '../../../service/authentication/authenticate';

export default function PetInfo({ route }) {
  let api = new Interface();

  const [state, setState] = useState(0);
  const [pet, setPet] = useState(new Pet());
  const petid = route.params;

  function to(page: string): void {
    let m = {
      name: page,
      key: page,
    };
    navigation.navigate(m);
  }

  function request() {
    const uid = petid;
    api
      .get(new Pet(), uid)
      .then(v => {
        setState(1);
        setPet(v as Pet);
      })
      .catch(e => {
        Alert.alert(('Falha ao carregar dados, ' + e) as string);
      });
  }

  return (
    request(),
    (
      <ScrollView style={styles.container}>
        {state === 0 ? (
          <Text>Carregando...</Text>
        ) : (
          <View>
            <Text>IMAGEM AQUI</Text>
            <Text>nome {pet.name}</Text>
            <Text>Idade {pet.age}</Text>
            <Text>sexo {pet.sex}</Text>
            <Text>Temperamento{pet.temper}</Text>
            <Text>Vacinas {pet.vaccines}</Text>
            <Text>id{pet.id}</Text>
          </View>
        )}
        <Button onPress={()=> {to('')}}>PRETENDO ADOTAR</Button>
      </ScrollView>
    )
  );
}