import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginNavigator from './LoginNavigator';

export default createAppContainer(
  createSwitchNavigator({
    Main: MainTabNavigator,
    Login: LoginNavigator
  },
  {
    initialRouteName: "Login"
  })
);