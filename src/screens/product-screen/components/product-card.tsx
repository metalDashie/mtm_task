import React, { FC } from 'react';
import { Image, StyleSheet, View, ViewProps } from 'react-native';
import { GENERAL_COLORS } from '../../../constants/colors.ts';
import Typography from '../../../components/typography/typography.tsx';

interface IProps extends Pick<ViewProps, 'style'> {
  imageSrc: string;
  text: string;
}
const ProductCard: FC<IProps> = ({ imageSrc, text, style }) => {
  const IMAGE_CONTAINER_SIZE = 80;

  const containerStyle = [styles.container, style];

  return (
    <View style={containerStyle}>
      <Image
        width={IMAGE_CONTAINER_SIZE}
        height={IMAGE_CONTAINER_SIZE}
        resizeMode="contain"
        src={imageSrc}
      />
      <Typography style={styles.text}>{text}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 17,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: GENERAL_COLORS.WHITE,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 12,
  },
});

export default ProductCard;
