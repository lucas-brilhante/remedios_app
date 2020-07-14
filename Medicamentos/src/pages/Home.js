import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
//import { useUsers } from "../hooks/useUsers";

const Home = () => {
  const user = useSelector((store) => store.userReducer);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Olá, {user.name} </Text>
    </View>
  );
};

export default Home;
