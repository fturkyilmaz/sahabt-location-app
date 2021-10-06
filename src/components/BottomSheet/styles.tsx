import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../constants';

export default StyleSheet.create({
  container: {
    height: Layout.height * 0.5,
    backgroundColor: Colors.cF2F4F5,
    borderTopRightRadius: 29,
    borderTopLeftRadius: 29,
    padding: 15,
  },
  modalContainer: {margin: 0},
  overlay: {flex: 1, justifyContent: 'flex-end'},
});
