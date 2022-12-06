import {Button, Header, Input} from '@components';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useCreateCategory from './hook';
import {styles} from './styles';
export const CreateCategory: React.FC = () => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleBlur,

    onPressButton,
  } = useCreateCategory();

  return (
    <>
      <Header title={'Tạo danh mục'} isBack />
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
