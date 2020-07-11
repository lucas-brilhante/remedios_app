import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const Home = () => {
  const route = useRoute();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Seu id: {route.params.login}</Text>
    </View>
  );
};

export default Home;
