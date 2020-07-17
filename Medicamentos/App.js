import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { useFonts, Bangers_400Regular } from "@expo-google-fonts/bangers";
import { Abel_400Regular } from "@expo-google-fonts/abel";
import { Authentication, UserForm, Home } from "./src/pages";
import { store } from "./src/store";

const Stack = createStackNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    Bangers: Bangers_400Regular,
    Abel: Abel_400Regular,
  });

  if (!fontsLoaded) return null;
  else
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Authentication"
              component={Authentication}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Create User"
              component={UserForm}
              options={{ title: "Criar conta" }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
};

export default App;
