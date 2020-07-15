import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Feather } from "@expo/vector-icons";
import useUsers from "../hooks/useUsers";

const Header = ({ color, handleSideDrawer }) => {
  const user = useUsers();
  return (
    <Container color={color}>
      <Content>
        <MenuButton onPress={() => handleSideDrawer((state) => !state)}>
          <Feather name="menu" size={32} color="black" />
        </MenuButton>
        <MenuContainer>
          <Logo>Remédios</Logo>
        </MenuContainer>
        <WelcomeContainer>
          <View>
            <Text style={{ paddingRight: 16 }}>Olá,</Text>
            <Text>{user.name}.</Text>
          </View>
        </WelcomeContainer>
      </Content>
    </Container>
  );
};

const Container = styled(View)`
  height: 80px;
  background-color: ${({ color }) => (color ? color : "black")};
  border-bottom-width: ${3 * StyleSheet.hairlineWidth}px;
  border-color: #000;
`;

const Content = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  padding: 16px;
`;
const MenuContainer = styled(View)`
  flex: 2;
`;
const Logo = styled(Text)`
  font-size: 35px;
  color: green;
  text-align: center;
  font-family: "Bangers";
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
`;

const MenuButton = styled(TouchableOpacity)`
  flex: 1;
`;
const WelcomeContainer = styled(View)`
  flex: 1;
  align-items: flex-end;
`;

export default Header;
