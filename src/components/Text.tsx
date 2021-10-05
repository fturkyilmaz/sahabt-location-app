import React from 'react';
import {Text as GlobalText} from 'react-native';

type Props = React.ComponentProps<typeof GlobalText> & {
  bold?: boolean;
};

const Text: React.FC<Props> = props => {
  const {bold, style, ...restProps} = props;
  return <GlobalText style={style} {...restProps} />;
};

export default Text;
