import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text, TextInput, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { getApps, initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'uuid';
import { Pet } from '../../service/api/models/pet';

const RegisterAnimal: React.FC = () => {
  const navigation = useNavigation();

  const [checked, setChecked] = React.useState('first');
  const [checked2, setChecked2] = React.useState('second');
  const [checked3, setChecked3] = React.useState('third');

  const [image, setImage] = React.useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const register = () => {
    Pet.save()
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Tenho interesse em cadastrar o animal para:</Text>
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={pickImage}>
          {image == null ? (
            'Toque para escolher uma foto'
          ) : (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </Button>
      </View>
      <TextInput mode="outlined" placeholder="Nome do Animal" />
      <TextInput mode="outlined" placeholder="Sobre o Animal" />

      <View style={styles.margin10}>
        <Text>Espécie:</Text>
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
        <Button
          mode="contained"
          onPress={register}
          style={styles.registerButton}
        >
          Cadastrar
        </Button>
      </View>
    </ScrollView>
  );
};

export default RegisterAnimal;
