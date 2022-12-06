import {useTheme} from '@hooks';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
}
export const Container: React.FC<ContainerProps> = ({children}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
