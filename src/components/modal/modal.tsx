import {useTheme} from '@hooks';
import React from 'react';
import {
  Modal as ReactNativeModal,
  ModalProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';

interface MainModalProps extends ModalProps {
  visible?: boolean;

  onBackdropPress?: () => void;
  children?: React.ReactNode;
}

export const MainModal: React.FC<MainModalProps> = ({
  visible,
  onBackdropPress,
  children,
  ...rest
}) => {
  const {colors} = useTheme();

  return (
    <>
      <ReactNativeModal
        animationType={'fade'}
        visible={visible}
        transparent
        {...rest}>
        <View style={[styles.container, {backgroundColor: colors.backdrop}]}>
          <TouchableWithoutFeedback onPress={onBackdropPress}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          <View style={[styles.viewContent, {backgroundColor: colors.card}]}>
            {children}
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
};
