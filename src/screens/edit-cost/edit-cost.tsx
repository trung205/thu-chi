import {Button, DatePickerModal, Dropdown, Header, Input} from '@components';
import moment from 'moment';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useEditCost from './hook';
import {styles} from './styles';

export const EditCost: React.FC = () => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    headerTitle,
    categories,
    onPressButton,
    handleDelete,
    onPressSetting,
  } = useEditCost();

  return (
    <>
      <Header isBack isRight title={headerTitle} rightAction={handleDelete} />
      <>
        <KeyboardAwareScrollView
          style={styles.container}
          keyboardShouldPersistTaps={'handled'}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Dropdown
            required
            label="Danh mục"
            value={values.category}
            onChangeValue={value => {
              setFieldValue('category', value);
              setFieldTouched('category', true, false);
            }}
            data={categories}
            scheme={{label: 'name', value: 'id'}}
            messageError={
              touched.category && errors.category ? errors.category : undefined
            }
            onClosed={() => {
              setFieldTouched('category', true, true);
            }}
            isIconSetting
            onPressSetting={onPressSetting}
          />
          <DatePickerModal
            required
            placeholder="Chọn ngày"
            label="Thời gian"
            date={
              moment(values.date, 'YYYY-MM-DD').isValid()
                ? moment(values.date, 'YYYY-MM-DD').format('DD/MM/YYYY')
                : ''
            }
            onChangeValue={date => {
              setFieldValue('date', moment(date).format('YYYY-MM-DD'));
              setFieldTouched('date', true, false);
            }}
            messageError={touched.date && errors.date ? errors.date : undefined}
            onClosed={() => {
              setFieldTouched('date', true, true);
            }}
          />
          <Input
            required
            multiline
            numberOfLines={5}
            label="Mô tả"
            placeholder="Nhập mô tả..."
            value={values.description}
            onChangeText={val => {
              setFieldValue('description', val);
              setFieldTouched('description', true, false);
            }}
            onBlur={handleBlur('description')}
            messageError={
              touched.description && errors.description
                ? errors.description
                : undefined
            }
          />
          <Input
            required
            label="Số tiền"
            placeholder="Nhập số tiền..."
            keyboardType={'numeric'}
            value={values.amount}
            onChangeText={val => {
              setFieldValue('amount', val);
              setFieldTouched('amount', true, false);
            }}
            onBlur={handleBlur('amount')}
            messageError={
              touched.amount && errors.amount ? errors.amount : undefined
            }
          />
          <Button
            onPress={onPressButton}
            title={'Lưu'}
            style={styles.buttonWrapper}
          />
        </KeyboardAwareScrollView>
      </>
    </>
  );
};
