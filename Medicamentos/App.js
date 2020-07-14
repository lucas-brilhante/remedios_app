import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Authentication from "./src/pages/Authentication";
import CreateNewUser from "./src/pages/UserForm";
import Home from "./src/pages/Home";
import { Provider } from "react-redux";
import store from "./src/store/store";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Authentication"
            component={Authentication}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Create User"
            component={CreateNewUser}
            options={{ title: "Criar conta" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
