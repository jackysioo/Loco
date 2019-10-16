import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import MessageScreen from '../screens/MessageScreen';
import MapScreen from '../screens/MapScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Search: MapScreen
  }, {
  headerMode: 'none',
},
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-search'
          : 'md-search'
      }
    />
  ),
};

HomeStack.path = '';

const UserStack = createStackNavigator(
  {
    User: UserScreen,
  }, {
  headerMode: 'none',
},
  config
);

UserStack.navigationOptions = {
  tabBarLabel: 'Me',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
};

UserStack.path = '';

const MessageStack = createStackNavigator(
  {
    Message: MessageScreen,
  }, {
  headerMode: 'none',
},
  config
);

MessageStack.navigationOptions = {
  tabBarLabel: 'Message',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-mail' : 'md-mail'} />
  ),
};

MessageStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  UserStack,
  MessageStack,
});

tabNavigator.path = '';

export default tabNavigator;