import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Preload from './src/pages/AuthenticationStack/Preload';
import SignIn from './src/pages/AuthenticationStack/SignIn';
import SignUp from './src/pages/AuthenticationStack/SignUp';

import Home from './src/pages/ApplicationStack/Home';
import PetInfo from './src/pages/ApplicationStack/PetInfo';
import AddPet from './src/pages/ApplicationStack/AddPet';
import Chats from './src/pages/ApplicationStack/Chats';

import Authentication from './src/service/authentication/authenticate';
import { AuthContext } from './Context';

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
  Preload: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

type ApplicationStackProps = {
  Home: undefined;
  Adopt: undefined;
  PetInfo: { id: string };
  Profile: undefined;
  AddPet: undefined;
  Chats: undefined;
};



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

  const dispatch = (action: string) => {
    switch (action) {
      case 'SIGN_IN':
        setSigned(true);
        return;
      case 'SIGN_OUT':
        setSigned(false);
        return;
    }
  };

  useEffect(() => {
    check();
  }, []);

  console.log(signed);

  return (
    <AuthContext.Provider value={dispatch}>
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
              <ApplicationStack.Screen
                name="Chats"
                component={Chats}
                options={{
                  headerTitle: 'Chats',
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
                name="SignIn"
                component={SignIn}
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
    </AuthContext.Provider>
  );
}
