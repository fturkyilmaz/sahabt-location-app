import {StyleSheet} from 'react-native';
import {Colors, FontFamilies, FontSize} from '../../constants';

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  text: {
    fontSize: FontSize.f15,
    letterSpacing: 1.2,
    fontFamily: FontFamilies.msSemiBold,
    color: Colors.cFFFFFF,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.c90BF00,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
