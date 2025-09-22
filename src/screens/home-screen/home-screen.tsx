import React, { FC, useEffect, useRef, useState } from 'react';
import {
  AppScreenNamesEnum,
  RootStackScreenProps,
} from '../../navigation/app-navigation';
import {
  Animated,
  FlatList,
  FlatListProps,
  StyleSheet,
  View,
} from 'react-native';
import { IProduct, IProductsResponse } from '../../services/api/api.types.ts';
import { ApiService } from '../../services/api/api.ts';
import RefreshTextButton from '../../components/buttons/text-button/instances/refresh-text-button.tsx';
import ProductCard from './components/product-card.tsx';
import ScreenWrapper from '../../features/screen-wrapper/screen-wrapper.tsx';
import DefaultLoader from '../../components/loaders/default-loader/default-loader.tsx';
import { IHeaderProps } from '../../components/header/header.tsx';
import { appLogger } from '../../services/logger/logger.ts';

const keyExtractor: FlatListProps<IProduct>['keyExtractor'] = item => item.id;

enum FetchingProductsErrorsEnum {
  DEFAULT_ERROR,
}

const HomeScreen: FC<RootStackScreenProps<AppScreenNamesEnum.HOME>> = ({
  navigation,
}) => {
  const [products, setProducts] = useState<IProductsResponse | null>(null);
  const [error, setError] = useState<FetchingProductsErrorsEnum | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const INITIAL_GAP_VALUE = 4;
  const FINAL_GAP_VALUE = 14;
  const INITIAL_OPACITY_VALUE = 0.5;
  const FINAL_OPACITY_VALUE = 1;
  const ANIMATION_DURATION = 300;

  const itemGapAnimation = useRef(
    new Animated.Value(INITIAL_GAP_VALUE),
  ).current;
  const itemOpacityAnimation = useRef(
    new Animated.Value(INITIAL_OPACITY_VALUE),
  ).current;

  const fetchProducts = async () => {
    try {
      itemGapAnimation.setValue(INITIAL_GAP_VALUE);
      itemOpacityAnimation.setValue(0.5);

      setIsLoading(true);
      setProducts(null);
      setError(null);

      const response = await ApiService.fetchRandomItems();
      setProducts(response);
    } catch (error) {
      appLogger.error('Failed to fetch products:', error);
      setError(FetchingProductsErrorsEnum.DEFAULT_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem: FlatListProps<IProduct>['renderItem'] = ({ item }) => {
    const onItemPress = () => {
      navigation.navigate(AppScreenNamesEnum.PRODUCT, item);
    };

    const itemContainerStyle = {
      marginBottom: itemGapAnimation,
      opacity: itemOpacityAnimation,
    };

    return (
      <Animated.View style={itemContainerStyle}>
        <ProductCard product={item} onPress={onItemPress} />
      </Animated.View>
    );
  };

  const headerProps: IHeaderProps = {
    rightButton: {
      iconName: 'refresh',
      onPress: fetchProducts,
    },
    title: products?.title,
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products) {
      Animated.parallel([
        Animated.timing(itemGapAnimation, {
          toValue: FINAL_GAP_VALUE,
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(itemOpacityAnimation, {
          toValue: FINAL_OPACITY_VALUE,
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [products]);

  return (
    <ScreenWrapper headerProps={headerProps}>
      <View style={styles.contentContainer}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <DefaultLoader />
          </View>
        ) : error !== null ? (
          <RefreshTextButton onPress={fetchProducts} />
        ) : (
          <FlatList
            data={products?.items || []}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: { paddingTop: 15, flex: 1, paddingHorizontal: 23 },
  loaderContainer: { alignItems: 'center' },
});

export default HomeScreen;
