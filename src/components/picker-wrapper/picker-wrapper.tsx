import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CONTAINER_HEIGHT, ITEM_HEIGHT} from '@constants';
import {useTheme} from '@hooks';
import {SCREEN_WIDTH, BASE_PADDING} from '@constants';

interface WrapperProps {
  children: React.ReactNode;
}

export const PickerWrapper: React.FC<WrapperProps> = ({children}) => {
  const {colors} = useTheme();
  return (
    <>
      <View style={[styles.container]}>
        <View style={styles.center} />
      </View>
      <View
        style={[
          styles.container,
          {
            borderColor: colors.border,
            position: 'absolute',
          },
        ]}>
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - BASE_PADDING * 2,
    height: CONTAINER_HEIGHT,
    justifyContent: 'center',
    borderRadius: 15,
    alignSelf: 'center',
  },

  center: {
    height: ITEM_HEIGHT,
    backgroundColor: `${'#87ceec'}50`,
  },
});
