import {Text} from '@components';
import {ITEM_HEIGHT} from '@constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface PickerItemProps {
  label: any;
}

export const PickerItem: React.FC<PickerItemProps> = ({label}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    textAlignVertical: 'center',
  },
});
