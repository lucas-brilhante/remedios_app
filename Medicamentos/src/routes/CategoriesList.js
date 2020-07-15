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
import {
  Container,
  List,
  Title,
  SearchBar,
  SearchInput,
  CategoriesGrid,
  DeleteButton,
  EditButton,
} from "../components/ListView";

const CategoriesList = ({ handleRoute }) => {
  const user = useUser();
  const searchBarRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const searchCategory = (text) => {
    const normalizedText = text.trim().toUpperCase();
    const filter = [];
    categories.map((category) => {
      const normalizedTitle = category.title.trim().toUpperCase();
      if (normalizedTitle.includes(normalizedText)) filter.push(category);
    });
    setFilteredCategories(filter);
  };

  const getCategories = useCallback(async () => {
    try {
      const apiResponse = await remediosApi.get("categories");
      setCategories(apiResponse.data);
      setFilteredCategories(apiResponse.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const deleteCategory = async (category) => {
    setIsFetching(true);
    try {
      await remediosApi.delete(`categories/${category.id}`);
      getCategories();
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        setIsFetching(false);
        Alert.alert(
          "Erro ao remover",
          "Existe um produto cadastrado nessa categoria."
        );
      }
    }
  };

  const deleteConfirmation = (category) => {
    Alert.alert(
      null,
      `Tem certeza que deseja deletar a categoria ${category.title}?`,
      [
        {
          text: "Sim",
          onPress: () => {
            deleteCategory(category);
          },
        },
        { text: "Não", onPress: () => {} },
      ],
      {
        cancelable: false,
      }
    );
  };

  const editCategory = (category) => {
    handleRoute(routes.addCategory, category);
  };

  return (
    <Container>
      {isFetching ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <List>
          <Title>Lista de Categorias</Title>
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
              placeholder="Digite o nome da categoria."
              onChangeText={searchCategory}
            />
          </SearchBar>
          <CategoriesGrid>
            {filteredCategories.map((category) => (
              <TouchableOpacity key={category.id}>
                <Category>
                  <CategoryInfo>
                    <FontAwesome name="star" size={20} color="orange" />
                    <CategoryTitle>{category.title}</CategoryTitle>
                  </CategoryInfo>
                  {user.accountType === "admin" && (
                    <Fragment>
                      <EditButton onPress={() => editCategory(category)} />
                      <DeleteButton
                        onPress={() => deleteConfirmation(category)}
                      />
                    </Fragment>
                  )}
                </Category>
              </TouchableOpacity>
            ))}
          </CategoriesGrid>
        </List>
      )}
    </Container>
  );
};

const Category = styled(View)`
  height: 96px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: ${2 * StyleSheet.hairlineWidth}px;
  border-color: #000;
`;

const CategoryInfo = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const CategoryTitle = styled(Text)`
  font-size: 16px;
  padding: 8px;
  padding-left: 16px;
`;

export default CategoriesList;
