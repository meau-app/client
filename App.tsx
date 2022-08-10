import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Help from './src/pages/Help';
import Preload from './src/pages/Preload';
import Home from './src/pages/Home';
import Adopt from './src/pages/Adopt';
import Login from './src/pages/Login';
import RegisterAnimal from './src/pages/RegisterAnimal';
import RegisterUser from './src/pages/RegisterUser';
import Profile from './src/pages/Profile';

const Stack = createNativeStackNavigator();
const Theme = {
  ...DefaultTheme,
  roundness: 5,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#365047',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
};

export default function App() {
  return (
    <PaperProvider theme={Theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Preload"
            component={Preload}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerTitle: 'Entrar' }}
          />
          <Stack.Screen
            name="RegisterUser"
            component={RegisterUser}
            options={{ headerTitle: 'Registrar Usuário' }}
          />
          <Stack.Screen name="RegisterAnimal" component={RegisterAnimal} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
