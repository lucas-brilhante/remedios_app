import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components";
import Header from "../components/Header";
import MenuDrawer from "react-native-side-drawer";
import Menu from "../components/Menu";
import useUsers from "../hooks/useUsers";
import RoutesNavigator, { routes } from "../components/RoutesNavigator";

const Home = () => {
  const user = useUsers();
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [route, setRoute] = useState(routes.welcome);

  const handleSideDrawer = (bool) => {
    setShowSideDrawer(bool);
  };

  const handleRoute = (route) => {
    setShowSideDrawer(false);
    setRoute(route);
  };

  return (
    <Container>
      <StatusBar backgroundColor={"#ddd"} />
      <MenuDrawer
        open={showSideDrawer}
        drawerContent={
          <Menu handleSideDrawer={handleSideDrawer} handleRoute={handleRoute} />
        }
        drawerPercentage={85}
        animationTime={250}
        overlay={true}
        opacity={0.9}
      />
      <Header color={"#ddd"} handleSideDrawer={handleSideDrawer} />
      <RoutesNavigator route={route} />
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #d0d0d0;
`;

const Content = styled(View)`
  padding: 24px;
`;

export default Home;
