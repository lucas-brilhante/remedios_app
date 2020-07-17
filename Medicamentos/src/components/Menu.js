import React, { Fragment } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components";
import { Feather, FontAwesome } from "@expo/vector-icons";
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
                  <Feather name="plus" size={20} color="green" />
                  <SubItemTitle>Adicionar</SubItemTitle>
                </SubMenuTitleGroup>
                <Feather name="arrow-right" size={20} color="black" />
              </SubMenuItem>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleRoute(routes.listCategories);
              }}
            >
              <SubMenuItem>
                <SubMenuTitleGroup>
                  <Feather name="search" size={20} color="blue" />
                  <SubItemTitle>Listar</SubItemTitle>
                </SubMenuTitleGroup>
                <Feather name="arrow-right" size={20} color="black" />
              </SubMenuItem>
            </TouchableOpacity>
          </MenuItem>
          <MenuItem>
            <MenuTitleGroup>
              <FontAwesome name="star" size={20} color="orange" />
              <MenuTitle>Medicamentos</MenuTitle>
            </MenuTitleGroup>
            <TouchableOpacity
              onPress={() => {
                handleRoute(routes.addDrug);
              }}
            >
              <SubMenuItem>
                <SubMenuTitleGroup>
                  <Feather name="plus" size={20} color="green" />
                  <SubItemTitle>Adicionar</SubItemTitle>
                </SubMenuTitleGroup>
                <Feather name="arrow-right" size={20} color="black" />
              </SubMenuItem>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleRoute(routes.listDrugs);
              }}
            >
              <SubMenuItem>
                <SubMenuTitleGroup>
                  <Feather name="search" size={20} color="blue" />
                  <SubItemTitle>Listar</SubItemTitle>
                </SubMenuTitleGroup>
                <Feather name="arrow-right" size={20} color="black" />
              </SubMenuItem>
            </TouchableOpacity>
          </MenuItem>
          <MenuItem>
            <MenuTitleGroup>
              <FontAwesome name="star" size={20} color="orange" />
              <MenuTitle>Receitas</MenuTitle>
            </MenuTitleGroup>
            <TouchableOpacity
              onPress={() => {
                handleRoute(routes.addMedicalPrescription);
              }}
            >
              <SubMenuItem>
                <SubMenuTitleGroup>
                  <Feather name="plus" size={20} color="green" />
                  <SubItemTitle>Receitar Paciente</SubItemTitle>
                </SubMenuTitleGroup>
                <Feather name="arrow-right" size={20} color="black" />
              </SubMenuItem>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleRoute(routes.listMedicalPrescriptions);
              }}
            >
              <SubMenuItem>
                <SubMenuTitleGroup>
                  <Feather name="search" size={20} color="blue" />
                  <SubItemTitle>Listar</SubItemTitle>
                </SubMenuTitleGroup>
                <Feather name="arrow-right" size={20} color="black" />
              </SubMenuItem>
            </TouchableOpacity>
          </MenuItem>
        </Fragment>
      )}
      {user.accountType === "admin" && (
        <MenuItem>
          <MenuTitleGroup>
            <FontAwesome name="star" size={20} color="orange" />
            <MenuTitle>Usuários</MenuTitle>
          </MenuTitleGroup>
          <TouchableOpacity
            onPress={() => {
              handleRoute(routes.listUsers);
            }}
          >
            <SubMenuItem>
              <SubMenuTitleGroup>
                <Feather name="search" size={20} color="blue" />
                <SubItemTitle>Listar</SubItemTitle>
              </SubMenuTitleGroup>
              <Feather name="arrow-right" size={20} color="black" />
            </SubMenuItem>
          </TouchableOpacity>
        </MenuItem>
      )}
      {user.accountType === "patient" && (
        <MenuItem>
          <MenuTitleGroup>
            <FontAwesome name="star" size={20} color="orange" />
            <MenuTitle>Receitas</MenuTitle>
          </MenuTitleGroup>
          <TouchableOpacity
            onPress={() => {
              handleRoute(routes.listMedicalPrescriptions);
            }}
          >
            <SubMenuItem>
              <SubMenuTitleGroup>
                <Feather name="search" size={20} color="blue" />
                <SubItemTitle>Ver minhas receitas</SubItemTitle>
              </SubMenuTitleGroup>
              <Feather name="arrow-right" size={20} color="black" />
            </SubMenuItem>
          </TouchableOpacity>
        </MenuItem>
      )}
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: white;
  border-width: ${2 * StyleSheet.hairlineWidth}px;
  border-color: black;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
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
