import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { remediosApi } from '../services';
import { routes } from './routes';
import {
  Container,
  Form,
  Title,
  Label,
  Input,
  Button,
  ButtonText,
  ErrorMessage,
  KeyboardAvoiding,
} from '../components/Form';

const CategoryForm = ({ handleRoute, routeProps: category = null }) => {
  const categoryId = category ? category.id : 0;
  const [categoryTitle, setCategoryTitle] = useState(
    category ? category.title : ''
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const createCategory = async () => {
    const newCategory = {
      title: categoryTitle,
    };
    setErrorMessage('');
    setIsFetching(true);
    try {
      await remediosApi.post('categories', { ...newCategory });
      Alert.alert(
        null,
        'Categoria cadastrada com sucesso',
        [{ text: 'Ok', onPress: () => handleRoute(routes.listCategories) }],
        {
          cancelable: false,
        }
      );
    } catch (error) {
      const errorList = error.response.data.errors;
      const errorKey = Object.keys(errorList)[0];
      setErrorMessage(errorList[errorKey][0]);
    }
    setIsFetching(false);
  };

  const updateCategory = async () => {
    const updatedCategory = {
      id: categoryId,
      title: categoryTitle,
    };
    setErrorMessage('');
    setIsFetching(true);
    try {
      await remediosApi.put(`categories/${categoryId}`, {
        ...updatedCategory,
      });
      Alert.alert(
        null,
        'Categoria editada com sucesso',
        [{ text: 'Ok', onPress: () => handleRoute(routes.listCategories) }],
        {
          cancelable: false,
        }
      );
    } catch (error) {
      const errorList = error.response.data.errors;
      const errorKey = Object.keys(errorList)[0];
      setErrorMessage(errorList[errorKey][0]);
    }
    setIsFetching(false);
  };

  return (
    <KeyboardAvoiding>
      <Container>
        <Form>
          <Title>{category ? 'Editar' : 'Cadastrar'} Categoria</Title>
          <Label>Nome da Categoria</Label>
          <Input value={categoryTitle} onChangeText={setCategoryTitle} />
          <ErrorMessage>{errorMessage}</ErrorMessage>
          {isFetching ? (
            <Button>
              <ActivityIndicator size='small' color='#ffba08' />
            </Button>
          ) : (
            <Button onPress={category ? updateCategory : createCategory}>
              <ButtonText>{category ? 'Editar' : 'Cadastrar'}</ButtonText>
            </Button>
          )}
        </Form>
      </Container>
    </KeyboardAvoiding>
  );
};

export default CategoryForm;
