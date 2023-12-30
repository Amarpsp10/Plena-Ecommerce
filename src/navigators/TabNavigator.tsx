import React from 'react';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {AppStackParamList, AppStackScreenProps} from './AppNavigator';
import {HomeScreen, WorkInProgressScreen} from '../screens';
import {View, ViewStyle} from 'react-native';
import {colors, spacing} from '../theme';
import {Icon} from '@rneui/themed';
import {Text} from '../components';

export type TabParamList = {
  Home: undefined;
  Categories: undefined;
  Favourites: undefined;
  More: undefined;
};

export type TabbarScreenProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: $tabBar,
        headerShown: false,
        tabBarShowLabel: false,
        headerBackgroundContainerStyle: {
          backgroundColor: colors.palette.neutral100,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <View style={focused ? $tabBarActive : $tabBarInactive}>
              <Icon
                type="material-community"
                backgroundColor={
                  focused ? colors.text : colors.palette.neutral100
                }
                color={focused ? colors.palette.secondary100 : colors.text}
                name={focused ? 'home-variant' : 'home-variant-outline'}
              />
              {!focused ? (
                <Text
                  size="xxs"
                  weight="semiBold"
                  style={{color: colors.textDim}}>
                  Home
                </Text>
              ) : null}
            </View>
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Categories"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <View style={focused ? $tabBarActive : $tabBarInactive}>
              <Icon
                backgroundColor={
                  focused ? colors.text : colors.palette.neutral100
                }
                type="material-community"
                color={focused ? colors.palette.secondary100 : colors.text}
                name={focused ? 'view-grid' : 'view-grid-outline'}
              />
              {!focused ? (
                <Text
                  size="xxs"
                  weight="semiBold"
                  style={{color: colors.textDim}}>
                  Categories
                </Text>
              ) : null}
            </View>
          ),
        }}
        component={WorkInProgressScreen}
      />
      <Tab.Screen
        name="Favourites"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <View style={focused ? $tabBarActive : $tabBarInactive}>
              <Icon
                backgroundColor={
                  focused ? colors.text : colors.palette.neutral100
                }
                type="material-community"
                color={focused ? colors.palette.secondary100 : colors.text}
                name={focused ? 'heart' : 'heart-outline'}
              />
              {!focused ? (
                <Text
                  size="xxs"
                  weight="semiBold"
                  style={{color: colors.textDim}}>
                  Favourite
                </Text>
              ) : null}
            </View>
          ),
        }}
        component={WorkInProgressScreen}
      />
      <Tab.Screen
        name="More"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <View style={focused ? $tabBarActive : $tabBarInactive}>
              <Icon
                backgroundColor={
                  focused ? colors.text : colors.palette.neutral100
                }
                type="material-community"
                color={focused ? colors.palette.secondary100 : colors.text}
                name={focused ? 'cog' : 'cog-outline'}
              />
              {!focused ? (
                <Text
                  size="xxs"
                  weight="semiBold"
                  style={{color: colors.textDim}}>
                  Settings
                </Text>
              ) : null}
            </View>
          ),
        }}
        component={WorkInProgressScreen}
      />
    </Tab.Navigator>
  );
};

const $tabBar: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  elevation: 10,
  height: 70,
};

const $tabBarActive: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: spacing.small,
  marginTop: -spacing.large,
  width: 60,
  height: 60,
  backgroundColor: colors.text,
  borderRadius: 35,
};

const $tabBarInactive: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: spacing.small,
};
