import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useUser } from '../hooks';
import { routes } from '../routes/routes';

const Header = ({ color, handleSideDrawer, handleRoute }) => {
  const user = useUser();
  return (
    <Container color={color}>
      <Content>
        <MenuButton>
          <TouchableOpacity onPress={() => handleSideDrawer((state) => !state)}>
            <Feather name='menu' size={32} color='black' />
          </TouchableOpacity>
        </MenuButton>
        <MenuContainer>
          <TouchableOpacity onPress={() => handleRoute(routes.welcome)}>
            <Logo>Medicamentos</Logo>
          </TouchableOpacity>
        </MenuContainer>
        <WelcomeContainer>
          <View>
            <Text>Olá,</Text>
            <Text>{user.name}.</Text>
          </View>
        </WelcomeContainer>
      </Content>
    </Container>
  );
};

const Container = styled(View)`
  height: 64px;
  background-color: ${({ color }) => color || 'black'};
  border-bottom-width: ${3 * StyleSheet.hairlineWidth}px;
  border-color: #000;
`;

const Content = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  padding: 16px;
  padding-bottom: 4px;
`;
const MenuContainer = styled(View)`
  flex: 3;
  justify-content: flex-end;
  align-items: center;
  margin: 0 auto;
`;
const Logo = styled(Text)`
  font-size: 32px;
  color: green;
  text-align: center;
  font-family: 'Bangers';
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
`;

const MenuButton = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`;
const WelcomeContainer = styled(View)`
  flex: 1;
  align-items: flex-end;
`;

export default Header;
