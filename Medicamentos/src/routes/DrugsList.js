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
import { Feather, FontAwesome5 } from "@expo/vector-icons";
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

const DrugList = ({ handleRoute }) => {
  const user = useUser();
  const searchBarRef = useRef(null);
  const [drugs, setDrugs] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const searchDrug = (text) => {
    const normalizedText = text.trim().toUpperCase();
    const filter = [];
    drugs.map((drug) => {
      const normalizedTitle = drug.name.trim().toUpperCase();
      if (normalizedTitle.includes(normalizedText)) filter.push(drug);
    });
    setFilteredDrugs(filter);
  };

  const getDrugs = useCallback(async () => {
    try {
      const apiResponse = await remediosApi.get("drugs");
      setDrugs(apiResponse.data);
      setFilteredDrugs(apiResponse.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getDrugs();
  }, [getDrugs]);

  const deleteDrug = async (drug) => {
    setIsFetching(true);
    try {
      await remediosApi.delete(`drugs/${drug.id}`);
      getDrugs();
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        setIsFetching(false);
        Alert.alert(
          "Erro ao remover",
          "Existe uma receita que utiliza esse medicamento."
        );
      }
    }
  };

  const deleteConfirmation = (drug) => {
    Alert.alert(
      null,
      `Tem certeza que deseja deletar o medicamento ${drug.name}?`,
      [
        {
          text: "Sim",
          onPress: () => {
            deleteDrug(drug);
          },
        },
        { text: "Não", onPress: () => {} },
      ],
      {
        cancelable: false,
      }
    );
  };

  const editDrug = (drug) => {
    handleRoute(routes.addDrug, drug);
  };

  return (
    <Container>
      {isFetching ? (
        <ActivityIndicator size="large" color="#ffba08" />
      ) : (
        <List>
          <Title>Lista de Medicamentos</Title>
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
              placeholder="Digite o nome do medicamento."
              onChangeText={searchDrug}
            />
          </SearchBar>
          <ItemsGrid>
            {filteredDrugs.map((drug) => (
              <TouchableOpacity key={drug.id}>
                <Drug>
                  <DrugContainer>
                    <DrugTitleGroup>
                      <FontAwesome5 name="pills" size={20} color="red" />
                      <DrugTitle>{drug.name}</DrugTitle>
                    </DrugTitleGroup>
                    <DrugAttributesGroup>
                      <DrugTextGroup>
                        <DrugBoldText>Preço: </DrugBoldText>
                        <DrugText>{decimalToBrl(drug.price)}</DrugText>
                      </DrugTextGroup>
                      <DrugTextGroup>
                        <DrugBoldText>Validade: </DrugBoldText>
                        <DrugText>
                          {stringToFormatedData(drug.expirationDate)}
                        </DrugText>
                      </DrugTextGroup>
                      <DrugTextGroup>
                        <DrugBoldText>Categoria: </DrugBoldText>
                        <DrugText>{drug.category.title}</DrugText>
                      </DrugTextGroup>
                    </DrugAttributesGroup>
                  </DrugContainer>
                  {user.accountType === "admin" && (
                    <Fragment>
                      <EditButton onPress={() => editDrug(drug)} />
                      <DeleteButton onPress={() => deleteConfirmation(drug)} />
                    </Fragment>
                  )}
                </Drug>
              </TouchableOpacity>
            ))}
          </ItemsGrid>
        </List>
      )}
    </Container>
  );
};

const Drug = styled(View)`
  height: 200px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: ${2 * StyleSheet.hairlineWidth}px;
  border-color: #000;
`;

const DrugContainer = styled(View)`
  flex: 1;
  flex-direction: column;
`;

const DrugTitleGroup = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const DrugTitle = styled(Text)`
  font-size: 20px;
  padding: 8px;
  padding-left: 16px;
  font-weight: bold;
`;

const DrugAttributesGroup = styled(View)`
  flex-direction: column;
`;

const DrugTextGroup = styled(View)`
  flex-direction: row;
`;
const DrugBoldText = styled(Text)`
  font-size: 16px;
  padding: 8px;
  padding-left: 16px;
  width: 112px;
  font-weight: 700;
`;

const DrugText = styled(Text)`
  font-size: 16px;
  padding: 8px;
  padding-left: 0px;
`;

export default DrugList;
