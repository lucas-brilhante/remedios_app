import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import styled from "styled-components";
import remediosApi from "../services/remediosApi";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { routes } from "../routes";
import useUser from "../hooks/useUsers";
import stringToFormatedData from "../utils/stringToFormatedData";
import decimalToBrl from "../utils/decimalToBrl";

import {
  Container,
  List,
  Title,
  SearchBar,
  SearchInput,
  ItemsGrid,
  DeleteButton,
  EditButton,
} from "../components/ListView";

const MedicalPrescriptionsList = ({ handleRoute }) => {
  const user = useUser();
  const searchBarRef = useRef(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const searchPrescription = (text) => {
    const normalizedText = text.trim().toUpperCase();
    const filter = [];
    prescriptions.map((prescription) => {
      const normalizedDrugName = prescription.drug.name.trim().toUpperCase();
      const normalizedPatientName = prescription.patient.name
        .trim()
        .toUpperCase();
      if (
        normalizedDrugName.includes(normalizedText) ||
        normalizedPatientName.includes(normalizedText)
      )
        filter.push(prescription);
    });
    setFilteredPrescriptions(filter);
  };

  const getPrescriptions = useCallback(async () => {
    try {
      let apiResponse;
      if (user.accountType === "admin")
        apiResponse = await remediosApi.get("medicalprescriptions");
      else
        apiResponse = await remediosApi.get(`medicalprescriptions/${user.id}`);
      setPrescriptions(apiResponse.data);
      setFilteredPrescriptions(apiResponse.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPrescriptions();
  }, [getPrescriptions]);

  const deletePrescription = async (prescription) => {
    setIsFetching(true);
    try {
      await remediosApi.delete(`medicalprescriptions/${prescription.id}`);
      getPrescriptions();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteConfirmation = (prescription) => {
    Alert.alert(
      null,
      `Tem certeza que deseja deletar a receita do paciente ${prescription.patient.name}?`,
      [
        {
          text: "Sim",
          onPress: () => {
            deletePrescription(prescription);
          },
        },
        { text: "Não", onPress: () => {} },
      ],
      {
        cancelable: false,
      }
    );
  };

  const editPrescription = (prescription) => {
    handleRoute(routes.addMedicalPrescription, prescription);
  };

  return (
    <Container>
      {isFetching ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <List>
          <Title>Lista de Receitas</Title>
          <SearchBar>
            <TouchableOpacity
              onPress={() => {
                searchBarRef.current.focus();
              }}
            >
              <Feather name="search" size={20} color="black" />
            </TouchableOpacity>
            <SearchInput
              ref={searchBarRef}
              placeholder="Digite o nome do medicamento ou paciente."
              onChangeText={searchPrescription}
            />
          </SearchBar>
          <ItemsGrid>
            {filteredPrescriptions.map((prescription) => (
              <TouchableOpacity key={prescription.id}>
                <Prescription>
                  <PrescriptionContainer>
                    <PrescriptionTitleGroup>
                      <FontAwesome name="star" size={20} color="orange" />
                      <PrescriptionTitle>
                        {prescription.drug.name}
                      </PrescriptionTitle>
                    </PrescriptionTitleGroup>
                    <PrescriptionAttributesGroup>
                      <PrescriptionTextGroup>
                        <PrescriptionBoldText>Preço: </PrescriptionBoldText>
                        <PrescriptionText>
                          {decimalToBrl(prescription.drug.price)}
                        </PrescriptionText>
                      </PrescriptionTextGroup>
                      <PrescriptionTextGroup>
                        <PrescriptionBoldText>
                          Quantidade:{" "}
                        </PrescriptionBoldText>
                        <PrescriptionText>
                          {prescription.quantity}
                        </PrescriptionText>
                      </PrescriptionTextGroup>
                      <PrescriptionTextGroup>
                        <PrescriptionBoldText>
                          Preço Total:{" "}
                        </PrescriptionBoldText>
                        <PrescriptionText>
                          {decimalToBrl(prescription.totalPrice)}
                        </PrescriptionText>
                      </PrescriptionTextGroup>
                      <PrescriptionTextGroup>
                        <PrescriptionBoldText>Validade: </PrescriptionBoldText>
                        <PrescriptionText>
                          {stringToFormatedData(
                            prescription.drug.expirationDate
                          )}
                        </PrescriptionText>
                      </PrescriptionTextGroup>
                      <PrescriptionTextGroup>
                        <PrescriptionBoldText>Paciente: </PrescriptionBoldText>
                        <PrescriptionText>
                          {prescription.patient.name}
                        </PrescriptionText>
                      </PrescriptionTextGroup>
                      <PrescriptionTextGroup>
                        <PrescriptionBoldText>
                          Receitado por:{" "}
                        </PrescriptionBoldText>
                        <PrescriptionText>
                          {prescription.doctor.name}
                        </PrescriptionText>
                      </PrescriptionTextGroup>
                    </PrescriptionAttributesGroup>
                  </PrescriptionContainer>
                  {user.accountType === "admin" && (
                    <Fragment>
                      <EditButton
                        onPress={() => editPrescription(prescription)}
                      />
                      <DeleteButton
                        onPress={() => deleteConfirmation(prescription)}
                      />
                    </Fragment>
                  )}
                </Prescription>
              </TouchableOpacity>
            ))}
          </ItemsGrid>
        </List>
      )}
    </Container>
  );
};

const Prescription = styled(View)`
  height: 320px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: ${2 * StyleSheet.hairlineWidth}px;
  border-color: #000;
`;

const PrescriptionContainer = styled(View)`
  flex: 1;
  flex-direction: column;
`;

const PrescriptionTitleGroup = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const PrescriptionTitle = styled(Text)`
  font-size: 20px;
  padding: 8px;
  padding-left: 16px;
  font-weight: bold;
`;

const PrescriptionAttributesGroup = styled(View)`
  flex-direction: column;
`;

const PrescriptionTextGroup = styled(View)`
  flex-direction: row;
`;
const PrescriptionBoldText = styled(Text)`
  font-size: 16px;
  padding: 8px;
  padding-left: 16px;
  width: 120px;
  font-weight: 700;
`;

const PrescriptionText = styled(Text)`
  font-size: 16px;
  padding: 8px;
  padding-left: 0px;
`;

export default MedicalPrescriptionsList;
