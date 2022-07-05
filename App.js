import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Adotar from "./src/pages/Adotar";
import Ajudar from "./src/pages/Ajudar";
import CadastrarAnimal from "./src/pages/CadastrarAnimal";
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import { View } from "react-native-web";

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component={Home} />
        <Stack.Screen name = "Adotar" component={Adotar} />
        <Stack.Screen name = "Ajudar" component={Ajudar} />
        <Stack.Screen name = "CadastrarAnimal" component={CadastrarAnimal} />
        <Stack.Screen name = "Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
