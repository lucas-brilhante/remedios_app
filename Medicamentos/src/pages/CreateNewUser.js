import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import firebaseAuth from "../services/firebaseAuth";
import { useNavigation } from "@react-navigation/native";

const CreateNewUser = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  console.log(navigation.status);

  const create = async () => {
    firebaseAuth
      .createUserWithEmailAndPassword(login, password)
      .then((response) => {
        navigation.navigate("Home", { login: response.user.email });
      })
      .catch((error) => {
        console.log(error.code);
        setError(error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <Text>Usuário</Text>
      <TextInput
        value={login}
        onChangeText={setLogin}
        style={{
          width: 200,
          height: 30,
          borderWidth: 2,
          margin: 3,
          padding: 5,
        }}
        autoCapitalize="none"
        autoCompleteType="username"
        autoFocus
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={{
          width: 200,
          height: 30,
          borderWidth: 2,
          margin: 3,
          padding: 5,
        }}
        autoCapitalize="none"
        autoCompleteType="password"
        textContentType="password"
        secureTextEntry
        autoFocus
      />
      <TouchableOpacity
        onPress={create}
        style={{
          backgroundColor: "yellow",
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
        }}
      >
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateNewUser;
