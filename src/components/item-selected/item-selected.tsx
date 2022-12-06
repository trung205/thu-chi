import {Icon, Text} from '@components';
import {BASE_PADDING} from '@constants';
import {useTheme} from '@hooks';
import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

export interface ItemSelectedProps {
  label: string;
  onPress: () => void;
  checked: boolean;
  style?: StyleProp<ViewStyle>;
}
const ITEM_HEIGHT = 50;
export const ItemSelected: React.FC<ItemSelectedProps> = ({
  label,
  onPress,
  checked,
  style,
}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      {checked && (
        <Icon
          style={styles.icon}
          type={'ant-design'}
          name={'check'}
          color={colors.primary}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: ITEM_HEIGHT,
  },
  label: {
    flex: 1,
  },
  icon: {
    marginLeft: 8,
  },
});
