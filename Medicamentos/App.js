import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

const App = () => {
  useEffect(() => {
    const getUsers = async () => {
      const api = await axios.get("http://192.168.2.101:5000/api/users");
      const { data } = api;
      console.log(data);
    };

    const addUser = async () => {
      const api = await axios.post("http://192.168.2.101:5000/api/users", {
        id: "asas12",
        login: "lucas2",
        name: "Lucas",
        lastName: "Brilhante",
        birthDate: "17/12/1994",
        cpf: "05941729340",
        isActive: true,
        accountType: "user",
      });
      const { data } = api;
      console.log(data);
    };

    addUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello1</Text>
      <StatusBar style="auto" />
    </View>
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

export default App;
