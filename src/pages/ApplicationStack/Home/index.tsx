import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Adopt from "../Adopt";
import Profile from "../Profile";
import Notification from "../Notification";

const Tab = createBottomTabNavigator();

const Home: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === "Adotar") {
            icon = focused ? "bug" : "bug-outline";
          } else if (route.name === "Notificações") {
            icon = focused ? "ios-notifications" : "ios-notifications-outline";
          } else if (route.name === "Chat") {
            icon = focused
              ? "chatbubble-ellipses-outline"
              : "chatbubble-ellipses-outline";
          } else if (route.name === "Perfil") {
            icon = focused ? "ios-person" : "ios-person-outline";
          }

          return <Ionicons name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#365047",
        tabBarInactiveTintColor: "#bbbbbb",
      })}
    >
      <Tab.Screen
        name="Adotar"
        component={Adopt}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Notificações" component={Notification} />
      <Tab.Screen name="Chat" component={Profile} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
};

export default Home;
