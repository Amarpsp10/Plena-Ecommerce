import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import {TabNavigator} from './TabNavigator';
import {ProductDetailScreen, ShoppingCartScreen} from '../screens';
import {ThemeProvider} from '@rneui/themed';
import reactNativeElementsTheme from '../theme/reactNativeElementsTheme';
import {Product} from '../store/models/ProductModel';

export type AppStackParamList = {
  HomeTabBar: undefined;
  ProductDetail: {product: Product};
  ShoppingCart: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;

export const AppStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeTabBar"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeTabBar" component={TabNavigator} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
    </Stack.Navigator>
  );
};

const Stack = createStackNavigator<AppStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <ThemeProvider theme={reactNativeElementsTheme}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </ThemeProvider>
  );
};
