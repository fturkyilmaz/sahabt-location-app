import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import styles from './styles';

import {Colors, Images, Layout} from '../../../constants';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../redux/system/actions';
import {signIn} from '../../../services/UserService';
import {IUserLoginRequest} from '../../../services/types';
import HttpRequest from '../../../utils/HttpRequest';
import axios from 'axios';
import ApiConfig from '../../../config/ApiConfig';

const Login = () => {
  const dispatch = useDispatch();

  const {t} = useTranslation();

  const [pageData, setPageData] = useState<IUserLoginRequest>({
    username: 'SHBTADMIN',
    password: 'SAHABT_MANAGER',
  });

  const handleLogin = async () => {
    // const response = await signIn(pageData);

    dispatch(
      setUser({
        name: 'FURKAN',
        surname: 'TÜRKYILMAZ',
        linkedin: 'https://www.linkedin.com/in/furkanturkyilmaz/',
      }),
    );
  };

  const onChangeText = (key: string, value: string) => {
    const userRequest = {...pageData, [key]: value};

    setPageData(userRequest);
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
            <TextInput
              value={pageData.username}
              label={t('common:username')}
              onChangeText={value => onChangeText('username', value)}
            />
            <TextInput
              value={pageData.password}
              label={t('common:password')}
              secureTextEntry
              onChangeText={value => onChangeText('password', value)}
            />

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
