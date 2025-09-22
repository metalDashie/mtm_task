import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../buttons/icon-button/icon-button.tsx';
import { GENERAL_COLORS } from '../../constants/colors.ts';
import { AllIconsNames } from '../icons/icons-collection.ts';
import Typography from '../typography/typography.tsx';

const renderHeaderButton = (
  iconName: AllIconsNames,
  position: 'left' | 'right',
  onPress?: () => void,
) => (
  <IconButton
    iconName={iconName}
    iconColor={GENERAL_COLORS.WHITE}
    iconSize={18}
    onPress={onPress}
    style={position === 'left' ? styles.leftButton : styles.rightButton}
  />
);

export interface IHeaderProps {
  title?: string;
  leftButton?: {
    iconName: AllIconsNames;
    onPress?: () => void;
  };
  rightButton?: {
    iconName: AllIconsNames;
    onPress?: () => void;
  };
}
const Header: FC<IHeaderProps> = ({ title, leftButton, rightButton }) => {
  return (
    <View style={styles.header}>
      {leftButton &&
        renderHeaderButton(leftButton.iconName, 'left', leftButton.onPress)}

      {title && <Typography style={styles.title}>{title}</Typography>}

      {rightButton &&
        renderHeaderButton(rightButton.iconName, 'right', rightButton.onPress)}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GENERAL_COLORS.PINK,
    height: 47,
  },
  title: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '600',
    color: GENERAL_COLORS.WHITE,
  },
  leftButton: {
    position: 'absolute',
    left: 16,
  },
  rightButton: {
    position: 'absolute',
    right: 16,
  },
});

export default Header;
