import {Icon, IconProps} from '@components';
import {useTheme} from '@hooks';
import React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface IFabButton {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  icon?: IconProps;
}

const BUTTON_WIDTH = 60;

export const FabButton: React.FC<IFabButton> = ({style, onPress, icon}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style, {backgroundColor: colors.primary}]}>
      {icon ? (
        <Icon type={icon.type} name={icon.name} size={20} />
      ) : (
        <Icon type={'ant-design'} name={'plus'} size={20} />
      )}
    </TouchableOpacity>
  );
};
export const styles = StyleSheet.create({
  container: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
