import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import styles from './styles';

import {Colors, Images, Layout} from '../../../constants';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../redux/system/actions';

const Login = () => {
  const dispatch = useDispatch();

  const {t} = useTranslation();

  const handleLogin = async () => {
    dispatch(
      setUser({
        name: 'FURKAN',
        surname: 'TÜRKYILMAZ',
        linkedin: 'https://www.linkedin.com/in/furkanturkyilmaz/',
      }),
    );
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
            <TextInput label={t('common:username')} />
            <TextInput label={t('common:password')} secureTextEntry />

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
