import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { Button, Text, TextInput, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { utils } from "@react-native-firebase/app";
import storage from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Pet } from "../../service/api/models/pet";

const RegisterAnimal: React.FC = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [temper, setTemper] = useState("");

  const [race, setRace] = useState("dog");
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState("");

  const [image, setImage] = useState("");

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

  const register = async () => {
    let p = new Pet();

    p.properties.name = name;
    p.properties.temper = temper;
    p.properties.race = race;
    p.properties.sex = sex;
    p.properties.age = Number(age);

    console.log(p);

    try {
      await Pet.save(p);
    } catch (e: any) {
      Alert.alert(e);
    }
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress={pickImage}>
          {image.length === 0 ? (
            "Toque para escolher uma foto"
          ) : (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </Button>
      </View>
      <TextInput
        mode="outlined"
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        mode="outlined"
        placeholder="Informações gerais (temperamento)"
        value={temper}
        onChangeText={setTemper}
      />
      <TextInput
        mode="outlined"
        placeholder="Idade"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <View style={styles.margin10}>
        <Text>Espécie:</Text>
        <View style={styles.row}>
          <RadioButton
            uncheckedColor="black"
            color="black"
            value="dog"
            status={race === "dog" ? "checked" : "unchecked"}
            onPress={() => setRace("dog")}
          />
          <Text style={styles.margin10}>Cachorro</Text>
          <RadioButton
            uncheckedColor="black"
            color="black"
            value="cat"
            status={race === "cat" ? "checked" : "unchecked"}
            onPress={() => setRace("cat")}
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
            value="male"
            status={sex === "male" ? "checked" : "unchecked"}
            onPress={() => setSex("male")}
          />
          <Text style={styles.margin10}>Macho</Text>
          <RadioButton
            uncheckedColor="black"
            color="black"
            value="female"
            status={sex === "female" ? "checked" : "unchecked"}
            onPress={() => setSex("female")}
          />
          <Text style={styles.margin10}>Fêmea</Text>
        </View>
      </View>

      <View style={styles.margin10}>
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
