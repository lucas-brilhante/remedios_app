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
import useUser from "../hooks/useUsers";
import getNumbers from "../utils/getNumbers";
import { Feather } from "@expo/vector-icons";
import { Picker, DatePicker } from "native-base";

const MedicalPrescriptionForm = ({
  handleRoute,
  routeProps: prescription = null,
}) => {
  const user = useUser();
  const [id, setId] = useState(prescription ? prescription.id : 0);
  const [doctorId, setDoctorId] = useState(
    prescription ? prescription.doctor.id : -1
  );
  const [patientId, setPatientId] = useState(
    prescription ? prescription.patient.id : -1
  );
  const [drugId, setDrugId] = useState(
    prescription ? prescription.drug.id : -1
  );
  const [quantity, setQuantity] = useState(
    prescription ? prescription.quantity.toString() : ""
  );

  const [patients, setPatients] = useState([]);
  const [drugs, setDrugs] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPatientsAndDrugs = async () => {
      try {
        const patientsResponse = await remediosApi.get("patients");
        setPatients(patientsResponse.data);

        const drugsResponse = await remediosApi.get("drugs");
        setDrugs(drugsResponse.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoadingPage(false);
    };
    getPatientsAndDrugs();
  }, []);

  const createPrescription = async () => {
    const prescription = {
      doctorId: user.id,
      patientId,
      drugId,
      quantity: quantity !== "" ? Number(quantity) : -1,
    };

    setError("");
    setIsFetching(true);
    try {
      await remediosApi.post("medicalprescriptions", { ...prescription });
      Alert.alert(
        null,
        "Receita criada com sucesso",
        [
          {
            text: "Ok",
            onPress: () => handleRoute(routes.listMedicalPrescriptions),
          },
        ],
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

  const updatePrescription = async () => {
    const prescription = {
      id,
      doctorId: doctorId,
      patientId,
      drugId,
      quantity: quantity !== "" ? Number(quantity) : -1,
    };

    setError("");
    setIsFetching(true);
    try {
      await remediosApi.put(`medicalprescriptions/${id}`, {
        ...prescription,
      });
      Alert.alert(
        null,
        "Receita editada com sucesso",
        [
          {
            text: "Ok",
            onPress: () => handleRoute(routes.listMedicalPrescriptions),
          },
        ],
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
            <Title>{prescription ? "Editar" : "Cadastrar"} Receita</Title>
            <Label>Paciente</Label>
            <PickerView>
              <Picker
                mode="dropdown"
                iosIcon={<Feather name="chevron-down" />}
                placeholder="Selecione o paciente."
                placeholderStyle={{ fontSize: 16, color: "#999" }}
                selectedValue={patientId}
                onValueChange={(itemValue, itemIndex) => {
                  Keyboard.dismiss();
                  setPatientId(itemValue);
                }}
              >
                {patients.map((patient) => (
                  <Picker.Item
                    key={patient.id}
                    label={`${patient.name} ${patient.lastName}`}
                    value={patient.id}
                  />
                ))}
              </Picker>
            </PickerView>
            <Label>Medicamento</Label>
            <PickerView>
              <Picker
                mode="dropdown"
                iosIcon={<Feather name="chevron-down" />}
                placeholder="Selecione o medicamento."
                placeholderStyle={{ fontSize: 16, color: "#999" }}
                selectedValue={drugId}
                onValueChange={(itemValue, itemIndex) => {
                  Keyboard.dismiss();
                  setDrugId(itemValue);
                }}
              >
                {drugs.map((drug) => (
                  <Picker.Item
                    key={drug.id}
                    label={drug.name}
                    value={drug.id}
                  />
                ))}
              </Picker>
            </PickerView>
            <Label>Quantidade</Label>
            <Input
              value={quantity}
              onChangeText={(text) => setQuantity(getNumbers(text))}
              keyboardType="number-pad"
            />
            <ErrorMessage>{error}</ErrorMessage>
            {isFetching ? (
              <Button>
                <ActivityIndicator size="small" color="#ffba08" />
              </Button>
            ) : (
              <Button
                onPress={prescription ? updatePrescription : createPrescription}
              >
                <ButtonText>{prescription ? "Editar" : "Cadastrar"}</ButtonText>
              </Button>
            )}
          </Form>
        )}
      </Container>
    </KeyboardAvoiding>
  );
};

export default MedicalPrescriptionForm;
