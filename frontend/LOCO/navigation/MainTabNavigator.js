import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import MessageScreen from '../screens/MessageScreen';
import BusinessScreen from '../screens/BusinessScreen';
import BioScreen from '../screens/BioScreen';
import AllReviewsScreen from '../screens/AllReviewsScreen';
import AllAppointmentsScreen from '../screens/AllAppointmentsScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

// const tabBarOnPress = ({ navigation, defaultHandler }) => {
//   const { isFocused, state, goBack } = navigation;
//   if (isFocused()) {
//       if (state.routes.length > 1) {
//           for (let i = 0; i < state.routes.length - 1; i += 1) {
//               goBack();
//           }
//       } else {
//           // @TODO SCROLL TO TOP OF EACH TAB IF SCROLLABLE, $CALLBACK().
//       }
//   } else {
//       defaultHandler();
//   }
// };

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
    Appointments: AllAppointmentsScreen
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