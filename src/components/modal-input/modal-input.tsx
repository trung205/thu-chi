import {Button, Icon, Input, InputProps, Text} from '@components';
import {useTheme} from '@hooks';
import {styleCommon} from '@styles';
import React from 'react';
import {Modal, ModalProps, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from './styles';

interface CustomModalProps extends ModalProps {
  visible?: boolean;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onBackdropPress?: () => void;
  inputProps?: InputProps;
}

export const ModalInput: React.FC<CustomModalProps> = ({
  visible,
  title,
  message,
  onConfirm,
  onBackdropPress,
  inputProps,
  ...rest
}) => {
  const {colors} = useTheme();

  return (
    <>
      <Modal animationType={'fade'} visible={visible} transparent {...rest}>
        <View style={[styles.container, {backgroundColor: colors.backdrop}]}>
          <TouchableWithoutFeedback onPress={onBackdropPress}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          <View style={[styles.viewContent, {backgroundColor: colors.card}]}>
            {title && (
              <Text size={'large'} style={styles.title}>
                {title}
              </Text>
            )}
            {message && <Text style={styles.subTille}>{message}</Text>}
            <View style={{width: '100%'}}>
              <Input {...inputProps} />
            </View>
            <View style={styles.buttonWrapper}>
              <View style={styleCommon.container}>
                <Button title={'OK'} onPress={onConfirm} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
