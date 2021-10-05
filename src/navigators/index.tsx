import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {Colors} from '../constants';
import RootNavigator from './StackNavigator';

export default function index() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={Colors.c90BF00} />
      <RootNavigator />
    </NavigationContainer>
  );
}
