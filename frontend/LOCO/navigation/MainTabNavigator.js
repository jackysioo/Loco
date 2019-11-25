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
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ChatScreen from '../screens/ChatScreen';
import MessagesScreen from '../screens/MessagesScreen';
import AddBusinessScreen from '../screens/AddBusinessScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Business: BusinessScreen,
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
    AddBusiness: AddBusinessScreen,
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

const LoginStack = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
  }, {
    headerMode: 'none',
  },
    config
  );


LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
  )
}

LoginStack.path = '';
    
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
  tabBarLabel: 'Messages',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-mail' : 'md-mail'} />
  ),
};

ChatStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  UserStack,
  LoginStack,
  ChatStack
});

tabNavigator.path = '';

export default tabNavigator;