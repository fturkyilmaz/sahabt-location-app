import React from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

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
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onRequestClose()}
              style={{
                display: 'flex',
                height: 40,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                width: '15%',
                backgroundColor: 'red',
              }}>
              <Text>KAPAT</Text>
            </TouchableOpacity>
          </View>
          <View>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}
