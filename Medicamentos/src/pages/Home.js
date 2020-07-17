import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components";
import Header from "../components/Header";
import MenuDrawer from "react-native-side-drawer";
import Menu from "../components/Menu";
import useUsers from "../hooks/useUsers";
import RoutesNavigator from "../components/RoutesNavigator";
import { routes } from "../routes";

const Home = () => {
  const user = useUsers();
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [route, setRoute] = useState(routes.welcome);
  const [routeProps, setRouteProps] = useState({});

  const handleSideDrawer = (bool) => {
    setShowSideDrawer(bool);
  };

  const handleRoute = (route, props) => {
    setShowSideDrawer(false);
    setRouteProps(props);
    setRoute(route);
  };

  return (
    <Container>
      <StatusBar backgroundColor="#52b788" />
      <View style={{ height: 50, backgroundColor: "#52b788" }} />
      <MenuDrawer
        open={showSideDrawer}
        drawerContent={
          <Menu handleSideDrawer={handleSideDrawer} handleRoute={handleRoute} />
        }
        drawerPercentage={85}
        animationTime={250}
        overlay={true}
        opacity={0.5}
      >
        <Header
          color={"#52b788"}
          handleRoute={handleRoute}
          handleSideDrawer={handleSideDrawer}
        />
        <RoutesNavigator
          route={route}
          handleRoute={handleRoute}
          routeProps={routeProps}
        />
      </MenuDrawer>
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  position: relative;
  background-color: #95d5b2;
`;

export default Home;
