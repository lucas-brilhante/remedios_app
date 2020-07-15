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
        <MenuButton onPress={() => handleSideDrawer(true)}>
          <Feather name="menu" size={32} color="black" />
        </MenuButton>
        <MenuContainer>
          <Logo>Remédios</Logo>
        </MenuContainer>
        <MenuContainer>
          <WelcomeText>Olá, {user.name}.</WelcomeText>
        </MenuContainer>
      </Content>
    </Container>
  );
};

const Container = styled(View)`
  height: 56px;
  background-color: ${({ color }) => (color ? color : "black")};
  border-bottom-width: ${3 * StyleSheet.hairlineWidth}px;
  border-color: #000;
`;

const Content = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 16px;
`;
const MenuContainer = styled(View)`
  flex: 1;
`;
const Logo = styled(Text)`
  font-size: 35px;
  color: blue;
  text-align: center;
  font-family: "Bangers";
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
`;

const MenuButton = styled(TouchableOpacity)`
  flex: 1;
`;

const WelcomeText = styled(Text)`
  text-align: right;
`;

export default Header;
