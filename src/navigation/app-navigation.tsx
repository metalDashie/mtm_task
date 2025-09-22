import { NavigationContainer } from '@react-navigation/native';

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home-screen/home-screen.tsx';
import ProductScreen from '../screens/product-screen/product-screen.tsx';
import { IProduct } from '../services/api/api.types.ts';

export enum AppScreenNamesEnum {
  HOME = 'home',
  PRODUCT = 'product',
}

export type RootStackParamList = {
  [AppScreenNamesEnum.HOME]: undefined;
  [AppScreenNamesEnum.PRODUCT]: IProduct;
};

export type RootStackScreenProps<TAppScreenName extends AppScreenNamesEnum> =
  NativeStackScreenProps<RootStackParamList, TAppScreenName>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={AppScreenNamesEnum.HOME}>
        <Stack.Screen
          name={AppScreenNamesEnum.HOME}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={AppScreenNamesEnum.PRODUCT}
          component={ProductScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
