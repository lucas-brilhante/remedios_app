import React, { Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import styled from "styled-components";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { routes } from "../routes";
import useUser from "../hooks/useUsers";
import { useNavigation } from "@react-navigation/native";
import firebaseAuth from "../services/firebaseAuth";
import { useDispatch } from "react-redux";
import { logOut } from "../store/modules/user";

const Menu = ({ handleSideDrawer, handleRoute }) => {
  const user = useUser();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await firebaseAuth.signOut();
      dispatch(logOut());
      navigation.navigate("Authentication");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Menu</Title>
        <MenuCloseButton onPress={() => handleSideDrawer(false)}>
          <Feather name="arrow-left" size={32} color="black" />
        </MenuCloseButton>
      </Header>
      <ScrollView>
        {user.accountType !== "patient" && (
          <Fragment>
            <MenuItem>
              <MenuTitleGroup>
                <FontAwesome name="star" size={20} color="orange" />
                <MenuTitle>Categorias</MenuTitle>
              </MenuTitleGroup>
              <TouchableOpacity
                onPress={() => {
                  handleRoute(routes.addCategory);
                }}
              >
                <SubMenuItem>
                  <SubMenuTitleGroup>
                    <SubItemTitle>Adicionar categoria</SubItemTitle>
                  </SubMenuTitleGroup>
                  <Feather name="chevron-right" size={20} color="black" />
                </SubMenuItem>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleRoute(routes.listCategories);
                }}
              >
                <SubMenuItem>
                  <SubMenuTitleGroup>
                    <SubItemTitle>Ver categorias</SubItemTitle>
                  </SubMenuTitleGroup>
                  <Feather name="chevron-right" size={20} color="black" />
                </SubMenuItem>
              </TouchableOpacity>
            </MenuItem>
            <MenuItem>
              <MenuTitleGroup>
                <FontAwesome5 name="pills" size={20} color="blue" />
                <MenuTitle>Medicamentos</MenuTitle>
              </MenuTitleGroup>
              <TouchableOpacity
                onPress={() => {
                  handleRoute(routes.addDrug);
                }}
              >
                <SubMenuItem>
                  <SubMenuTitleGroup>
                    <SubItemTitle>Adicionar medicamento</SubItemTitle>
                  </SubMenuTitleGroup>
                  <Feather name="chevron-right" size={20} color="black" />
                </SubMenuItem>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleRoute(routes.listDrugs);
                }}
              >
                <SubMenuItem>
                  <SubMenuTitleGroup>
                    <SubItemTitle>Ver medicamentos</SubItemTitle>
                  </SubMenuTitleGroup>
                  <Feather name="chevron-right" size={20} color="black" />
                </SubMenuItem>
              </TouchableOpacity>
            </MenuItem>
            <MenuItem>
              <MenuTitleGroup>
                <FontAwesome5 name="scroll" size={20} color="#f7fff7" />
                <MenuTitle>Receitas</MenuTitle>
              </MenuTitleGroup>
              <TouchableOpacity
                onPress={() => {
                  handleRoute(routes.addMedicalPrescription);
                }}
              >
                <SubMenuItem>
                  <SubMenuTitleGroup>
                    <SubItemTitle>Receitar Paciente</SubItemTitle>
                  </SubMenuTitleGroup>
                  <Feather name="chevron-right" size={20} color="black" />
                </SubMenuItem>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleRoute(routes.listMedicalPrescriptions);
                }}
              >
                <SubMenuItem>
                  <SubMenuTitleGroup>
                    <SubItemTitle>Ver receitas</SubItemTitle>
                  </SubMenuTitleGroup>
                  <Feather name="chevron-right" size={20} color="black" />
                </SubMenuItem>
              </TouchableOpacity>
            </MenuItem>
          </Fragment>
        )}
        {user.accountType === "admin" && (
          <MenuItem>
            <MenuTitleGroup>
              <FontAwesome5 name="user-alt" size={20} color="#03071e" />
              <MenuTitle>Usuários</MenuTitle>
            </MenuTitleGroup>
            <TouchableOpacity
              onPress={() => {
                handleRoute(routes.listUsers);
              }}
            >
              <SubMenuItem>
                <SubMenuTitleGroup>
                  <SubItemTitle>Listar usuários</SubItemTitle>
                </SubMenuTitleGroup>
                <Feather name="chevron-right" size={20} color="black" />
              </SubMenuItem>
            </TouchableOpacity>
          </MenuItem>
        )}
        {user.accountType === "patient" && (
          <MenuItem>
            <MenuTitleGroup>
              <FontAwesome5 name="scroll" size={20} color="#f7fff7" />
              <MenuTitle>Receitas</MenuTitle>
            </MenuTitleGroup>
            <TouchableOpacity
              onPress={() => {
                handleRoute(routes.listMedicalPrescriptions);
              }}
            >
              <SubMenuItem>
                <SubMenuTitleGroup>
                  <SubItemTitle>Ver minhas receitas</SubItemTitle>
                </SubMenuTitleGroup>
                <Feather name="chevron-right" size={20} color="black" />
              </SubMenuItem>
            </TouchableOpacity>
          </MenuItem>
        )}
        <TouchableOpacity onPress={logout}>
          <MenuItem>
            <SingleMenuOption>
              <MenuTitleGroup>
                <Feather name="log-out" size={20} color="red" />
                <MenuTitle>Sair</MenuTitle>
              </MenuTitleGroup>
              <Feather name="chevron-right" size={20} color="black" />
            </SingleMenuOption>
          </MenuItem>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: #b7e4c7;
  border-width: ${2 * StyleSheet.hairlineWidth}px;
  border-color: black;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  margin-top: 16px;
  padding-bottom: 16px;
`;

const Header = styled(View)`
  height: 45px;
  flex-direction: row;
  border-bottom-width: ${2 * StyleSheet.hairlineWidth}px;
  border-color: black;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  padding: 8px;
`;

const MenuCloseButton = styled(TouchableOpacity)`
  padding: 8px;
`;

const MenuItem = styled(View)`
  padding: 16px;
  border-bottom-width: ${1 * StyleSheet.hairlineWidth}px;
`;

const MenuTitleGroup = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const SingleMenuOption = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 16px 16px 16px 0;
`;

const MenuTitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  padding-left: 16px;
`;

const SubMenuItem = styled(View)`
  flex-direction: row;
  padding: 16px;
  padding-left: 24px;
  align-items: center;
  justify-content: space-between;
`;

const SubMenuTitleGroup = styled(View)`
  flex-direction: row;
`;

const SubItemTitle = styled(Text)`
  font-size: 16px;
  padding-left: 16px;
`;

export default Menu;
