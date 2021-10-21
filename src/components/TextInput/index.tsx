import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {Colors, FontFamilies, FontSize} from '../../constants';

type Props = React.ComponentProps<typeof TextInput> & {
  label: string;
};

const TextField = React.forwardRef<TextInput, Props>((props, ref) => {
  const {value, style, label, ...restProps} = props;

  return (
    <View style={style}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput ref={ref} style={styles.input} {...restProps} value={value} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  input: {
    fontSize: FontSize.f15,
    fontFamily: FontFamilies.msRegular,
    padding: 15,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: Colors.c7c7e80,
    color: Colors.c000000,
  },
  inputDark: {
    fontSize: FontSize.f15,
    fontFamily: FontFamilies.msRegular,
    padding: 15,
    color: Colors.cFFFFFF,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: Colors.c7c7e80,
  },
  labelContainer: {paddingVertical: 10},
  label: {
    fontSize: FontSize.f14,
    fontFamily: FontFamilies.msSemiBold,
    color: Colors.c000000,
  },
});

export default TextField;
