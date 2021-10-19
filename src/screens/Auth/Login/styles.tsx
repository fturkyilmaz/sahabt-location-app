import {Platform, StatusBar, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {width: 200, height: 200},
  imageContainer: {
    paddingTop: 70,
  },
});
