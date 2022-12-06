import {Button, Icon, Text} from '@components';
import {useTheme} from '@hooks';
import {styleCommon} from '@styles';
import React from 'react';
import {Modal, ModalProps, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from './styles';

interface CustomModalProps extends ModalProps {
  visible?: boolean;
  title?: string;
  message?: string;

  icon?: 'error' | 'success' | 'warning';
  cancelable?: boolean;
  onBackdropPress?: () => void;
  negativeButtonText?: string;
  positiveButtonText?: string;
  onNegativeButton?: () => void;
  onPositiveButton?: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  message,
  icon,
  cancelable,
  onBackdropPress,
  negativeButtonText,
  positiveButtonText,
  onPositiveButton,
  onNegativeButton,
  ...rest
}) => {
  const {colors} = useTheme();

  const renderIcon = () => {
    switch (icon) {
      case 'error':
        return 'close-outline';
      case 'success':
        return 'checkmark-outline';
      case 'warning':
        return 'alert';
    }
  };

  const renderColor = () => {
    switch (icon) {
      case 'error':
        return 'red';
      case 'success':
        return 'green';
      case 'warning':
        return 'orange';
    }
  };

  return (
    <>
      <Modal animationType={'fade'} visible={visible} transparent {...rest}>
        <View style={[styles.container, {backgroundColor: colors.backdrop}]}>
          <TouchableWithoutFeedback onPress={onBackdropPress}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          <View style={[styles.viewContent, {backgroundColor: colors.card}]}>
            {icon && (
              <View
                style={{
                  borderWidth: 1.5,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginBottom: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: renderColor(),
                }}>
                <Icon
                  type={'ionicon'}
                  name={renderIcon()}
                  color={renderColor()}
                  size={30}
                />
              </View>
            )}
            {title && (
              <Text size={'large'} style={styles.title}>
                {title}
              </Text>
            )}
            {message && <Text style={styles.subTille}>{message}</Text>}
            <View style={styles.buttonWrapper}>
              {cancelable && (
                <View style={styleCommon.container}>
                  <Button
                    title={negativeButtonText ? negativeButtonText : 'Cancel'}
                    onPress={onNegativeButton}
                  />
                </View>
              )}
              {cancelable && <View style={{width: 8}} />}
              <View style={styleCommon.container}>
                <Button
                  title={positiveButtonText ? positiveButtonText : 'OK'}
                  onPress={onPositiveButton}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
