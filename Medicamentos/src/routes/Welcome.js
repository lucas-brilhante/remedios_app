import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import { useUser } from "../hooks";

const Welcome = () => {
  const user = useUser();
  return (
    <Container>
      {user.isActive ? (
        <WelcomeText>Seja Bem-vindo!</WelcomeText>
      ) : (
        <WarningText>
          Sua conta não está ativada e está impossibilitada de receber receitas.
        </WarningText>
      )}
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #95d5b2;
  padding: 20px;
`;

const WelcomeText = styled(Text)`
  font-size: 32px;
`;

const WarningText = styled(Text)`
  font-size: 24px;
  color: red;
  text-align: center;
`;

export default Welcome;
