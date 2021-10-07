import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text} from 'react-native';
import Button from '../../../components/Button';

export default function HomeScreen() {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('isAuth');
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
      }}>
      <Button text="Çıkış Yap" onPress={async () => await logout()} />
    </View>
  );
}
