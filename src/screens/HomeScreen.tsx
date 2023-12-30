import {ScrollView, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Screen, Text} from '../components';
import {$flexRowStyle, colors, spacing} from '../theme';
import {ShoppingCartButton} from '../components/shopping-cart';
import {Icon} from '@rneui/themed';
import {DropDown} from '../components/common/DropDown';
import {OfferCard} from '../components/products';
import InfiniteList from '../components/common/InfiniteList';
import {ProductListItem} from '../components/products/ProductListItem';
import {useStores} from '../store';
import {addressesOption, deliveryTimeOption} from '../constants/options';
import {ProductListSkeleton} from '../components/products/ProductListSkeleton';

export const HomeScreen = observer(() => {
  const {
    productStore: {
      products,
      loading,
      hasMoreProducts,
      refreshProducts,
      loadMoreProducts,
    },
  } = useStores();
  const [deliverTo, setDeliverTo] = React.useState(addressesOption[0].value);
  const [deliveryWithin, setDeliveryWithin] = React.useState(
    deliveryTimeOption[0].value,
  );

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <Screen>
      <View style={$header}>
        <View style={$flexRowStyle}>
          <Text size="xl" weight="semiBold" style={{color: colors.secondary}}>
            Hey, Rahul
          </Text>
          <ShoppingCartButton />
        </View>
        <TouchableOpacity activeOpacity={0.8} style={$searchContainer}>
          <Icon
            type="material-community"
            name="magnify"
            color={colors.background}
          />
          <Text
            size="xs"
            style={{
              color: colors.palette.neutral400,
              marginLeft: spacing.small,
            }}>
            Search products or store
          </Text>
        </TouchableOpacity>
        <View
          style={[
            $flexRowStyle,
            {marginTop: spacing.large, gap: spacing.small},
          ]}>
          <DropDown
            label="Delivery to"
            placeholder="Select"
            options={addressesOption}
            selected={deliverTo}
            onSelect={setDeliverTo}
            isDark={true}
          />
          <DropDown
            label="whithin"
            placeholder="Select Time"
            options={deliveryTimeOption}
            selected={deliveryWithin}
            onSelect={setDeliveryWithin}
            isDark={true}
          />
        </View>
      </View>
      <InfiniteList
        initialLoading={loading}
        numOfColumns={2}
        containerStyle={{paddingHorizontal: spacing.tiny}}
        data={products?.map(product => product) || []}
        renderItem={({item, index}) => (
          <ProductListItem product={item} key={index} />
        )}
        SkeletonComponent={() => <ProductListSkeleton />}
        fetchMore={loadMoreProducts}
        hasMore={hasMoreProducts}
        onRefresh={refreshProducts}
        dataName={'Products'}
        noResultText={'No Products Found'}
        headerComponent={
          <>
            <View>
              <ScrollView contentContainerStyle={$offerContainer} horizontal>
                <OfferCard
                  image=""
                  title="Get"
                  discount="50"
                  description="On first 03 order"
                  color={colors.palette.secondary100}
                />
                <OfferCard
                  image=""
                  title="Get"
                  discount="20"
                  description="On first order"
                  color={colors.palette.secondary200}
                />
                <OfferCard
                  image=""
                  title="Get"
                  discount="10"
                  description="order above 1000"
                  color={colors.palette.neutral300}
                />
              </ScrollView>
            </View>
            <Text
              style={{marginLeft: spacing.extraSmall, marginTop: spacing.small}}
              size="xxl">
              Recommended
            </Text>
          </>
        }
      />
    </Screen>
  );
});

const $header: ViewStyle = {
  flexDirection: 'column',
  padding: spacing.medium,
  backgroundColor: colors.primary,
};

const $searchContainer: ViewStyle = {
  width: '100%',
  backgroundColor: colors.palette.primary200,
  borderRadius: 50,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingVertical: spacing.small,
  paddingHorizontal: spacing.extraLarge,
  marginTop: spacing.large,
};

const $offerContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  padding: spacing.extraSmall,
  gap: spacing.small,
};
