/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import Splash from './src/components/Splash';
import Register from './src/components/Register';

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

