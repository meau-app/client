import React from 'react';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { AuthProvider } from './Context';
import { Navigation } from './Navigation';

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
    <AuthProvider>
      <PaperProvider theme={Theme}>
        <Navigation />
      </PaperProvider>
    </AuthProvider>
  );
}
