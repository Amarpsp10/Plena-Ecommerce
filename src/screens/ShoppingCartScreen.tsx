import React from 'react';
import {ScrollView, View, ViewStyle} from 'react-native';
import {AppStackScreenProps} from '../navigators/AppNavigator';
import {BackButton, Screen, Text} from '../components';
import {$flexRowStyle, colors, spacing} from '../theme';
import {observer} from 'mobx-react-lite';
import {useStores} from '../store';
import {Button, Icon} from '@rneui/themed';
import {CartProductListItem} from '../components/shopping-cart';

export const ShoppingCartScreen = observer(
  ({navigation}: AppStackScreenProps<'ShoppingCart'>) => {
    const {
      accountStore: {cartProductsCount, cartProductsTotalPrice, cartProducts},
    } = useStores();
    return (
      <Screen>
        <View style={$header}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={{marginLeft: spacing.medium}} size="md">
            Shopping Cart ({cartProductsCount})
          </Text>
        </View>
        {cartProductsCount === 0 ? (
          <View style={$emptyScreen}>
            <Icon
              color={colors.textDim}
              type="material-community"
              name="cart-off"
              size={100}
            />
            <Text size="md" weight="semiBold" style={{color: colors.textDim}}>
              Your cart is empty
            </Text>
          </View>
        ) : (
          <>
            <ScrollView>
              <View style={$cartProductsListContainer}>
                {cartProducts.map(product => (
                  <CartProductListItem key={product.id} product={product} />
                ))}
              </View>
            </ScrollView>
            <View style={$checkoutContainer}>
              <View style={$checkoutList}>
                <Text style={{color: colors.textDim}}>Subtotal</Text>
                <Text>${cartProductsTotalPrice}</Text>
              </View>
              <View style={$checkoutList}>
                <Text style={{color: colors.textDim}}>Subtotal</Text>
                <Text>$2.00</Text>
              </View>
              <View style={$checkoutList}>
                <Text style={{color: colors.textDim}}>Total</Text>
                <Text>${cartProductsTotalPrice + 2}</Text>
              </View>
              <Button
                containerStyle={{paddingTop: spacing.medium}}
                buttonStyle={{paddingVertical: spacing.medium}}>
                <Text
                  weight="semiBold"
                  style={{color: colors.palette.neutral100}}>
                  Proceed To Checkout
                </Text>
              </Button>
            </View>
          </>
        )}
      </Screen>
    );
  },
);

const $header: ViewStyle = {
  ...$flexRowStyle,
  justifyContent: 'flex-start',
  padding: spacing.small,
};

const $cartProductsListContainer: ViewStyle = {
  flexDirection: 'column',
  padding: spacing.small,
  width: '100%',
  flexWrap: 'wrap',
};

const $checkoutContainer: ViewStyle = {
  position: 'absolute',
  bottom: spacing.small,
  left: spacing.small,
  right: spacing.small,
  backgroundColor: colors.lightBackground,
  flexDirection: 'column',
  padding: spacing.medium,
  gap: spacing.small,
  borderRadius: 20,
  zIndex: 1,
};

const $checkoutList: ViewStyle = {
  ...$flexRowStyle,
  paddingHorizontal: spacing.small,
};

const $emptyScreen: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  gap: spacing.small,
};
