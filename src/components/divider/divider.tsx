import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@hooks';

export const Divider = () => {
  const {colors} = useTheme();
  return <View style={[styles.container, {borderColor: colors.border}]} />;
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
