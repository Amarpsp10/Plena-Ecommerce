import React from 'react';
import {Dimensions, View, ViewStyle} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {$flexColumnStyle, $flexRowStyle, colors, spacing} from '../../theme';

export const ProductListSkeleton = () => {
  return (
    <View style={$flexColumnStyle}>
      <View
        style={[
          $flexRowStyle,
          {
            paddingHorizontal: spacing.small,
          },
        ]}>
        <ProductListItemSkeleton />
        <ProductListItemSkeleton />
      </View>
      <View
        style={[
          $flexRowStyle,
          {
            paddingHorizontal: spacing.small,
          },
        ]}>
        <ProductListItemSkeleton />
        <ProductListItemSkeleton />
      </View>
    </View>
  );
};

export const ProductListItemSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={$container}>
        <SkeletonPlaceholder.Item
          width={Dimensions.get('window').width / 2 - 3 * spacing.small}
          height={200}
          borderRadius={10}
        />
        <View style={$flexColumnStyle}>
          <View style={$flexRowStyle}>
            <SkeletonPlaceholder.Item width={60} height={20} />
          </View>
          <View style={$flexRowStyle}>
            <SkeletonPlaceholder.Item width={100} height={20} marginTop={10} />
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const $container: ViewStyle = {
  flexDirection: 'column',
  gap: spacing.small,
  padding: spacing.small,
  backgroundColor: colors.lightBackground,
  borderRadius: 12,
};
