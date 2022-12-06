import {Button, Container, Input, Text} from '@components';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useSignIn from './hook';
import {styles} from './styles';

export const SignIn: React.FC = () => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleBlur,

    handleSignIn,
    handleSignUp,
  } = useSignIn();

  return (
    <Container>
      <KeyboardAwareScrollView
        enableOnAndroid={false}
        keyboardShouldPersistTaps={'handled'}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <Text size={'x-large'} style={styles.title}>
          Chào mừng trở lại
        </Text>
        <Text style={styles.subTitle}>Hãy đăng nhập vào tài khoản của bạn</Text>
        <Input
          placeholder={'Email'}
          value={values.email}
          onChangeText={val => {
            setFieldValue('email', val);
            setFieldTouched('email', true, false);
          }}
          onBlur={handleBlur('email')}
          returnKeyType={'next'}
          keyboardType={'email-address'}
          autoCapitalize="none"
          autoComplete="off"
          messageError={
            touched.email && errors.email ? errors.email : undefined
          }
          style={styles.spacingInput}
        />
        <Input
          placeholder={'Mật khẩu'}
          value={values.password}
          onChangeText={val => {
            setFieldValue('password', val);
            setFieldTouched('password', true, false);
          }}
          onBlur={handleBlur('password')}
          returnKeyType={'go'}
          autoCapitalize="none"
          autoComplete="off"
          isPassword
          messageError={
            touched.password && errors.password ? errors.password : undefined
          }
          style={styles.spacingInput}
        />
        <Button
          onPress={handleSignIn}
          title={'Đăng nhập'}
          style={styles.buttonWrapper}
        />
        <View style={styles.viewSignUp}>
          <Text>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text color={'primary'}> Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};
