import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import {
  AppScreenNamesEnum,
  RootStackScreenProps,
} from '../../navigation/app-navigation.tsx';
import { ApiService } from '../../services/api/api.ts';
import { IProductAdditionalTextResponse } from '../../services/api/api.types.ts';
import ProductCard from './components/product-card.tsx';
import RefreshTextButton from '../../components/buttons/text-button/instances/refresh-text-button.tsx';
import { formatColorFromBE } from '../../utils/color-formatter.ts';
import ScreenWrapper from '../../features/screen-wrapper/screen-wrapper.tsx';
import { IHeaderProps } from '../../components/header/header.tsx';
import DefaultLoader from '../../components/loaders/default-loader/default-loader.tsx';
import { appLogger } from '../../services/logger/logger.ts';

enum FetchingProductErrorsEnum {
  DEFAULT_ERROR,
}

const ProductScreen: FC<RootStackScreenProps<AppScreenNamesEnum.PRODUCT>> = ({
  route,
  navigation,
}) => {
  const [productAdditionalData, setProductAdditionalData] =
    useState<IProductAdditionalTextResponse | null>(null);
  const [error, setError] = useState<FetchingProductErrorsEnum | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const INITIAL_OPACITY_VALUE = 0;
  const FINAL_OPACITY_VALUE = 1;
  const ANIMATION_DURATION = 300;

  const itemOpacityAnimation = useRef(
    new Animated.Value(INITIAL_OPACITY_VALUE),
  ).current;

  const product = route.params;

  const imageUrl = ApiService.getImageCorrectUrl(product.image);

  const fetchProductAdditionalData = async () => {
    try {
      itemOpacityAnimation.setValue(0);

      setIsLoading(true);
      setProductAdditionalData(null);
      setError(null);

      const response = await ApiService.fetchProductText(route.params.id);
      setProductAdditionalData(response);
    } catch (error) {
      appLogger.error('Failed to fetch product info:', error);
      setError(FetchingProductErrorsEnum.DEFAULT_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchProductAdditionalData(true);
  };

  const headerProps: IHeaderProps = {
    leftButton: {
      iconName: 'leftArrow',
      onPress: navigation.goBack,
    },
    rightButton: {
      iconName: 'refresh',
      onPress: handleRefresh,
    },
    title: product.name,
  };

  useEffect(() => {
    fetchProductAdditionalData();
  }, []);

  useEffect(() => {
    if (productAdditionalData) {
      Animated.timing(itemOpacityAnimation, {
        toValue: FINAL_OPACITY_VALUE,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    }
  }, [productAdditionalData]);

  return (
    <ScreenWrapper headerProps={headerProps}>
      <View style={styles.contentContainer}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <DefaultLoader />
          </View>
        ) : error !== null ? (
          <RefreshTextButton onPress={handleRefresh} />
        ) : (
          <Animated.View style={{ opacity: itemOpacityAnimation }}>
            <ProductCard
              imageSrc={imageUrl}
              text={productAdditionalData!.text}
              style={{
                backgroundColor: formatColorFromBE(product.color),
              }}
            />
          </Animated.View>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: { paddingTop: 15, flex: 1, paddingHorizontal: 23 },
  loaderContainer: { alignItems: 'center' },
});

export default ProductScreen;
