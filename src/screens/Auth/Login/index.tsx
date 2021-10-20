import React, {useState} from 'react';
import {Alert, Image, View as DefaultView} from 'react-native';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import styles from './styles';

import {Colors, Images, Layout} from '../../../constants';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../redux/system/actions';
import {signIn} from '../../../services/UserService';
import {IUserLoginRequest} from '../../../services/types';
import {View} from '../../../components/Themed';

const Login = () => {
  const dispatch = useDispatch();

  const {t} = useTranslation();

  const [pageData, setPageData] = useState<IUserLoginRequest>({
    username: 'shbtadmin',
    password: 'adminSAHABT.',
  });

  const handleLogin = async () => {
    const response = await signIn(pageData);

    const {data} = response;

    if (data && data.length > 0) {
      dispatch(setUser(data[0]));
    } else {
      Alert.alert('Kullanıcı adı yada şifreniz yanlıştır');
    }
  };

  const onChangeText = (key: string, value: string) => {
    const userRequest = {...pageData, [key]: value};

    setPageData(userRequest);
  };

  return (
    <View
      style={styles.container}
      lightColor={Colors.c90BF00}
      darkColor={Colors.c000000}>
      <View
        style={styles.innerContainer}
        lightColor={Colors.c90BF00}
        darkColor={Colors.c000000}>
        <DefaultView style={styles.imageContainer}>
          <Image
            source={Images.logo}
            style={styles.image}
            resizeMethod="scale"
            resizeMode="contain"
          />
        </DefaultView>

        <View
          style={{
            borderTopLeftRadius: 75,
            height: Layout.height / 1.5,
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 324234,
            bottom: 0,
          }}
          lightColor={Colors.cFFFFFF}
          darkColor={Colors.cFFFFFF}>
          <DefaultView
            style={{
              flex: 1,
              padding: 20,
              justifyContent: 'center',
            }}>
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

            <DefaultView style={{marginVertical: 70}}>
              <Button text="Login" onPress={async () => await handleLogin()} />
            </DefaultView>
          </DefaultView>
        </View>
      </View>
    </View>
  );
};

export default Login;
