import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants';

export default StyleSheet.create({
  container: {flex: 1},
  dotContainer: {justifyContent: 'center', alignItems: 'center'},
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.c90BF00,
  },
  dot: {
    backgroundColor: Colors.c90BF00,
    width: 25,
    height: 25,
    borderWidth: 3,
    borderColor: Colors.cFFFFFF,
    borderRadius: 15,
    shadowColor: Colors.c000000,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 4,
    shadowOpacity: 0.5,
  },
});
