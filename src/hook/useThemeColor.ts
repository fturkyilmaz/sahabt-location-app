import {Colors} from '../constants';
// import useColorScheme from '../hook/useColorScheme';
import {GetTheme} from '../redux/system/selectors';

export default function useThemeColor(
  props: {light?: string; dark?: string},
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  // const theme = useColorScheme();
  const theme = GetTheme();

  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}
