import {Button, Header, Input} from '@components';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useChangePassword from './hook';
import {styles} from './styles';

export const ChangePassword: React.FC = () => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleBlur,

    onPressButton,
  } = useChangePassword();
  return (
    <>
      <Header isBack title="Thay đổi mật khẩu" />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <Input
          required
          label="Mật khẩu cũ"
          placeholder="Nhập mật khẩu cũ"
          value={values.oldPassword}
          onChangeText={val => {
            setFieldValue('oldPassword', val);
            setFieldTouched('oldPassword', true, false);
          }}
          onBlur={handleBlur('oldPassword')}
          messageError={
            touched.oldPassword && errors.oldPassword
              ? errors.oldPassword
              : undefined
          }
          autoCapitalize="none"
          autoComplete="off"
          isPassword
        />
        <Input
          required
          label="Mật khẩu mới"
          placeholder="Nhập nhập khẩu mới"
          value={values.newPassword}
          onChangeText={val => {
            setFieldValue('newPassword', val);
            setFieldTouched('newPassword', true, false);
          }}
          onBlur={handleBlur('newPassword')}
          messageError={
            touched.newPassword && errors.newPassword
              ? errors.newPassword
              : undefined
          }
          autoCapitalize="none"
          autoComplete="off"
          isPassword
        />
        <Button
          title="Lưu"
          style={styles.buttonWrapper}
          onPress={onPressButton}
        />
      </KeyboardAwareScrollView>
    </>
  );
};
