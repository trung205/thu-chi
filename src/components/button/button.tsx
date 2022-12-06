import {Text} from '@components';
import {useTheme} from '@hooks';
import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, View} from 'react-native';
interface ButtonProps {
  title?: string;
  onPress?: () => void;
  style?: StyleProp<any>;
  type?: 'solid' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  type = 'solid',
}) => {
  const {colors} = useTheme();

  const renderButtonContainer = () => {
    switch (type) {
      case 'solid':
        return {
          backgroundColor: colors.primary,
        };
      case 'outline':
        return {
          borderWidth: 1,
          borderColor: colors.primary,
        };
    }
  };

  const renderButtonTittle = () => {
    switch (type) {
      case 'solid':
        return {
          color: colors.white,
        };
      case 'outline':
        return {
          color: colors.primary,
        };
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, renderButtonContainer(), style]}>
        <Text style={renderButtonTittle()}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
