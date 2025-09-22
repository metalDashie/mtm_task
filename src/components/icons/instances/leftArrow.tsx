import React, { FC } from 'react';
import { GENERAL_COLORS } from '../../../constants/colors.ts';
import { View } from 'react-native';

export interface IBaseIconProps {
  iconSize?: number;
  iconColor?: string;
}
const LeftArrow: FC<IBaseIconProps> = ({
  iconSize = 18,
  iconColor = GENERAL_COLORS.BLACK,
}) => {
  const containerStyle = {
    width: iconSize,
    height: iconSize,
    borderWidth: 2,
    borderBottomColor: iconColor,
    borderLeftColor: iconColor,
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    transform: [{ rotateZ: '45deg' }],
  };

  return <View style={containerStyle} />;
};

export default LeftArrow;
