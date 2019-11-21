import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import BusinessScreen from '../screens/BusinessScreen';
import BioScreen from '../screens/BioScreen';
import AllReviewsScreen from '../screens/AllReviewsScreen';
import AllAppointmentsScreen from '../screens/AllAppointmentsScreen';
import FollowingScreen from '../screens/FollowingScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ChatScreen from '../screens/ChatScreen';
import MessagesScreen from '../screens/MessagesScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Business: BusinessScreen
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
    Bio: BioScreen,
    Reviews: AllReviewsScreen,
    Following: FollowingScreen,
    Appointments: AllAppointmentsScreen,
    UserReview: ReviewScreen,
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

const AppointmentsStack = createStackNavigator(
  {
    Appointments: AllAppointmentsScreen,
  }, {
  headerMode: 'none',
},
  config
);

AppointmentsStack.navigationOptions = {
  tabBarLabel: 'Appointments',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
  ),
};

AppointmentsStack.path = '';

//TESTING CHAT
const ChatStack = createStackNavigator(
  {
    Messages: MessagesScreen,
    Chat: ChatScreen,
  }, {
  headerMode: 'none',
},
  config
);

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
  ),
};

ChatStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  UserStack,
  AppointmentsStack,
  ChatStack
});

tabNavigator.path = '';

export default tabNavigator;