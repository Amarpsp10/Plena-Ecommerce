import {Icon} from '@rneui/themed';
import React from 'react';
import {TouchableWithoutFeedback, View, ViewStyle} from 'react-native';
import {colors, spacing} from '../../theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '../../navigators/AppNavigator';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../store';
import {Text} from '..';

export const ShoppingCartButton = observer(
  ({style, color}: {style?: ViewStyle; color?: string}) => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const {
      accountStore: {cartProductsCount},
    } = useStores();
    return (
      <View>
        <Icon
          size={25}
          type="ionicon"
          color={color || colors.secondary}
          style={style}
          name="bag-handle-outline"
          iconStyle={{padding: spacing.small}}
          containerStyle={{borderRadius: 50}}
          onPress={() => {
            navigation.navigate('ShoppingCart');
          }}
        />
        {cartProductsCount > 0 ? (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('ShoppingCart');
            }}>
            <View style={$cartCount}>
              <Text
                size="xxs"
                weight="semiBold"
                style={{color: colors.palette.neutral100}}>
                {cartProductsCount}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    );
  },
);

const $cartCount: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  backgroundColor: colors.palette.secondary100,
  borderRadius: 100,
  justifyContent: 'center',
  paddingHorizontal: spacing.small - 2,
  paddingVertical: spacing.tiny,
  alignItems: 'center',
};
