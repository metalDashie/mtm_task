import React, { FC } from 'react';
import { IBaseIconProps } from './instances/refresh.tsx';
import { ALL_ICONS, AllIconsNames } from './icons-collection.ts';
import { GENERAL_COLORS } from '../../constants/colors.ts';

export interface IIconProps extends IBaseIconProps {
  iconName: AllIconsNames;
}
const Icon: FC<IIconProps> = ({
  iconName,
  iconSize = 20,
  iconColor = GENERAL_COLORS.BLACK,
}) => {
  const IconToRender = ALL_ICONS[iconName];
  return <IconToRender iconSize={iconSize} iconColor={iconColor} />;
};

export default Icon;
