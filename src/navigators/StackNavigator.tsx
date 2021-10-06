import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import AppScreens from '../constants/Screens';
import LoginScreen from '../screens/Auth/Login';
import HomeScreen from '../screens/Client/Home';
import ProfileScreen from '../screens/Client/Profile';
import MapScreen from '../screens/Client/Map';

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const isAuth = true;

  const initialRouteName = isAuth ? AppScreens.Login : AppScreens.Map;
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name={AppScreens.Login}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppScreens.Map}
        options={{headerShown: false}}
        component={MapScreen}
      />
      <Stack.Screen name={AppScreens.Profile} component={ProfileScreen} />
      <Stack.Screen name={AppScreens.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
}
