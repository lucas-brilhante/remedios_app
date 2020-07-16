import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  Picker,
  Keyboard,
} from "react-native";
import remediosApi from "../services/remediosApi";
import {
  Container,
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
import { routes } from "../routes";
import DateTimePicker from "@react-native-community/datetimepicker";
import getNormalizedDate from "../utils/getNormalizedDate";
import parseCurrencyToDecimal from "../utils/parseCurrencyToDecimal";
import getCurrentDate from "../utils/getCurrentDate";

const DrugForm = ({ handleRoute, routeProps: drug = null }) => {
  const height = Dimensions.get("screen").height;
  const [drugId, setDrugId] = useState(drug ? drug.id : 0);
  const [drugName, setDrugName] = useState(drug ? drug.name : "");
  const [drugPrice, setDrugPrice] = useState(
    drug ? drug.price.toString() : "0.0"
  );
  const [drugExpirationDate, setDrugExpirationDate] = useState(
    drug ? new Date(drug.expirationDate.slice(0, 10)) : new Date()
  );
  const [drugCategoryId, setDrugCategoryId] = useState(
    drug ? drug.category.id : -1
  );
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [showDataPicker, setShowDataPicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(drug ? true : false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const apiResponse = await remediosApi.get("categories");
        setCategories(apiResponse.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoadingPage(false);
    };
    getCategories();
  }, []);

  const createDrug = async () => {
    const drug = {
      name: drugName,
      price: parseCurrencyToDecimal(drugPrice),
      expirationDate: dateSelected ? drugExpirationDate : "1111-11-11",
      categoryId: drugCategoryId,
    };

    setError("");
    setIsFetching(true);
    try {
      await remediosApi.post("drugs", { ...drug });
      Alert.alert(
        null,
        "Medicamento cadastrado com sucesso",
        [{ text: "Ok", onPress: () => handleRoute(routes.listDrugs) }],
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

  const updateDrug = async () => {
    const drug = {
      id: drugId,
      name: drugName,
      price: parseCurrencyToDecimal(drugPrice),
      expirationDate: drugExpirationDate,
      categoryId: drugCategoryId,
    };

    console.log("teste", drug);

    setError("");
    setIsFetching(true);
    try {
      const apiResponse = await remediosApi.put(`drugs/${drugId}`, {
        ...drug,
      });
      Alert.alert(
        null,
        "Medicamento editado com sucesso",
        [{ text: "Ok", onPress: () => handleRoute(routes.listDrugs) }],
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

  const onChangeData = (event, selectedDate) => {
    const currentDate = selectedDate || drugExpirationDate;
    setShowDataPicker(Platform.OS === "ios");
    setDrugExpirationDate(currentDate);
    setDateSelected(true);
  };

  return (
    <KeyboardAvoiding keyboardShouldPersistTaps="handled">
      <Container>
        {showDataPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            minimumDate={new Date()}
            value={drugExpirationDate}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChangeData}
          />
        )}
        {isLoadingPage ? (
          <View
            style={{
              padding: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <Form>
            <Title>{drug ? "Editar" : "Cadastrar"} Medicamento</Title>
            <Label>Nome do Medicamento</Label>
            <Input value={drugName} onChangeText={setDrugName} />
            <Label>Preço</Label>
            <MaskedInput
              type={"money"}
              value={drugPrice}
              onChangeText={setDrugPrice}
            />
            <Label>Data de Validade</Label>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setShowDataPicker(true);
              }}
              activeOpacity={1}
            >
              <ButtonAsInput>
                <Text>
                  {dateSelected
                    ? getNormalizedDate(drugExpirationDate)
                    : "__/__/____"}
                </Text>
              </ButtonAsInput>
            </TouchableOpacity>
            <Label>Categoria</Label>
            <PickerView>
              <Picker
                style={{ width: "100%", height: "100%" }}
                selectedValue={drugCategoryId}
                onValueChange={(itemValue, itemIndex) => {
                  Keyboard.dismiss();
                  setDrugCategoryId(itemValue);
                }}
              >
                <Picker.Item label="Selecione uma categoria" value={-1} />
                {categories.map((category) => (
                  <Picker.Item
                    key={category.id}
                    label={category.title}
                    value={category.id}
                  />
                ))}
              </Picker>
            </PickerView>
            <ErrorMessage>{error}</ErrorMessage>
            {isFetching ? (
              <Button>
                <ActivityIndicator size="small" color="#0000ff" />
              </Button>
            ) : (
              <Button onPress={drug ? updateDrug : createDrug}>
                <ButtonText>{drug ? "Editar" : "Cadastrar"}</ButtonText>
              </Button>
            )}
          </Form>
        )}
      </Container>
    </KeyboardAvoiding>
  );
};

export default DrugForm;
