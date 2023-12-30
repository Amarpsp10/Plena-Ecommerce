import {Icon} from '@rneui/themed';
import React from 'react';
import {ViewStyle} from 'react-native';
import {colors, spacing} from '../../theme';

export const IconButton = ({
  style,
  onPress,
  name,
  size,
}: {
  style?: ViewStyle;
  onPress: () => void;
  name: string;
  size?: number;
}) => {
  return (
    <Icon
      size={size || 25}
      type="material-community"
      color={colors.textTitle}
      style={style}
      backgroundColor={colors.lightBackground}
      iconStyle={{padding: spacing.small}}
      containerStyle={{borderRadius: 50}}
      name={name}
      onPress={onPress}
    />
  );
};
