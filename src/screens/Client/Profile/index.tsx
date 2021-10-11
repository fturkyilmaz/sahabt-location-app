import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, FontFamilies, FontSize} from '../../../constants';
import {useTranslation} from 'react-i18next';

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

  const selectedLanguageCode = i18n.language;

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('isAuth');
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

  const [selectedThemeCode, setSelectedThemeCode] = useState('light');

  const getLanguage = () => {
    return LANGUAGES.map(language => {
      const selectedLanguage = language.code === selectedLanguageCode;

      return (
        <Pressable
          key={language.code}
          style={styles.buttonContainer}
          disabled={selectedLanguage}
          onPress={() => setLanguage(language.code)}>
          <Text style={selectedLanguage ? styles.selectedText : styles.text}>
            {language.label}
          </Text>
        </Pressable>
      );
    });
  };

  const getTheme = () => {
    return THEMES.map(theme => {
      const selectedLanguage = theme.code === selectedThemeCode;

      return (
        <Pressable
          key={theme.code}
          style={styles.buttonContainer}
          disabled={selectedLanguage}
          onPress={() => setSelectedThemeCode(theme.code)}>
          <Text style={selectedLanguage ? styles.selectedText : styles.text}>
            {theme.label}
          </Text>
        </Pressable>
      );
    });
  };

  const setLanguage = (code: string) => {
    return i18n.changeLanguage(code);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
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
          <Text onPress={async () => await logout()}>{t('common:logout')}</Text>
        </View>

        {/* <Button text="Çıkış Yap" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cF2F4F5,
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
    color: Colors.c000000,
    paddingVertical: 5,
    fontFamily: FontFamilies.msLight,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.cF2F4F5,
    margin: 15,
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
