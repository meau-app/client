import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Alert, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styles from './styles';
import * as SecureStore from 'expo-secure-store';
import Authentication from '../../service/authentication/authenticate';
import { linkWithRedirect } from 'firebase/auth';

import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Adopt from '../Adopt';
import Profile from '../Profile';
import Notification from '../Notification';

const Tab = createBottomTabNavigator();

export default function Home() {
  const navigation = useNavigation();

  function to(page: string): void {
    let m = {
      name: page,
      key: page,
    };
    navigation.navigate(m);
  }

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon;

            if (route.name === 'Adotar') {
              icon = focused ? 'bug' : 'bug-outline';
            } else if (route.name === 'Notificações') {
              icon = focused ? 'ios-notifications' : 'ios-notifications-outline';
            } else if (route.name === 'Perfil') {
              icon = focused ? 'ios-person' : 'ios-person-outline';
            }

            return <Ionicons name={icon} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Adotar" component={Adopt} />
        <Tab.Screen name="Notificações" component={Notification} />
        <Tab.Screen name="Perfil" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
