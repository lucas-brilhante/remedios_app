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

const Menu = ({ handleSideDrawer, handleRoute }) => {
  const user = useUser();
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
                    <SubItemTitle>Adicionar</SubItemTitle>
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
                    <SubItemTitle>Listar</SubItemTitle>
                  </SubMenuTitleGroup>
                  <Feather name="chevron-right" size={20} color="black" />
                </SubMenuItem>
              </TouchableOpacity>
            </MenuItem>
            <MenuItem>
              <MenuTitleGroup>
                <FontAwesome5 name="pills" size={20} color="red" />
                <MenuTitle>Medicamentos</MenuTitle>
              </MenuTitleGroup>
              <TouchableOpacity
                onPress={() => {
                  handleRoute(routes.addDrug);
                }}
              >
                <SubMenuItem>
                  <SubMenuTitleGroup>
                    <SubItemTitle>Adicionar</SubItemTitle>
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
                    <SubItemTitle>Listar</SubItemTitle>
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
                    <SubItemTitle>Listar</SubItemTitle>
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
                  <SubItemTitle>Listar</SubItemTitle>
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
`;

const Header = styled(View)`
  height: 45px;
  flex-direction: row;
  border-bottom-width: ${3 * StyleSheet.hairlineWidth}px;
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
  border-bottom-width: ${2 * StyleSheet.hairlineWidth}px;
`;

const MenuTitleGroup = styled(View)`
  flex-direction: row;
  align-items: center;
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
