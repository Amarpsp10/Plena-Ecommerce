import React from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {Text} from '.';
import {BottomSheet, Divider, Icon} from '@rneui/themed';
import {colors, spacing} from '../../theme';

type DropDownProps = {
  options: Array<{label: string; value: string}>;
  selected: string;
  onSelect: (value: string) => void;
  label: string;
  placeholder?: string;
  isDark?: boolean;
};

export const DropDown: React.FC<DropDownProps> = props => {
  const {options, selected, onSelect, label, placeholder, isDark} = props;
  const [open, setOpen] = React.useState(false);

  return (
    <View style={$container}>
      <Text
        size="xxs"
        style={{color: isDark ? colors.palette.neutral300 : colors.text}}>
        {label.toUpperCase()}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          size="sm"
          style={{color: isDark ? colors.palette.neutral100 : colors.text}}>
          {options?.find(option => option.value === selected)?.label ||
            placeholder}
        </Text>
        <Icon
          size={20}
          type="material-community"
          name="chevron-down"
          style={{marginLeft: spacing.small}}
          color={colors.palette.neutral100}
        />
      </TouchableOpacity>
      <BottomSheet isVisible={open} onBackdropPress={() => setOpen(false)}>
        <View style={$bottomSheet}>
          <Text
            size="md"
            weight="semiBold"
            style={{padding: spacing.medium, color: colors.text}}>
            {label}
          </Text>
          <Divider />
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              activeOpacity={0.8}
              onPress={() => {
                onSelect(option.value);
                setOpen(false);
              }}
              style={{
                paddingVertical: spacing.small,
                paddingHorizontal: spacing.medium,
                backgroundColor:
                  option.value === selected
                    ? colors.lightBackground
                    : colors.background,
              }}>
              <Text size="sm">{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    </View>
  );
};

const $container: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'flex-start',
};

const $bottomSheet: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: 10,
  flexDirection: 'column',
  justifyContent: 'flex-start',
};
