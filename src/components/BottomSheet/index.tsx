import React from 'react';
import {View, Animated, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../constants';

type Props = {
  onRequestClose: () => void;
  visible: boolean;
  children?: React.ReactNode;
};

export default function BottomSheet(props: Props) {
  const {visible, onRequestClose, children} = props;
  return (
    <Modal
      swipeDirection="down"
      onBackButtonPress={() => onRequestClose()}
      onSwipeComplete={() => onRequestClose()}
      isVisible={visible}
      style={styles.modalContainer}>
      <View style={styles.overlay}>
        <Animated.View style={styles.container}>
          <View style={styles.innerContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onRequestClose()}
              style={styles.buttonContainer}>
              <Icon name="close" size={26} color={Colors.cFFFFFF} />
            </TouchableOpacity>
          </View>
          <View>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}
