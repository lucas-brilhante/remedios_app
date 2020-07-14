import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import firebaseAuth from "../services/firebaseAuth";
import remediosApi from "../services/remediosApi";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { setUser } from "../store/modules/user";

const Authentication = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const signIn = async () => {
    setError("");
    try {
      const firebaseResponse = await firebaseAuth.signInWithEmailAndPassword(
        login,
        password
      );
      try {
        const apiResponse = await remediosApi.get(`users/${login}`);
        dispatch(setUser(apiResponse.data));
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      setError("Usuário ou Senha inválido.");
    }
  };

  const move = () => {
    navigation.navigate("Create User", { teste: 121 });
  };

  return (
    <Container>
      <KeyboardAvoiding>
        <Content>
          <Logo>Remédios</Logo>
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
          <Button onPress={signIn}>
            <ButtonText>Entrar</ButtonText>
          </Button>
          <LinkContainer>
            <LinkText>{"Não tem cadastro? "}</LinkText>
            <TouchableOpacity onPress={move}>
              <AcessLinkText>Clique Aqui!</AcessLinkText>
            </TouchableOpacity>
          </LinkContainer>
        </Content>
      </KeyboardAvoiding>
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ddd;
`;

const KeyboardAvoiding = styled(KeyboardAwareScrollView).attrs({
  extraHeight: 220,
  enableAutomaticScroll: true,
  enableOnAndroid: true,
})``;

const Content = styled(View)`
  padding: 24px;
`;

const Logo = styled(Text)`
  font-size: 32px;
  color: #2a32de;
  text-align: center;
  padding: 24px;
`;

const Title = styled(Text)`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
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
