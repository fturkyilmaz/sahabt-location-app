import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Colors} from '../../constants';
import Text from '../Text';

type Props = React.ComponentProps<typeof TextInput> & {
  label: string;
};

const TextField = React.forwardRef<TextInput, Props>((props, ref) => {
  const {value, style, label, ...restProps} = props;

  return (
    <View style={style}>
      <View style={styles.labelContainer}>
        <Text>{label}</Text>
      </View>
      <TextInput ref={ref} style={styles.input} {...restProps} value={value} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  input: {
    fontSize: 16,
    padding: 15,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: Colors.c7c7e80,
  },
  labelContainer: {paddingVertical: 10},
  label: {fontSize: 14},
});

export default TextField;
