import React, { FC } from 'react';
import TextButton, { ITextButtonProps } from '../text-button.tsx';

export interface IProps extends Pick<ITextButtonProps, 'onPress' | 'style'> {}
const RefreshTextButton: FC<IProps> = ({ onPress, style }) => {
  return (
    <TextButton
      style={style}
      text="Error While Fetching"
      iconName="refresh"
      onPress={onPress}
    />
  );
};

export default RefreshTextButton;
