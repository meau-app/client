import React from 'react';
import { useAuth } from './Context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Preload from './src/pages/AuthenticationStack/Preload';
import SignIn from './src/pages/AuthenticationStack/SignIn';
import SignUp from './src/pages/AuthenticationStack/SignUp';

import Home from './src/pages/ApplicationStack/Home';
import PetInfo from './src/pages/ApplicationStack/PetInfo';
import RegisterPet from './src/pages/ApplicationStack/RegisterPet';
import Chats from './src/pages/ApplicationStack/Chats';
import Chat from './src/pages/ApplicationStack/Chat';

import Authentication from './src/service/authentication/authenticate';

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
  RegisterPet: undefined;
  Chats: undefined;
  Chat: undefined;
};

const AuthenticationStack = createNativeStackNavigator<AuthenticationProps>();
const ApplicationStack = createNativeStackNavigator<ApplicationStackProps>();

export const Navigation: React.FC = () => {
  const signed = useAuth()?.signed;

  return (
    <NavigationContainer>
      {signed ? (
        <ApplicationStack.Navigator>
          <ApplicationStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <ApplicationStack.Screen
            name="RegisterPet"
            component={RegisterPet}
            options={{
              headerTitle: 'Registrar Pet',
            }}
          />
          <ApplicationStack.Screen
            name="PetInfo"
            component={PetInfo}
            options={{
              headerTitle: 'Informações do Pet',
            }}
          />
          <ApplicationStack.Screen
            name="Chats"
            component={Chats}
            options={{
              headerTitle: 'Chats',
            }}
          />
          <ApplicationStack.Screen
            name="Chat"
            component={Chat}
            options={{
              headerTitle: 'Chat',
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
  );
};
