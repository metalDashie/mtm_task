import React, { FC } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Icon, { IIconProps } from '../../icons/icon.tsx';

interface IProps
  extends Pick<PressableProps, 'onPress' | 'style'>,
    IIconProps {}
const IconButton: FC<IProps> = ({ onPress, style, ...iconProps }) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <Icon {...iconProps} />
    </Pressable>
  );
};

export default IconButton;
