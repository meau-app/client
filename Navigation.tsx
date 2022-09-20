import React from "react"
import { useAuth } from "./Context"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Preload from './src/pages/AuthenticationStack/Preload';
import SignIn from './src/pages/AuthenticationStack/SignIn';
import SignUp from './src/pages/AuthenticationStack/SignUp';

import Home from './src/pages/ApplicationStack/Home';
import PetInfo from './src/pages/ApplicationStack/PetInfo';
import AddPet from './src/pages/ApplicationStack/AddPet';
import Chats from './src/pages/ApplicationStack/Chats';

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
    AddPet: undefined;
    Chats: undefined;
  };

const AuthenticationStack = createNativeStackNavigator<AuthenticationProps>();
const ApplicationStack = createNativeStackNavigator<ApplicationStackProps>();

export const Navigation: React.FC = () => {
    const signed = useAuth()?.signed;

    console.log(signed)

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
    )
}