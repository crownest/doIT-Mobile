/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import Splash from './src/pages/Splash';
import Register from './src/pages/Register';
import Login from './src/pages/Login';
import TaskList from './src/pages/TaskList';
import Settings from './src/pages/Settings';
import SettingsInformations from './src/pages/SettingsInformations';

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
    },
    Login:{
      screen: Login
    },
    TaskList:{
      screen: TaskList
    },
    Settings:{
      screen: Settings
    },
    SettingsInformations:{
      screen: SettingsInformations
    } 
  },
  {
    headerMode:'none',
  }
);
