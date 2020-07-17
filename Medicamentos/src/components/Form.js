import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const KeyboardAvoiding = styled(KeyboardAwareScrollView).attrs({
  extraScrollHeight: 200,
  enableAutomaticScroll: true,
  enableOnAndroid: true,
})``;

export const Container = styled(View)`
  flex: 1;
  background-color: #95d5b2;
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
  background-color: #d8f3dc;
`;

export const MaskedInput = styled(TextInputMask)`
  width: 100%;
  height: 40px;
  border-width: 1px;
  border-color: #777;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 16px;
  background-color: #d8f3dc;
`;

export const PickerView = styled(View)`
  height: 40px;
  justify-content: center;
  border-width: 1px;
  border-color: #777;
  border-radius: 5px;
  margin-bottom: 16px;
  background-color: #d8f3dc;
  padding-right: 8px;
`;

export const Button = styled(TouchableOpacity)`
  padding: 8px;
  border-width: 1px;
  border-color: #aaa;
  border-radius: 24px;
  background-color: #081c15;
  height: 48px;
  justify-content: center;
  margin-top: 16px;
`;

export const ButtonAsInput = styled(View)`
  width: 100%;
  height: 40px;
  border-width: 1px;
  border-color: #777;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 16px;
  background-color: #d8f3dc;
`;

export const ButtonText = styled(Text)`
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
  color: #d8f3dc;
`;

export const ErrorMessage = styled(Text)`
  color: red;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
`;
