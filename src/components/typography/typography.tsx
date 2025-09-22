import React, { FC } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const Typography: FC<TextProps> = ({ style, ...props }) => {
  const textStyle = [styles.text, style];
  return <Text style={textStyle} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Regular',
  },
});

export default Typography;
