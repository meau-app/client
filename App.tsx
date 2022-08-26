import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Preload from './src/pages/Preload';
import Home from './src/pages/ApplicationStack/Home';
import Login from './src/pages/Login';
import AddPet from './src/pages/ApplicationStack/AddPet';
import SignUp from './src/pages/AuthenticationStack/SignUp';
import PetInfo from './src/pages/PetInfo';
import Authentication from './src/service/authentication/authenticate';

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

type AuthenticationProps = {
    Preload: undefined,
    Login: undefined,
    SignUp: undefined,
}

type ApplicationStackProps = {
    Home: undefined,
    Adopt: undefined,
    PetInfo: { id: string },
    Profile: undefined,
    AddPet: undefined
}

const AuthenticationStack = createNativeStackNavigator<AuthenticationProps>();
const ApplicationStack = createNativeStackNavigator<ApplicationStackProps>();

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
          <ApplicationStack.Navigator>
            <ApplicationStack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <ApplicationStack.Screen
              name="AddPet"
              component={AddPet}
              options={{
                headerTitle: 'Registrar Pet',
              }}
            />
            <ApplicationStack.Screen
              name="PetInfo"
              component={PetInfo}
              options={{
                headerTitle: 'PetInfo',
              }}
            />
          </ApplicationStack.Navigator>
        ) : (
          <AuthenticationStack.Navigator>
            <AuthenticationStack.Screen
              name="Preload"
              component={Preload}
              options={{ headerShown: false }}
            />
            <AuthenticationStack.Screen
              name="Login"
              component={Login}
              options={{ headerTitle: 'Entrar' }}
            />
            <AuthenticationStack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerTitle: 'Registrar Usuário' }}
            />
          </AuthenticationStack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
