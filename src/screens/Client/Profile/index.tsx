import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Button from '../../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, FontFamilies, FontSize} from '../../../constants';

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
  {code: 'dark', label: 'Koyu'},
  {code: 'light', label: 'Açık'},
];

export default function ProfileScreen() {
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

  const [selectedLanguageCode, setSelectedLanguageCode] = useState('tr');
  const [selectedThemeCode, setSelectedThemeCode] = useState('light');

  const getLanguage = () => {
    return LANGUAGES.map(language => {
      const selectedLanguage = language.code === selectedLanguageCode;

      return (
        <Pressable
          key={language.code}
          style={styles.buttonContainer}
          disabled={selectedLanguage}
          onPress={() => setSelectedLanguageCode(language.code)}>
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

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <OptionButton label="Dil Seçiniz" iconName="ios-language-outline">
          {getLanguage()}
        </OptionButton>

        <OptionButton label="Tema Seçiniz" iconName="ios-cloudy-night-outline">
          {getTheme()}
        </OptionButton>

        <View style={{marginVertical: 30}}>
          <Text onPress={async () => await logout()}>Çıkış Yap</Text>
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
