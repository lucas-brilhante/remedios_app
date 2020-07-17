import React, { useState } from 'react';
import styled from 'styled-components';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Picker, DatePicker } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { firebaseAuth, remediosApi } from '../services';
import { signIn } from '../store';

import {
  Form,
  Label,
  Input,
  Button,
  ButtonText,
  ErrorMessage,
  KeyboardAvoiding,
  MaskedInput,
  PickerView,
} from '../components/Form';

const UserForm = () => {
  const date = new Date();
  const [accountType, setAccountType] = useState('normal');
  const [crmNumber, setCrmNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [token, setToken] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const createUser = async () => {
    const user = {
      login,
      password,
      name,
      lastName,
      cpf,
      birthDate: birthDate !== '' ? birthDate : '9999-11-11',
      isActive: true,
      crmNumber: accountType === 'doctor' ? crmNumber : null,
      registrationNumber: accountType === 'admin' ? registrationNumber : null,
      token: accountType === 'admin' ? token : null,
    };

    setIsFetching(true);
    try {
      const response = await remediosApi.post('users', { ...user });
      try {
        await firebaseAuth.createUserWithEmailAndPassword(login, password);
        dispatch(signIn(response.data));
        navigation.navigate('Home');
      } catch (error) {
        setErrorMessage(error);
        setIsFetching(false);
      }
    } catch (error) {
      const errorList = error.response.data.errors;
      const errorKey = Object.keys(errorList)[0];
      setErrorMessage(errorList[errorKey][0]);
      setIsFetching(false);
    }
  };

  return (
    <Container>
      <KeyboardAvoiding keyboardShouldPersistTaps='handled'>
        <Form>
          <Label>Tipo de Usuário</Label>
          <PickerView>
            <Picker
              mode='dropdown'
              iosIcon={<Feather name='chevron-down' />}
              placeholder=''
              placeholderStyle={{ fontSize: 16 }}
              selectedValue={accountType}
              onValueChange={setAccountType}
            >
              <Picker.Item label='Normal' value='normal' />
              <Picker.Item label='Médico' value='doctor' />
              <Picker.Item label='Administrador' value='admin' />
            </Picker>
          </PickerView>
          {accountType === 'admin' && (
            <>
              <Label>Número de Matrícula</Label>
              <Input
                value={registrationNumber}
                onChangeText={setRegistrationNumber}
              />
              <Label>Token</Label>
              <Input value={token} onChangeText={setToken} />
            </>
          )}
          {accountType === 'doctor' && (
            <>
              <Label>Número de CRM</Label>
              <Input value={crmNumber} onChangeText={setCrmNumber} />
            </>
          )}
          <Label>Login</Label>
          <Input
            value={login}
            onChangeText={setLogin}
            autoCapitalize='none'
            autoCompleteType='username'
          />
          <Label>Senha</Label>
          <Input
            value={password}
            onChangeText={setPassword}
            autoCapitalize='none'
            textContentType='password'
            secureTextEntry
          />
          <Label>Nome</Label>
          <Input value={name} onChangeText={setName} />
          <Label>Sobrenome</Label>
          <Input value={lastName} onChangeText={setLastName} />
          <Label>CPF</Label>
          <MaskedInput type='cpf' value={cpf} onChangeText={setCpf} />
          <Label>Data de nascimento</Label>
          <PickerView>
            <DatePicker
              minimumDate={new Date(date.getFullYear() - 100, 0, 1)}
              maximumDate={new Date(date.getFullYear() - 1, 11, 31)}
              locale='pt'
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType='fade'
              androidMode='default'
              placeHolderText='Selecione a data.'
              placeHolderTextStyle={{ color: '#999' }}
              onDateChange={setBirthDate}
              disabled={false}
            />
          </PickerView>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          {isFetching ? (
            <Button>
              <ActivityIndicator size='small' color='#ffba08' />
            </Button>
          ) : (
            <Button onPress={createUser}>
              <ButtonText>Cadastrar</ButtonText>
            </Button>
          )}
        </Form>
      </KeyboardAvoiding>
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #95d5b2;
`;
export default UserForm;
