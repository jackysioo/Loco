
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
  });
  
export default LoginNavigator = createStackNavigator(
    {
      Login: LoginScreen,
      Signup: SignupScreen,
    }, {
    headerMode: 'none',
  },
    config
  );

