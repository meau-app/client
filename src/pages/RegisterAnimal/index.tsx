import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Text, TextInput, RadioButton } from 'react-native-paper';
import styles from './styles';

export default function RegisterAnimal({ navigation }) {
  const [checked, setChecked] = React.useState('first');
  const [checked2, setChecked2] = React.useState('second');
  const [checked3, setChecked3] = React.useState('third');

  function to(page: string): void {
    let m = {
      name: page,
      key: page,
    };
    navigation.navigate(m);
  }

  function register() {}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Tenho interessa em cadastrar o animal para:</Text>
      <View style={styles.row}>
        <Button style={styles.buttonMargin} mode="contained">
          Adoção
        </Button>

        <Button style={styles.buttonMargin} mode="contained" disabled={true}>
          Apadrinhar
        </Button>

        <Button style={styles.buttonMargin} mode="contained" disabled={true}>
          Ajuda
        </Button>
      </View>
      <TextInput mode="outlined" placeholder="Nome do Animal" />
      <TextInput mode="outlined" placeholder="Sobre o Animal" />

      <View style={styles.margin10}>
        <Text>Especie:</Text>
        <View style={styles.row}>
          <RadioButton
            uncheckedColor="black"
            color="black"
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
          />
          <Text style={styles.margin10}>Cachorro</Text>
          <RadioButton
            uncheckedColor="black"
            color="black"
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('second')}
          />
          <Text style={styles.margin10}>Gato</Text>
        </View>
      </View>

      <View style={styles.margin10}>
        <Text>Sexo:</Text>
        <View style={styles.row}>
          <RadioButton
            uncheckedColor="black"
            color="black"
            value="first"
            status={checked2 === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked2('first')}
          />
          <Text style={styles.margin10}>Macho</Text>
          <RadioButton
            uncheckedColor="black"
            color="black"
            value="second"
            status={checked2 === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked2('second')}
          />
          <Text style={styles.margin10}>Fêmea</Text>
        </View>
      </View>

      <View style={styles.margin10}>
        <Text>Porte:</Text>
        <View style={styles.row}>
          <RadioButton
            uncheckedColor="black"
            color="black"
            value="first"
            status={checked3 === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked3('first')}
          />
          <Text style={styles.margin10}>Pequeno</Text>
          <RadioButton
            uncheckedColor="black"
            color="black"
            value="second"
            status={checked3 === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked3('second')}
          />
          <Text style={styles.margin10}>Medio</Text>
          <RadioButton
            uncheckedColor="black"
            color="black"
            value="third"
            status={checked3 === 'third' ? 'checked' : 'unchecked'}
            onPress={() => setChecked3('third')}
          />
          <Text style={styles.margin10}>Grande</Text>
        </View>
        <Button mode="contained" onPress={register}>
          Cadastrar
        </Button>
      </View>
    </ScrollView>
  );
}
