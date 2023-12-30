import React from 'react';
import {ImageStyle, View, ViewStyle} from 'react-native';
import {colors, spacing} from '../../theme';
import {Text} from '..';
import {Image} from '@rneui/themed';

type OfferCardProps = {
  image: string;
  title: string;
  discount: string;
  description: string;
  color: string;
};

export const OfferCard: React.FC<OfferCardProps> = props => {
  const {image, title, discount, description, color} = props;

  return (
    <View style={[$container, {backgroundColor: color}]}>
      <Image
        source={{uri: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'}}
        style={$image}
      />
      <View style={$offerDetails}>
        <Text
          size="lg"
          weight="normal"
          style={{color: colors.palette.neutral100}}>
          {title}
        </Text>
        <Text
          size="xl"
          weight="bold"
          style={{color: colors.palette.neutral100}}>
          {discount}% OFF
        </Text>
        <Text
          size="xxs"
          weight="normal"
          style={{color: colors.palette.neutral100}}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const $container: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 20,
  padding: spacing.small,
};

const $image: ImageStyle = {
  width: 90,
  height: 90,
  borderRadius: 10,
  resizeMode: 'cover',
};

const $offerDetails: ViewStyle = {
  flexDirection: 'column',
  marginLeft: spacing.medium,
};
