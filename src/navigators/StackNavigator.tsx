import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import AppScreens from '../constants/Screens';
import LoginScreen from '../screens/Auth/Login';
import ProfileScreen from '../screens/Client/Profile';
import MapScreen from '../screens/Client/Map';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, FontFamilies, FontSize} from '../constants';
import {useTranslation} from 'react-i18next';
import {GetIsAuth} from '../redux/system/selectors';
import useColorScheme from '../hook/useColorScheme';

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function StackNavigator() {
  const isAuth = true;

  const isDark = useColorScheme() === 'dark';

  const {t} = useTranslation();

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
        tabBarActiveTintColor: isDark ? Colors.c86AB14 : Colors.c90BF00,
        headerTitleAllowFontScaling: true,
        tabBarLabelStyle: {
          fontFamily: FontFamilies.msBold,
        },
        headerStyle: {
          backgroundColor: isDark ? Colors.c000000 : Colors.c90BF00,
        },
        headerTitleStyle: {
          fontFamily: FontFamilies.msBold,
          fontSize: FontSize.f19,
        },
        headerTintColor: Colors.cFFFFFF,
      })}>
      {/* <Tab.Screen
        name={AppScreens.Home}
        component={HomeScreen}
        options={{
          title: t('navigate:home'),
        }}
      /> */}
      <Tab.Screen
        name={AppScreens.Map}
        // options={{headerShown: false}}
        component={MapScreen}
        options={{
          title: t('navigate:map'),
        }}
      />
      <Tab.Screen
        name={AppScreens.Profile}
        component={ProfileScreen}
        options={{
          title: t('navigate:profile'),
        }}
      />
    </Tab.Navigator>
  );
}
