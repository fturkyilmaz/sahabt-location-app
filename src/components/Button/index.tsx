import React, {ComponentProps} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

type Props = ComponentProps<typeof TouchableOpacity> & {
  text: string;
  onPress: () => {};
};

export default function Button({text, onPress}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
