import {useTheme} from '@hooks';
import {fonts} from '@styles';
import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {Text} from '@components';

export const Loading: React.FC = () => {
  const {colors} = useTheme();
  return (
    <Modal transparent statusBarTranslucent animationType="fade">
      <View style={[styles.container, {backgroundColor: colors.backdrop}]}>
        <View style={[styles.content, {backgroundColor: colors.background}]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.text}>Loading ...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  text: {
    fontFamily: fonts.medium,
    marginTop: 8,
  },
  content: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
