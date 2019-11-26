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
import FollowingScreen from '../screens/FollowingScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ChatScreen from '../screens/ChatScreen';
import MessagesScreen from '../screens/MessagesScreen';
import AddBusinessScreen from '../screens/AddBusinessScreen';
import EditBusinessScreen from '../screens/EditBusinessScreen';

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
  tabBarOptions: { 
    activeTintColor: '#51bfbb',
    labelStyle: {
      fontWeight: '600',
      fontSize: 10
    }
  },
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
    UserReview: ReviewScreen,
    AddBusiness: AddBusinessScreen,
    Business: BusinessScreen,
    EditBusiness: EditBusinessScreen,
  }, {
  headerMode: 'none',
},
  config
);

UserStack.navigationOptions = {
  tabBarOptions: { 
    activeTintColor: '#51bfbb',
    labelStyle: {
      fontWeight: '600',
      fontSize: 10
    }
  },
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
};

UserStack.path = '';

    
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
  tabBarOptions: { 
    activeTintColor: '#51bfbb',
    labelStyle: {
      fontWeight: '600',
      fontSize: 10
    }
  },
  tabBarLabel: 'Messages',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-mail' : 'md-mail'} />
  ),
};

ChatStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  UserStack,
  ChatStack
});

tabNavigator.path = '';

export default tabNavigator;