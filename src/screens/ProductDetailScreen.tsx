import {Alert, ToastAndroid, View, ViewStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStackScreenProps} from '../navigators/AppNavigator';
import {BackButton, Screen, Text, textSizeStyles} from '../components';
import {$flexColumnStyle, $flexRowStyle, colors, spacing} from '../theme';
import {ShoppingCartButton} from '../components/shopping-cart';
import {Rating} from 'react-native-ratings';
import {ImageCarousel} from '../components/products/ImageCarousel';
import {Button, Icon} from '@rneui/themed';
import {useStores} from '../store';

export function ProductDetailScreen({
  navigation,
  route,
}: AppStackScreenProps<'ProductDetail'>) {
  const product = route.params.product;
  const {
    accountStore: {
      isAddedTocartProducts,
      isAddedTofavouriteProducts,
      addProductTofavouriteProducts,
      removeProductFromfavouriteProducts,
      addProductTocartProducts,
      removeProductFromcartProducts,
    },
  } = useStores();
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  useEffect(() => {
    product.fetchProductDetails();
    setIsAddedToCart(isAddedTocartProducts(product));
    setIsFavourite(isAddedTofavouriteProducts(product));
  }, []);

  const onPressFavorite = () => {
    if (isFavourite) {
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
            setIsFavourite(false);
          },
        },
      ]);
    } else {
      addProductTofavouriteProducts(product);
      setIsFavourite(true);
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
            setIsAddedToCart(false);
          },
        },
      ]);
    } else {
      setIsAddedToCart(true);
      addProductTocartProducts(product);
      ToastAndroid.show('Added to cart', ToastAndroid.SHORT);
    }
  };

  return (
    <Screen>
      <View style={[$flexRowStyle, {padding: spacing.small}]}>
        <BackButton onPress={() => navigation.goBack()} />
        <ShoppingCartButton color={colors.text} />
      </View>
      <View style={[$flexColumnStyle, {paddingHorizontal: spacing.small}]}>
        <Text size="xxl">{product.title}</Text>
        <Text weight="semiBold" size="sm">
          {product.category}
        </Text>
        <View style={$ratingContainer}>
          <Rating
            imageSize={textSizeStyles.sm.fontSize}
            startingValue={product.rating || 0}
            readonly
          />
          <Text style={{color: colors.palette.neutral600}} size="xs">
            {' '}
            {product.rating} /5
          </Text>
        </View>
      </View>
      <View style={{marginTop: spacing.small}}>
        <Icon
          type="material-community"
          name={isFavourite ? 'heart' : 'heart-outline'}
          size={25}
          color={isFavourite ? colors.palette.red100 : colors.text}
          containerStyle={$favoriteIcon}
          backgroundColor={colors.background}
          iconStyle={{padding: spacing.tiny}}
          onPress={onPressFavorite}
        />
        <ImageCarousel images={product.images as string[]} />
      </View>
      <View style={[$flexColumnStyle, {padding: spacing.small}]}>
        <Text size="xl" weight="semiBold">
          ${product.price}
        </Text>
        <View style={$buttons}>
          <Button containerStyle={$button} type="outline" onPress={onPressCart}>
            <Text weight="semiBold" style={{color: colors.primary}} size="sm">
              {isAddedToCart ? 'Remove from cart' : 'Add to cart'}
            </Text>
          </Button>
          <Button
            containerStyle={$button}
            onPress={() => {
              addProductTocartProducts(product);
              navigation.navigate('ShoppingCart');
            }}>
            <Text weight="semiBold" style={{color: colors.palette.neutral100}}>
              Buy now
            </Text>
          </Button>
        </View>
        <Text size="sm" weight="normal">
          Description
        </Text>
        <Text
          style={{color: colors.palette.neutral600, marginTop: spacing.tiny}}
          size="sm">
          {product.description}
        </Text>
      </View>
    </Screen>
  );
}

const $buttons: ViewStyle = {
  ...$flexRowStyle,
  justifyContent: 'flex-start',
  gap: spacing.small,
  paddingVertical: spacing.small,
};

const $ratingContainer: ViewStyle = {
  ...$flexRowStyle,
  justifyContent: 'flex-start',
  marginTop: spacing.small,
};

const $button: ViewStyle = {
  flexGrow: 1,
};

const $favoriteIcon: ViewStyle = {
  position: 'absolute',
  top: 10,
  zIndex: 1,
  right: 10,
  borderRadius: 100,
};
