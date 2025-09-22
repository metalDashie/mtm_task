import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { GENERAL_COLORS } from '../../../constants/colors.ts';
import { ApiService } from '../../../services/api/api.ts';
import { IProduct } from '../../../services/api/api.types.ts';
import { formatColorFromBE } from '../../../utils/color-formatter.ts';
import Typography from '../../../components/typography/typography.tsx';

interface IProductCardProps {
  product: IProduct;
  onPress?: () => void;
}
export const ProductCard: React.FC<IProductCardProps> = ({
  product,
  onPress,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const imageUrl = ApiService.getImageCorrectUrl(product.image);

  const containerStyle = [
    styles.card,
    { backgroundColor: formatColorFromBE(product.color) },
  ];

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Typography style={styles.itemName}>{product.name}</Typography>
      <View style={styles.imageContainer}>
        {imageLoading && (
          <View style={styles.imagePlaceholder}>
            <ActivityIndicator size="small" color={GENERAL_COLORS.WHITE} />
          </View>
        )}
        {!imageError ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Typography style={styles.placeholderText}>No Image</Typography>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const IMAGE_SIZE = 50;

const styles = StyleSheet.create({
  card: {
    padding: 5,
    paddingLeft: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  imagePlaceholder: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 10,
    textAlign: 'center',
    color: GENERAL_COLORS.WHITE,
  },
  itemName: {
    fontWeight: '400',
    fontSize: 16,
    color: GENERAL_COLORS.WHITE,
    flex: 1,
  },
});

export default ProductCard;
