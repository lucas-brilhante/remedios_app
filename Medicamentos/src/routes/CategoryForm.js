import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import remediosApi from "../services/remediosApi";
import {
  Container,
  Form,
  Title,
  Label,
  Input,
  Button,
  ButtonText,
  ErrorMessage,
} from "../components/Form";
import { routes } from "../routes";

const CategoryForm = ({ handleRoute, routeProps: category = null }) => {
  const [categoryId, setCategoryId] = useState(category ? category.id : 0);
  const [categoryTitle, setCategoryTitle] = useState(
    category ? category.title : ""
  );
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const createCategory = async () => {
    const category = {
      title: categoryTitle,
    };
    setError("");
    setIsFetching(true);
    try {
      await remediosApi.post("categories", { ...category });
      Alert.alert(
        null,
        "Categoria cadastrada com sucesso",
        [{ text: "Ok", onPress: () => handleRoute(routes.welcome) }],
        {
          cancelable: false,
        }
      );
    } catch (error) {
      const errorList = error.response.data.errors;
      const errorKey = Object.keys(errorList)[0];
      setError(errorList[errorKey][0]);
    }
    setIsFetching(false);
  };

  const updateCategory = async () => {
    const category = {
      id: categoryId,
      title: categoryTitle,
    };
    setError("");
    setIsFetching(true);
    try {
      const apiResponse = await remediosApi.put(`categories/${categoryId}`, {
        ...category,
      });
      Alert.alert(
        null,
        "Categoria editada com sucesso",
        [{ text: "Ok", onPress: () => handleRoute(routes.welcome) }],
        {
          cancelable: false,
        }
      );
    } catch (error) {
      const errorList = error.response.data.errors;
      const errorKey = Object.keys(errorList)[0];
      setError(errorList[errorKey][0]);
    }
    setIsFetching(false);
  };

  return (
    <Container>
      <Form>
        <Title>{category ? "Editar" : "Cadastrar"} Categoria</Title>
        <Label>Nome da Categoria</Label>
        <Input value={categoryTitle} onChangeText={setCategoryTitle} />
        <ErrorMessage>{error}</ErrorMessage>
        {isFetching ? (
          <Button>
            <ActivityIndicator size="small" color="#0000ff" />
          </Button>
        ) : (
          <Button onPress={category ? updateCategory : createCategory}>
            <ButtonText>{category ? "Editar" : "Cadastrar"}</ButtonText>
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default CategoryForm;
