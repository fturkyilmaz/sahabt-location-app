import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import styles from './styles';

import {Colors, Images, Layout} from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const handleLogin = async () => {
    await AsyncStorage.setItem('isAuth', JSON.stringify({isAuth: true}));
    console.log('Giriş Yaptımmmm');
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={Images.logo}
            style={styles.image}
            resizeMethod="scale"
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            borderTopLeftRadius: 75,
            backgroundColor: Colors.cFFFFFF,
            height: Layout.height / 1.5,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <View
            style={{flex: 1, marginHorizontal: 20, justifyContent: 'center'}}>
            <TextInput label="Kullanıcı Adı" />
            <TextInput label="Şifre" secureTextEntry />

            <View style={{marginVertical: 70}}>
              <Button text="Login" onPress={async () => await handleLogin()} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
