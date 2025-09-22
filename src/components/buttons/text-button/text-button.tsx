import React, { FC } from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewProps,
} from 'react-native';
import Icon, { IIconProps } from '../../icons/icon.tsx';
import { GENERAL_COLORS } from '../../../constants/colors.ts';

export interface ITextButtonProps
  extends Pick<PressableProps, 'onPress'>,
    Pick<IIconProps, 'iconName'> {
  text: string;
  style?: ViewProps['style'];
}
const TextButton: FC<ITextButtonProps> = ({
  style,
  onPress,
  iconName,
  text,
}) => {
  const containerStyle: PressableProps['style'] = [styles.container, style];

  return (
    <Pressable style={containerStyle} onPress={onPress}>
      <Icon
        iconName={iconName}
        iconColor={GENERAL_COLORS.BLACK}
        iconSize={18}
      />
      <Text>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
});

export default TextButton;
