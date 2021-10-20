import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Layout} from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {width: Layout.width * 0.4, height: Layout.height * 0.2},
  imageContainer: {
    // paddingTop: 70,
  },
});
