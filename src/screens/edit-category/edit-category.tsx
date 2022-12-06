import {Button, Header, Input} from '@components';
import {dismissKeyboard} from '@utils';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useEditCategory from './hook';
import {styles} from './styles';

export const EditCategory: React.FC = () => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleBlur,

    onPressButton,
    onPressDelete,
  } = useEditCategory();
  return (
    <>
      <Header
        title={'Chi tiết danh mục'}
        isBack
        isRight
        rightAction={() => {
          dismissKeyboard();
          onPressDelete();
        }}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <Input
          required
          label="Tên danh mục"
          placeholder="Nhập tên danh mục"
          value={values.name}
          onChangeText={val => {
            setFieldValue('name', val);
            setFieldTouched('name', true, false);
          }}
          onBlur={handleBlur('name')}
          messageError={touched.name && errors.name ? errors.name : undefined}
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
