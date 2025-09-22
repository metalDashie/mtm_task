import React, { FC, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

interface IProps {
  size?: number;
}
const DefaultLoader: FC<IProps> = ({ size = 32 }) => {
  const INITIAL_ANIMATION_VALUE = 0;
  const FINAL_ANIMATION_VALUE = 1;
  const ANIMATION_DURATION = 2000;

  const loaderRotation = useRef(
    new Animated.Value(INITIAL_ANIMATION_VALUE),
  ).current;

  const containerStyle = {
    width: size,
    height: size,
    transform: [
      {
        rotate: loaderRotation.interpolate({
          inputRange: [INITIAL_ANIMATION_VALUE, FINAL_ANIMATION_VALUE],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  useEffect(() => {
    loaderRotation.setValue(INITIAL_ANIMATION_VALUE);
    Animated.loop(
      Animated.timing(loaderRotation, {
        toValue: FINAL_ANIMATION_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  return (
    <Animated.Image
      source={require('../../../assets/images/loader.png')}
      style={containerStyle}
    />
  );
};

export default DefaultLoader;
