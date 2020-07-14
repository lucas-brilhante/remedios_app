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
        <Logo>Remédios</Logo>
        <WelcomeText>Olá, {user?.name}.</WelcomeText>
      </Content>
    </Container>
  );
};

const Container = styled(View)`
  height: 50px;
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

const Logo = styled(Text)`
  flex: 1;
  font-size: 20px;
  color: blue;
  text-align: center;
`;

const MenuButton = styled(TouchableOpacity)`
  flex: 1;
`;

const WelcomeText = styled(Text)`
  flex: 1;
  text-align: right;
`;

export default Header;
