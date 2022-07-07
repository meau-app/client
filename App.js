import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Help from "./src/pages/Help";
import Home from "./src/pages/Home";
import Adopt from "./src/pages/Adopt";
import Login from "./src/pages/Login";
import RegisterAnimal from "./src/pages/RegisterAnimal";
import RegisterUser from "./src/pages/RegisterUser";

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Adotar" component={Adopt} />
        <Stack.Screen name="Ajudar" component={Help} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CadastrarUsuario" component={RegisterUser} />
        <Stack.Screen name="CadastrarAnimal" component={RegisterAnimal} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
