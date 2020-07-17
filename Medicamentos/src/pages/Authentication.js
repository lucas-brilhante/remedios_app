import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import firebaseAuth from "../services/firebaseAuth";
import remediosApi from "../services/remediosApi";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setUser } from "../store/modules/user";

import {
  Form,
  Content,
  Title,
  Label,
  Input,
  Button,
  ButtonText,
  ErrorMessage,
  KeyboardAvoiding,
  MaskedInput,
  PickerView,
  ButtonAsInput,
} from "../components/Form";

const Authentication = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const signIn = async () => {
    setIsFetching(true);
    setError("");
    try {
      await firebaseAuth.signInWithEmailAndPassword(login, password);
      try {
        const apiResponse = await remediosApi.get(`users/${login}`);
        dispatch(setUser(apiResponse.data));
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
        setIsFetching(false);
      }
    } catch (error) {
      setError("Usuário ou Senha inválido.");
      setIsFetching(false);
    }
  };

  const move = () => {
    navigation.navigate("Create User");
  };

  return (
    <Container>
      <KeyboardAvoiding keyboardShouldPersistTaps="handled">
        <Form>
          <Logo>Medicamentos</Logo>
          <Title>Login</Title>
          <Label>Usuário</Label>
          <Input
            value={login}
            onChangeText={setLogin}
            autoCapitalize="none"
            autoCompleteType="username"
          />
          <Label>Senha</Label>
          <Input
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            textContentType="password"
          />
          <ErrorMessage>{error}</ErrorMessage>
          {isFetching ? (
            <Button>
              <ActivityIndicator size="small" color="#ffba08" />
            </Button>
          ) : (
            <Button onPress={signIn}>
              <ButtonText>Entrar</ButtonText>
            </Button>
          )}
          <LinkContainer>
            <LinkText>{"Não tem cadastro? "}</LinkText>
            <TouchableOpacity onPress={move}>
              <AcessLinkText>Clique Aqui!</AcessLinkText>
            </TouchableOpacity>
          </LinkContainer>
        </Form>
      </KeyboardAvoiding>
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #95d5b2;
`;

const Logo = styled(Text)`
  font-size: 40px;
  padding: 16px;
  color: green;
  text-align: center;
  font-family: "Bangers";
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
`;

const LinkContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 24px;
`;

const LinkText = styled(Text)`
  font-size: 16px;
`;

const AcessLinkText = styled(Text)`
  color: blue;
  font-size: 16px;
`;

export default Authentication;
