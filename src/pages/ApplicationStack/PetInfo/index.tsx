import React, { useCallback, useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import { Alert, ScrollView, View } from "react-native";

import { Pet } from "../../../service/api/models/pet";

import styles from "./styles";

interface AdoptProps {
  id: string;
}

const PetInfo: React.FC<AdoptProps> = (props) => {
  const [state, setState] = useState(0);
  const [pet, setPet] = useState(new Pet());

  const request = async () => {
    const id = props.route.params.id;

    try {
      let response = await Pet.get(id);

      setPet(response as Pet);
      setState(1);
    } catch (e: any) {
      Alert.alert(("Falha ao carregar dados, " + e + id) as string);
    }
  };

  useEffect(() => {
    request();
  }, [props]);

  return (
    <ScrollView style={styles.container}>
      {state === 0 ? (
        <Text>Carregando...</Text>
      ) : (
        <View>
          <Text>Nome {pet.properties.name}</Text>
          <Text>Idade {pet.properties.age}</Text>
          <Text>Raça {pet.properties.race}</Text>
          <Text>Sexo {pet.properties.sex}</Text>
          <Text>Temperamento {pet.properties.temper}</Text>
          <Text>Vacina {pet.properties.vaccines}</Text>

          <Button>Adotar</Button>
        </View>
      )}
    </ScrollView>
  );
};

export default PetInfo;
