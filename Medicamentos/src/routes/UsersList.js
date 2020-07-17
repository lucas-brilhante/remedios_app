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
import removeSpecialCharacters from "../utils/removeSpecialCharacters";
import getNumbers from "../utils/getNumbers";

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

const UserList = ({ handleRoute }) => {
  const user = useUser();
  const searchBarRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const searchUser = (text) => {
    const normalizedText = removeSpecialCharacters(text.trim().toUpperCase());
    const filter = [];
    users.map((user) => {
      const name = `${user.name} ${user.lastName}`;
      const normalizedName = removeSpecialCharacters(name.trim().toUpperCase());
      const normalizedBirthDate = getNumbers(
        stringToFormatedData(user.birthDate)
      );
      const normalizedCpf = getNumbers(user.cpf);
      const profile =
        user.accountType === "admin"
          ? "Administrador"
          : user.accountType === "doctor"
          ? "Médico"
          : "Paciente";
      const normalizedProfile = profile.trim().toUpperCase();
      const isActive = user.isActive ? "Ativo" : "Inativo";
      const normalizedIsActive = isActive.trim().toUpperCase();
      if (
        normalizedName.includes(normalizedText) ||
        normalizedBirthDate.includes(normalizedText) ||
        normalizedProfile.includes(normalizedText) ||
        normalizedCpf.includes(normalizedText) ||
        normalizedIsActive.includes(normalizedText)
      )
        filter.push(user);
    });
    setFilteredUsers(filter);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const apiResponse = await remediosApi.get("users");
        setUsers(apiResponse.data);
        setFilteredUsers(apiResponse.data);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <Container>
      {isFetching ? (
        <ActivityIndicator size="large" color="#ffba08" />
      ) : (
        <List>
          <Title>Lista de Usuários</Title>
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
              placeholder="Digite o Nome/CPF/etc..."
              onChangeText={searchUser}
            />
          </SearchBar>
          <ItemsGrid>
            {filteredUsers.map((user) => (
              <TouchableOpacity key={user.id}>
                <Prescription>
                  <PrescriptionContainer>
                    <PrescriptionTitleGroup>
                      <FontAwesome5 name="user-alt" size={20} color="#03071e" />
                      <PrescriptionTitle>
                        {`${user.name} ${user.lastName}`}
                      </PrescriptionTitle>
                    </PrescriptionTitleGroup>
                    <PrescriptionAttributesGroup>
                      <PrescriptionTextGroup>
                        <PrescriptionBoldText>CPF: </PrescriptionBoldText>
                        <PrescriptionText>{user.cpf}</PrescriptionText>
                      </PrescriptionTextGroup>
                      <PrescriptionTextGroup>
                        <PrescriptionBoldText>Data nasc: </PrescriptionBoldText>
                        <PrescriptionText>
                          {stringToFormatedData(user.birthDate)}
                        </PrescriptionText>
                      </PrescriptionTextGroup>
                      <PrescriptionTextGroup>
                        <PrescriptionBoldText>Perfil: </PrescriptionBoldText>
                        <PrescriptionText>
                          {user.accountType === "admin"
                            ? "Administrador"
                            : user.accountType === "doctor"
                            ? "Médico"
                            : "Paciente"}
                        </PrescriptionText>
                      </PrescriptionTextGroup>
                      <PrescriptionTextGroup>
                        <PrescriptionBoldText>Tipo: </PrescriptionBoldText>
                        <PrescriptionText>
                          {user.isActive === true ? "Ativo" : "Não Ativo"}
                        </PrescriptionText>
                      </PrescriptionTextGroup>
                    </PrescriptionAttributesGroup>
                  </PrescriptionContainer>
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
  height: 240px;
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
  width: 130px;
  font-weight: 700;
`;

const PrescriptionText = styled(Text)`
  font-size: 16px;
  padding: 8px;
  padding-left: 0px;
`;

export default UserList;
