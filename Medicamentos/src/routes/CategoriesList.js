import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

const CategoriesList = () => {
  return (
    <Container>
      <WelcomeText>Lista de Categorias</WelcomeText>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const WelcomeText = styled(Text)`
  font-size: 32px;
`;

export default CategoriesList;
