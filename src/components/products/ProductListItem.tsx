import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageStyle,
  View,
  ViewStyle,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Product} from '../../store/models/ProductModel';
import {Text} from '..';
import {$flexColumnStyle, $flexRowStyle, colors, spacing} from '../../theme';
import {observer} from 'mobx-react-lite';
import {Icon, Image} from '@rneui/themed';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '../../navigators/AppNavigator';
import {useStores} from '../../store';

export const ProductListItem = observer(({product}: {product: Product}) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const {
    accountStore: {
      isAddedTocartProducts,
      addProductTocartProducts,
      favouriteProductsCount,
      cartProductsCount,
      removeProductFromcartProducts,
      addProductTofavouriteProducts,
      removeProductFromfavouriteProducts,
      isAddedTofavouriteProducts,
    },
  } = useStores();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedTofavourite, setIsAddedTofavourite] = useState(false);

  useEffect(() => {
    setIsAddedToCart(isAddedTocartProducts(product));
    setIsAddedTofavourite(isAddedTofavouriteProducts(product));
  }, [product, favouriteProductsCount, cartProductsCount]);

  const onFavoritePress = () => {
    if (isAddedTofavourite) {
      Alert.alert('Remove from favourite', 'Are you sure?', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            removeProductFromfavouriteProducts(product);
            ToastAndroid.show('Removed from favourite', ToastAndroid.SHORT);
          },
        },
      ]);
    } else {
      addProductTofavouriteProducts(product);
      ToastAndroid.show('Added to favourite', ToastAndroid.SHORT);
    }
  };

  const onPressCart = () => {
    if (isAddedToCart) {
      Alert.alert('Remove from cart', 'Are you sure?', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            removeProductFromcartProducts(product);
            ToastAndroid.show('Removed from cart', ToastAndroid.SHORT);
          },
        },
      ]);
    } else {
      addProductTocartProducts(product);
      ToastAndroid.show('Added to cart', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={$wrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ProductDetail', {product})}
        style={$container}>
        <View>
          <Image source={{uri: product.thumbnail || ''}} style={$thumbnail} />
          <Icon
            type="material-community"
            name={isAddedTofavourite ? 'heart' : 'heart-outline'}
            size={25}
            color={isAddedTofavourite ? colors.palette.red100 : colors.text}
            containerStyle={$favoriteIcon}
            onPress={onFavoritePress}
          />
        </View>
        <View style={$flexColumnStyle}>
          <View style={$flexRowStyle}>
            <Text weight="semiBold" size="sm">
              ${product.price}
            </Text>
            <Icon
              backgroundColor={colors.primary}
              color={colors.background}
              style={{padding: spacing.micro}}
              type="material-community"
              name={isAddedToCart ? 'check' : 'plus'}
              onPress={onPressCart}
            />
          </View>
          <Text weight="normal" numberOfLines={1} size="sm">
            {product.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});

const $container: ViewStyle = {
  flexDirection: 'column',
  gap: spacing.small,
  padding: spacing.small,
  backgroundColor: colors.lightBackground,
  borderRadius: 12,
};

const $wrapper: ViewStyle = {
  width: '100%',
  padding: spacing.extraSmall,
};

const $thumbnail: ImageStyle = {
  width: '100%',
  height: 200,
  borderRadius: 10,
};

const $favoriteIcon: ViewStyle = {
  position: 'absolute',
  top: 0,
  zIndex: 1,
  right: 0,
  borderRadius: 50,
  padding: spacing.tiny,
};
