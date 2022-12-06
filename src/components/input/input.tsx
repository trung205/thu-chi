import {Icon, Text} from '@components';

import {useTheme} from '@hooks';
import {fonts, palette, styleCommon} from '@styles';
import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

const PADDING = 20;
const INPUT_HEIGHT = 40;

export interface InputProps extends TextInputProps {
  style?: ViewStyle;
  isPassword?: boolean;
  label?: string;
  messageError?: string | any;
  required?: boolean;
  multiline?: boolean;
  inputRef?: React.MutableRefObject<undefined>;
  onPress?: () => void;
}
export const Input: React.FC<InputProps> = ({
  style,
  isPassword,
  label,
  messageError,
  required,
  multiline,
  inputRef,
  onPress,
  ...rest
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const {colors} = useTheme();

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return (
    <View style={style}>
      <View style={styleCommon.row}>
        {label && <Text style={styles.label}>{label}</Text>}
        {required && (
          <Text style={[styles.label, {color: palette.red}]}> (*)</Text>
        )}
      </View>
      <Pressable onPress={onPress}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.background,
              borderColor: colors.border,
            },
          ]}>
          <TextInput
            // ref={inputRef}
            selectionColor={colors.primary}
            enablesReturnKeyAutomatically
            secureTextEntry={isPassword && passwordVisibility}
            style={[
              styles.input,
              {
                color: colors['primary-text'],
                textAlignVertical: multiline ? 'top' : 'center',
              },
            ]}
            placeholderTextColor={colors['secondary-text']}
            {...rest}
          />

          {isPassword && (
            <Pressable
              onPress={handlePasswordVisibility}
              style={styles.viewIcon}>
              <Icon
                type={'feather'}
                name={rightIcon}
                size={20}
                color={colors['primary-icon']}
              />
            </Pressable>
          )}
        </View>
      </Pressable>
      <View style={styles.viewError}>
        {messageError && (
          <Text
            size={'small'}
            style={[styles.messageError, {color: palette.red}]}>
            ~ {messageError}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: INPUT_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    paddingLeft: PADDING,
    paddingRight: PADDING,
    fontFamily: fonts.medium,
  },
  label: {
    marginBottom: 4,
  },
  messageError: {
    marginTop: 4,
    textTransform: 'lowercase',
  },
  viewError: {
    minHeight: 20,
  },
  viewIcon: {
    height: INPUT_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: PADDING,
  },
});
