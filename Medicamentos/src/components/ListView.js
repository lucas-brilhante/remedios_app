import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import styled from "styled-components";
import { Feather } from "@expo/vector-icons";

export const Container = styled(View)`
  flex: 1;
  background-color: #ddd;
  justify-content: center;
  align-items: center;
`;

export const List = styled(View)`
  flex: 1;
  width: 100%;
  padding: 16px;
`;

export const Title = styled(Text)`
  font-size: 24px;
  margin-bottom: 20px;
  font-family: "Abel";
  text-align: left;
`;

export const SearchBar = styled(View)`
  flex-direction: row;
  width: 100%;
  background-color: #fff;
  border-width: 1px;
  border-radius: 16px;
  align-items: center;
  padding: 8px;
`;

export const SearchInput = styled(TextInput)`
  flex: 1;
  padding-left: 16px;
  font-size: 16px;
`;

export const ItemsGrid = styled(ScrollView)``;

export const DeleteButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 16 }}>
      <Feather name="trash-2" size={20} color="red" />
    </TouchableOpacity>
  );
};

export const EditButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 16 }}>
      <Feather name="edit" size={20} color="orange" />
    </TouchableOpacity>
  );
};
