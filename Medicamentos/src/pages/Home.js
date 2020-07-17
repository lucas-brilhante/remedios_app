import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import styled from 'styled-components';
import MenuDrawer from 'react-native-side-drawer';
import { routes } from '../routes/routes';
import { Header, Menu, RoutesNavigator } from '../components';

const Home = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [route, setRoute] = useState(routes.welcome);
  const [routeProps, setRouteProps] = useState({});

  const handleSideDrawer = (bool) => {
    setShowSideDrawer(bool);
  };

  const handleRoute = (selectedRoute, props) => {
    setShowSideDrawer(false);
    setRouteProps(props);
    setRoute(selectedRoute);
  };

  return (
    <Container>
      <StatusBar backgroundColor='#52b788' />
      <View style={{ height: 50, backgroundColor: '#52b788' }} />
      <MenuDrawer
        open={showSideDrawer}
        drawerContent={
          <Menu handleSideDrawer={handleSideDrawer} handleRoute={handleRoute} />
        }
        drawerPercentage={85}
        animationTime={250}
        overlay
        opacity={0.5}
      >
        <Header
          color='#52b788'
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
