import React, { useState } from "react";
import styled from "styled-components";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import remediosApi from "../services/remediosApi";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CategoryForm = () => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [error, setError] = useState("");

  const addUser = async () => {
    const category = {
      title: categoryTitle,
    };

    try {
      const apiResponse = await remediosApi.post("categories", { ...category });
      console.log(apiResponse.data);
    } catch (error) {
      const errorList = error.response.data.errors;
      const errorKey = Object.keys(errorList)[0];
      setError(errorList[errorKey][0]);
    }
  };

  return (
    <Container>
      <Form>
        <Title>Cadastrar Categoria</Title>
        <Label>Nome da Categoria</Label>
        <Input value={categoryTitle} onChangeText={setCategoryTitle} />
        <ErrorMessage>{error}</ErrorMessage>
        <Button onPress={addUser}>
          <ButtonText>Cadastrar</ButtonText>
        </Button>
      </Form>
    </Container>
  );
};

const Container = styled(KeyboardAwareScrollView).attrs({
  extraHeight: 220,
  enableAutomaticScroll: true,
  enableOnAndroid: true,
})`
  flex: 1;
`;

const Form = styled(View)`
  padding: 24px;
`;

const Title = styled(Text)`
  font-size: 24px;
  margin-bottom: 20px;
  font-family: "Abel";
`;

const Label = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #444;
  margin-bottom: 8px;
`;

const Input = styled(TextInput)`
  width: 100%;
  height: 40px;
  border-width: 1px;
  border-color: #777;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 16px;
  background-color: #f1f1f1;
`;

const Button = styled(TouchableOpacity)`
  background-color: yellow;
  padding: 8px;
  border-width: 1px;
  border-color: #aaa;
  border-radius: 24px;
  background-color: yellow;
  height: 48px;
  justify-content: center;
  margin-top: 16px;
`;

const ButtonText = styled(Text)`
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
`;

const ErrorMessage = styled(Text)`
  color: red;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
`;

export default CategoryForm;
