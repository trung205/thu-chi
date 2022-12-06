import {Button, Container, Input, Text} from '@components';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useSignUp from './hook';
import {styles} from './styles';

export const SignUp: React.FC = () => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleBlur,

    handleSignIn,
    handleSignUp,
  } = useSignUp();

  return (
    <Container>
      <KeyboardAwareScrollView
        enableOnAndroid={false}
        keyboardShouldPersistTaps={'handled'}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <Text size={'x-large'} style={styles.title}>
          Đăng ký
        </Text>
        <Text style={styles.subTitle}>Hãy đăng ký tài khoản dành cho bạn</Text>
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
          onPress={handleSignUp}
          title={'Đăng ký'}
          style={styles.buttonWrapper}
        />
        <View style={styles.viewSignUp}>
          <Text>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text color={'primary'}> Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};
