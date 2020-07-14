import React, { Fragment, useState } from "react";
import styled from "styled-components";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import getNormalizedDate from "../utils/getNormalizedDate";
import { useDispatch } from "react-redux";
import { setUser } from "../store/modules/user";

const CreateNewUser = () => {
  const date = new Date();
  const [accountType, setAccountType] = useState("normal");
  const [crmNumber, setCrmNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [token, setToken] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());

  const [showDataPicker, SetShowDataPicker] = useState(false);
  const [error, setError] = useState("");
  const [dateSelected, setDateSelected] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const showDatePicker = () => {
    SetShowDataPicker(true);
  };

  const onChangeData = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    SetShowDataPicker(Platform.OS === "ios");
    setBirthDate(currentDate);
    setDateSelected(true);
  };

  const createUser = async () => {
    const user = {
      login,
      name,
      lastName,
      cpf,
      birthDate: dateSelected ? birthDate : "",
      isActive: true,
      crmNumber: accountType === "doctor" ? crmNumber : null,
      registrationNumber: accountType === "admin" ? registrationNumber : null,
      token: accountType === "admin" ? token : null,
    };

    try {
      const response = await remediosApi.post("users", { ...user });
      try {
        await firebaseAuth.createUserWithEmailAndPassword(login, password);
        dispatch(setUser(response.data));
        navigation.navigate("Home");
      } catch (error) {
        setError(error);
      }
    } catch (error) {
      const errorList = error.response.data.errors;
      const errorKey = Object.keys(errorList)[0];
      setError(errorList[errorKey][0]);
    }
  };

  return (
    <Container>
      <KeyboardAvoiding>
        {showDataPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            minimumDate={new Date(date.getFullYear() - 100, 0, 1)}
            maximumDate={new Date(date.getFullYear() - 1, 11, 31)}
            value={birthDate}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChangeData}
          />
        )}
        <Form>
          <Label>Tipo de Usuário</Label>
          <PickerView>
            <Picker
              style={{ width: "100%", height: "100%" }}
              selectedValue={accountType}
              onValueChange={(itemValue, itemIndex) =>
                setAccountType(itemValue)
              }
            >
              <Picker.Item label="Normal" value="normal" />
              <Picker.Item label="Médico" value="doctor" />
              <Picker.Item label="Administrador" value="admin" />
            </Picker>
          </PickerView>
          {accountType === "admin" && (
            <Fragment>
              <Label>Número de Matrícula</Label>
              <Input
                value={registrationNumber}
                onChangeText={setRegistrationNumber}
              />
              <Label>Token</Label>
              <Input value={token} onChangeText={setToken} />
            </Fragment>
          )}
          {accountType === "doctor" && (
            <Fragment>
              <Label>Número de CRM</Label>
              <Input value={crmNumber} onChangeText={setCrmNumber} />
            </Fragment>
          )}
          <Label>Login</Label>
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
          <Label>Nome</Label>
          <Input value={name} onChangeText={setName} />
          <Label>Sobrenome</Label>
          <Input value={lastName} onChangeText={setLastName} />
          <Label>CPF</Label>
          <CpfInput type={"cpf"} value={cpf} onChangeText={setCpf} />
          <Label>Data de nascimento</Label>
          <TouchableOpacity onPress={showDatePicker} activeOpacity={1}>
            <ButtonInput>
              <Text>
                {dateSelected ? getNormalizedDate(birthDate) : "__/__/____"}
              </Text>
            </ButtonInput>
          </TouchableOpacity>
          <ErrorMessage>{error}</ErrorMessage>
          <Button onPress={createUser}>
            <ButtonText>Cadastrar</ButtonText>
          </Button>
        </Form>
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

const Form = styled(View)`
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

const CpfInput = styled(TextInputMask)`
  width: 100%;
  height: 40px;
  border-width: 1px;
  border-color: #777;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 16px;
  background-color: #f1f1f1;
`;

const ButtonInput = styled(View)`
  width: 100%;
  height: 40px;
  border-width: 1px;
  border-color: #777;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 16px;
  background-color: #f1f1f1;
`;

const PickerView = styled(View)`
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
export default CreateNewUser;
