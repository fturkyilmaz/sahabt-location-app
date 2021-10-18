import React, {useState} from 'react';
import {Pressable, StyleSheet, Image, ScrollView} from 'react-native';
import {View, Text} from '../../../components/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, FontFamilies, FontSize} from '../../../constants';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {logout, setLanguage, setTheme} from '../../../redux/system/actions';
import {GetTheme, GetUserSelector} from '../../../redux/system/selectors';

type OptionButtonProp = React.ComponentProps<typeof Pressable> & {
  label: string;
  iconName: string;
  children?: React.ReactNode;
};

const LANGUAGES = [
  {code: 'en', label: 'English'},
  {code: 'tr', label: 'Türkçe'},
];

const THEMES = [
  {code: 'dark', label: 'Dark'},
  {code: 'light', label: 'Light'},
];

export default function ProfileScreen() {
  const {t, i18n} = useTranslation();

  const selectedThemeCode = GetTheme();

  const dispatch = useDispatch();

  const userInfo = GetUserSelector();

  const selectedLanguageCode = i18n.language;

  const logoutHandle = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.warn(error);
    }
  };

  function OptionButton({iconName, label, children}: OptionButtonProp) {
    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.title}>{label}</Text>
          <Ionicons color={Colors.cFFFFFF} size={28} name={iconName} />
        </View>
        {children ? children : null}
      </View>
    );
  }

  const getLanguage = () => {
    return LANGUAGES.map(language => {
      const selectedLanguage = language.code === selectedLanguageCode;

      return (
        <Pressable
          key={language.code}
          style={styles.buttonContainer}
          disabled={selectedLanguage}
          onPress={() => setLanguageHandle(language.code)}>
          <Text style={selectedLanguage ? styles.selectedText : styles.text}>
            {language.label}
          </Text>
        </Pressable>
      );
    });
  };

  const getTheme = () => {
    return THEMES.map(theme => {
      const selectedTheme = theme.code === selectedThemeCode;

      return (
        <Pressable
          key={theme.code}
          style={styles.buttonContainer}
          disabled={selectedTheme}
          onPress={() => setThemeHandle(theme.code)}>
          <Text style={selectedTheme ? styles.selectedText : styles.text}>
            {theme.label}
          </Text>
        </Pressable>
      );
    });
  };

  const setLanguageHandle = (code: string) => {
    dispatch(setLanguage(code));

    return i18n.changeLanguage(code);
  };

  const setThemeHandle = (theme: string) => {
    dispatch(setTheme(theme));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri: userInfo.image}}
            style={{width: 200, height: 200}}
            resizeMethod="scale"
            resizeMode="contain"
          />

          <Text>
            {userInfo?.name} {userInfo?.lastName}
          </Text>
        </View>
        <OptionButton
          label={t('common:languageSelector')}
          iconName="ios-language-outline">
          {getLanguage()}
        </OptionButton>

        <OptionButton
          label={t('common:themeSelector')}
          iconName="ios-cloudy-night-outline">
          {getTheme()}
        </OptionButton>

        <View style={{marginVertical: 30}}>
          <Text onPress={async () => await logoutHandle()}>
            {t('common:logout')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  selectedText: {
    fontSize: FontSize.f17,
    color: Colors.c90BF00,
    paddingVertical: 5,
    fontFamily: FontFamilies.msBold,
  },
  text: {
    fontSize: FontSize.f17,
    paddingVertical: 5,
    fontFamily: FontFamilies.msLight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.c90BF00,
    padding: 10,
    marginTop: 15,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: Colors.cFFFFFF,
    fontSize: FontSize.f24,
    fontFamily: FontFamilies.msMedium,
  },
});
