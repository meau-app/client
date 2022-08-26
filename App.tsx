import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Preload from './src/pages/Preload';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import RegisterAnimal from './src/pages/RegisterAnimal';
import RegisterUser from './src/pages/RegisterUser';
import PetInfo from './src/pages/PetInfo';
import Authentication from './src/service/authentication/authenticate';

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
  const [signed, setSigned] = useState(false);

  async function check() {
    try {
      let state = await Authentication.check();
      setSigned(state);
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => {
    check();
  }, []);

  return (
    <PaperProvider theme={Theme}>
      <NavigationContainer>
        {signed ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterAnimal"
              component={RegisterAnimal}
              options={{
                headerTitle: 'Registrar Pet',
              }}
            />
            <Stack.Screen
              name="PetInfo"
              component={PetInfo}
              options={{
                headerTitle: 'PetInfo',
              }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Preload"
              component={Preload}
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
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
