import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import MeauButton from './lib/components/button';

export default function App() {
  return (
    <View style={[styles.container, {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "column"
    }]}>
      <View style={styles.topTitle}>
        <Text style={styles.text}>Olá</Text>
      </View>
      <View style={styles.buttonMenu}>
        <MeauButton title='ADOTAR'></MeauButton>
        <MeauButton title='AJUDAR'></MeauButton>
        <MeauButton title='CADASTRAR ANIMAL'></MeauButton>
        <Button title='login'></Button>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 76,
  },
  topTitle: {
    marginTop: 60,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonMenu: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
