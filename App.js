/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { 
  View,
  StyleSheet
} from 'react-native';

import Splash from './src/component/Splash';
import Register from './src/component/Register';

import { StackNavigator } from 'react-navigation';

export default class App extends Component<{}> {
  render() {
    return (
      <Navigation />
    );
  }
}

export const Navigation = StackNavigator({
  Splash:{
    screen: Splash
  },
  Register:{
    screen: Register
  }

},
{
  headerMode:'none',
}
);