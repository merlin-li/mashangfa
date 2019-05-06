import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/AccountScreen/Login';
import WebViewScreen from '../screens/WebViewScreen';
import HomeScreen from '../screens/HomeScreen';

const AccountScreen = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  WebView: WebViewScreen,
});

const MainStack = createSwitchNavigator({
  Main: MainTabNavigator,
})

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // MainStack,
  AccountScreen
}, {
  headerMode: 'none'
}));
