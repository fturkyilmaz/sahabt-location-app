import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme,
} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {Colors} from '../constants';
import RootNavigator from './StackNavigator';
import useThemeColor from '../hook/useThemeColor';
import useColorScheme from '../hook/useColorScheme';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(0, 0, 0,0.5)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
} as Theme;

export default function Navigator() {
  const systemTheme = useColorScheme();

  const dark = systemTheme === 'dark';

  const darkTheme = {
    dark,
    colors: {
      primary: 'rgb(144, 191, 0)',
      background: 'rgb(1, 1, 1)',
      card: 'rgb(18, 18, 18)',
      text: 'rgb(229, 229, 231)',
      border: 'rgb(39, 39, 41)',
      notification: 'rgb(144, 191, 0)',
    },
  };

  const lightTheme = {
    dark,
    colors: {
      primary: 'rgb(139, 189, 0)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(216, 216, 216)',
      notification: 'rgb(139, 189, 0)',
    },
  };

  return (
    <NavigationContainer
      theme={systemTheme === 'dark' ? darkTheme : lightTheme}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.c90BF00} />
      <RootNavigator />
    </NavigationContainer>
  );
}
