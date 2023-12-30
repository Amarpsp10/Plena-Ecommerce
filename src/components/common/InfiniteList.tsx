import {Icon} from '@rneui/themed';
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  View,
  ViewStyle,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {colors, spacing} from '../../theme';
import {Text} from './Text';

type InfiniteListProps = {
  style?: ViewStyle;
  initialLoading: boolean;
  data: any[];
  renderItem: (item: any) => React.ReactElement;
  fetchMore: () => Promise<void>;
  hasMore: boolean;
  onRefresh: () => Promise<void>;
  dataName?: string;
  hideWhileLoading?: boolean;
  noResultIcon?: string;
  noResultText?: string;
  containerStyle?: ViewStyle;
  headerComponent?: React.ReactElement;
  numOfColumns?: number;
  SkeletonComponent?: React.FC;
};

const InfiniteList = React.memo(
  ({
    style,
    initialLoading,
    data,
    renderItem,
    fetchMore,
    hasMore,
    onRefresh,
    dataName = 'data',
    hideWhileLoading = false,
    noResultIcon,
    noResultText,
    headerComponent,
    containerStyle,
    numOfColumns,
    SkeletonComponent,
  }: InfiniteListProps) => {
    const flatListRef = useRef(null);
    const [height, setHeight] = useState<number>(0);
    const [loading, setLoading] = React.useState(false);
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const handleLoadMore = async () => {
      if (!isRefreshing && !loading && hasMore) {
        setLoading(true);
        await fetchMore();
        setLoading(false);
      }
    };

    const handleRefresh = async () => {
      if (!loading) {
        setIsRefreshing(true);
        await onRefresh();
        setIsRefreshing(false);
      }
    };

    // eslint-disable-next-line react/no-unstable-nested-components
    const RenderHeader = () => {
      if (initialLoading && SkeletonComponent) {
        return <SkeletonComponent />;
      }

      return (
        <>
          {initialLoading || data?.length ? null : (
            <View style={[$notFoundScreen, {height}]}>
              {noResultIcon && (
                <Icon
                  type="material-community"
                  name={noResultIcon}
                  size={80}
                  color={colors.palette.neutral600}
                  style={{marginBottom: spacing.medium}}
                />
              )}
              <Text
                style={{color: colors.palette.neutral600}}
                weight="semiBold">
                {noResultText || `No ${dataName || 'Results'} Found`}
              </Text>
            </View>
          )}
        </>
      );
    };

    const renderFooter = () => {
      return loading ? (
        <ActivityIndicator
          size={24}
          color={colors.primary}
          style={{marginVertical: spacing.extraSmall}}
        />
      ) : (
        <View style={{height: 24 + 2 * spacing.extraSmall}} />
      );
    };

    return (
      <View
        onLayout={e => setHeight(e.nativeEvent.layout.height)}
        style={[$container, containerStyle]}>
        <FlashList
          contentContainerStyle={{...style}}
          ref={flatListRef}
          numColumns={numOfColumns || 1}
          scrollEnabled={Boolean(initialLoading || data?.length)}
          data={!hideWhileLoading ? data : initialLoading ? [] : data}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={renderItem}
          ListHeaderComponent={
            <>
              {headerComponent}
              <RenderHeader />
            </>
          }
          ListFooterComponent={renderFooter}
          estimatedItemSize={30}
          onEndReached={handleLoadMore}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
          keyboardShouldPersistTaps="always"
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              tintColor={'#000000'}
              title={'Pull to refresh'}
              titleColor={'#000000'}
            />
          }
        />
      </View>
    );
  },
);

const $container: ViewStyle = {
  flex: 1,
  width: Dimensions.get('screen').width,
};

const $notFoundScreen: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

export default InfiniteList;
