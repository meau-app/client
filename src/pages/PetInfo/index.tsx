import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, ScrollView, Alert, Image, Route } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Pet } from '../../service/api/models/pet';
import AdoptItem from '../../components/AdoptItem';

import styles from './styles';
import { auth } from '../../service/database/firebase';
import Authentication from '../../service/authentication/authenticate';
import { useNavigation} from '@react-navigation/native';

interface AdoptProps {}


export default function PetInfo({ route }) {

  const petName = route.params?.pet.name
  const petAge =route.params?.pet.age
  const petId = route.params?.pet.id
  const petSex = route.params?.pet.Sex
  const petRace = route.params?.pet.species
  const petTemper = route.params?.pet.temper
  const petVaccines = route.params?.pet.vaccines

  const navigation = useNavigation();

  const [state, setState] = useState(0);
  const [pet, setPet] = useState(new Pet());


//  function to(page: string): void {
//    let m = {
//      name: page,
//      key: page,
//    };
//    navigation.navigate(m);
//  }

//
//  const request = useCallback(async () => {
//    const petid =  pet.properties.id;
//    try {
//      let response = await Pet.get(petid);
//      setPet(response as Pet);
//    } catch (e: any) {
//      Alert.alert(('Falha ao carregar dados, ' + e) as string);
//    }
//  }, []);
//
//  useEffect(() => {
//    request();
//  }, []);
//
  return (
    <ScrollView style={styles.container}>
        <View>
          <Text>FOTO</Text>
          <Text>Nome {petName}</Text>
          <Text>Idade {petAge}</Text>
          <Text>Especie {petId}</Text>
          <Text>Raça {petRace}</Text>
          <Text>Sexo {petSex}</Text>
          <Text>Temperamento {petTemper}</Text>
          <Text>Vacina {petVaccines}</Text>
        </View>
    </ScrollView>
  );
};

