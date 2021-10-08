import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import AppScreens from '../constants/Screens';
import LoginScreen from '../screens/Auth/Login';
import HomeScreen from '../screens/Client/Home';
import ProfileScreen from '../screens/Client/Profile';
import MapScreen from '../screens/Client/Map';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../constants';

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function StackNavigator() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const getIsAuth = async () => {
    const response = await AsyncStorage.getItem('isAuth');

    if (response) {
      const responseObject = JSON.parse(response);

      if (responseObject?.isAuth) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    }
  };

  useEffect(() => {
    getIsAuth();
  }, []);

  const initialRouteName = isAuth ? AppScreens.Home : AppScreens.Login;

  return !isAuth ? (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name={AppScreens.Login}
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  ) : (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          const {name} = route;

          if (name === AppScreens.Home) {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          }

          if (name === AppScreens.Map) {
            iconName = focused ? 'ios-map' : 'ios-map-outline';
          }

          if (name === AppScreens.Profile) {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          }

          return (
            <Ionicons name={iconName} size={size} color={Colors.c90BF00} />
          );
        },
        tabBarActiveTintColor: Colors.c90BF00,
        headerStyle: {backgroundColor: Colors.c90BF00},
        headerTintColor: Colors.cFFFFFF,
      })}>
      <Tab.Screen name={AppScreens.Home} component={HomeScreen} />
      <Tab.Screen
        name={AppScreens.Map}
        // options={{headerShown: false}}
        component={MapScreen}
      />
      <Tab.Screen name={AppScreens.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
