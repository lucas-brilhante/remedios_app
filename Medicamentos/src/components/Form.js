import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components";

export const Container = styled(KeyboardAwareScrollView).attrs({
  extraHeight: 220,
  enableAutomaticScroll: true,
  enableOnAndroid: true,
})`
  flex: 1;
`;

export const Form = styled(View)`
  padding: 24px;
`;

export const Title = styled(Text)`
  font-size: 24px;
  margin-bottom: 20px;
  font-family: "Abel";
`;

export const Label = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #444;
  margin-bottom: 8px;
`;

export const Input = styled(TextInput)`
  width: 100%;
  height: 40px;
  border-width: 1px;
  border-color: #777;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 16px;
  background-color: #f1f1f1;
`;

export const Button = styled(TouchableOpacity)`
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

export const ButtonText = styled(Text)`
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
`;

export const ErrorMessage = styled(Text)`
  color: red;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
`;
