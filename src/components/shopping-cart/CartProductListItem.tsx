import React from 'react';
import {observer} from 'mobx-react-lite';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useStores} from '../../store';
import {AppStackParamList} from '../../navigators/AppNavigator';
import {Alert, ImageStyle, ToastAndroid, ViewStyle} from 'react-native';
import {$flexColumnStyle, $flexRowStyle, colors, spacing} from '../../theme';
import {IconButton, Text} from '..';
import {Product} from '../../store/models/ProductModel';
import {View, Image, Pressable} from 'react-native';

type CartProductListItemProps = {
  product: Product;
};

export const CartProductListItem = observer(
  ({product}: CartProductListItemProps) => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const {
      accountStore: {
        cartProductsProductCount,
        increaseProductCount,
        decreaseProductCount,
        removeProductFromcartProducts,
      },
    } = useStores();

    return (
      <Pressable
        onPress={() => {
          navigation.navigate('ProductDetail', {product: product});
        }}
        style={$product}
        key={product.id}>
        <View style={$productInfo}>
          <Image
            source={{uri: product.thumbnail || ''}}
            alt={product.title}
            style={$thumbnail}
          />
          <View style={[$flexColumnStyle, {flex: 1}]}>
            <Text
              numberOfLines={1}
              style={{width: '100%'}}
              ellipsizeMode="tail">
              {product.title}
            </Text>
            <Text>${product.price}</Text>
          </View>
        </View>
        <View style={[$flexRowStyle]}>
          <IconButton
            name="minus"
            size={20}
            onPress={() => {
              if (cartProductsProductCount[product.id] === 1) {
                Alert.alert(
                  'Remove Product',
                  'Are you sure you want to remove this product from your cart?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Remove',
                      onPress: () => {
                        removeProductFromcartProducts(product);
                        ToastAndroid.show(
                          'Product removed from cart',
                          ToastAndroid.SHORT,
                        );
                      },
                    },
                  ],
                );
              } else {
                decreaseProductCount(product);
              }
            }}
          />
          <Text style={{marginHorizontal: spacing.small}}>
            {cartProductsProductCount[product.id]}
          </Text>
          <IconButton
            name="plus"
            size={20}
            onPress={() => {
              increaseProductCount(product);
            }}
          />
        </View>
      </Pressable>
    );
  },
);

const $product: ViewStyle = {
  ...$flexRowStyle,
  padding: spacing.small,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.neutral300,
};

const $productInfo: ViewStyle = {
  ...$flexRowStyle,
  gap: spacing.small,
  justifyContent: 'flex-start',
  flex: 1,
};

const $thumbnail: ImageStyle = {
  width: 50,
  height: 50,
  resizeMode: 'cover',
  borderRadius: 10,
};
