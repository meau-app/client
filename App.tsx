import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Help from "./src/pages/Help";
import Preload from "./src/pages/Preload";
import Home from "./src/pages/Home";
import Adopt from "./src/pages/Adopt";
import Login from "./src/pages/Login";
import RegisterAnimal from "./src/pages/RegisterAnimal";
import RegisterUser from "./src/pages/RegisterUser";

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Preload" component={Preload} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Adopt" component={Adopt} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} />
        <Stack.Screen name="RegisterAnimal" component={RegisterAnimal} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}