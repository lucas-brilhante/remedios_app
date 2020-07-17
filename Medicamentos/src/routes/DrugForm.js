import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";
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
  KeyboardAvoiding,
  MaskedInput,
  PickerView,
  ButtonAsInput,
} from "../components/Form";
import { routes } from "../routes";
import parseCurrencyToDecimal from "../utils/parseCurrencyToDecimal";
import getNormalizedDate from "../utils/getNormalizedDate";
import { Feather } from "@expo/vector-icons";
import { Picker, DatePicker } from "native-base";

const DrugForm = ({ handleRoute, routeProps: drug = null }) => {
  const [drugId, setDrugId] = useState(drug ? drug.id : 0);
  const [drugName, setDrugName] = useState(drug ? drug.name : "");
  const [drugPrice, setDrugPrice] = useState(
    drug ? drug.price.toFixed(2) : "0.0"
  );
  const [drugExpirationDate, setDrugExpirationDate] = useState(
    drug ? new Date(drug.expirationDate.slice(0, 10)) : ""
  );
  const [drugCategoryId, setDrugCategoryId] = useState(
    drug ? drug.category.id : -1
  );
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

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
      expirationDate:
        drugExpirationDate !== "" ? drugExpirationDate : "1111-11-11",
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
      await remediosApi.put(`drugs/${drugId}`, {
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

  return (
    <KeyboardAvoiding keyboardShouldPersistTaps="handled">
      <Container>
        {isLoadingPage ? (
          <View
            style={{
              padding: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#ffba08" />
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
            <PickerView>
              <DatePicker
                defaultDate={
                  drugExpirationDate !== "" ? drugExpirationDate : null
                }
                minimumDate={new Date()}
                locale={"pt"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText={
                  drugExpirationDate !== ""
                    ? getNormalizedDate(drugExpirationDate)
                    : "Selecione a data."
                }
                placeHolderTextStyle={{ color: "#999" }}
                onDateChange={setDrugExpirationDate}
                disabled={false}
              />
            </PickerView>
            <Label>Categoria</Label>
            <PickerView>
              <Picker
                mode="dropdown"
                iosIcon={<Feather name="chevron-down" />}
                placeholder="Selecione a categoria"
                placeholderStyle={{ fontSize: 16, color: "#999" }}
                selectedValue={drugCategoryId}
                onValueChange={(itemValue, itemIndex) => {
                  Keyboard.dismiss();
                  setDrugCategoryId(itemValue);
                }}
              >
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
                <ActivityIndicator size="small" color="#ffba08" />
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
