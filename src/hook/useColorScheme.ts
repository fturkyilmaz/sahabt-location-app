import {ColorSchemeName, useColorScheme as _useColorScheme} from 'react-native';

export default function useColorScheme() {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
}

export function useIsDark() {
  return (_useColorScheme() as NonNullable<ColorSchemeName>) === 'dark';
}
