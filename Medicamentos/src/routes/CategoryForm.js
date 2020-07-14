import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

const CategoryForm = () => {
  return (
    <Container>
      <WelcomeText>formulario de categorias</WelcomeText>
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

export default CategoryForm;
