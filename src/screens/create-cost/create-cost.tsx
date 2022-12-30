import {Button, DatePickerModal, Dropdown, Header, Input} from '@components';
import {dataType} from '@data';
import moment from 'moment';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useCreateCost from './hook';
import {styles} from './styles';

export const CreateCost: React.FC = () => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    expenseCategories,
    categories,
    onPressButton,
    onPressSetting,
  } = useCreateCost();
  return (
    <>
      <Header isBack title="Thêm mới" />
      <>
        <KeyboardAwareScrollView
          style={styles.container}
          keyboardShouldPersistTaps={'handled'}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Dropdown
            required
            label="Loại"
            value={values.type}
            onChangeValue={value => {
              setFieldValue('type', value);
              setFieldTouched('type', true, false);
            }}
            data={dataType}
            scheme={{label: 'label', value: 'value'}}
            messageError={touched.type && errors.type ? errors.type : undefined}
            onClosed={() => {
              setFieldTouched('type', true, true);
            }}
          />
          {values.type && <Dropdown
            required
            label="Danh mục"
            value={values.category}
            onChangeValue={value => {
              setFieldValue('category', value);
              setFieldTouched('category', true, false);
            }}
            data={values.type == 'incomes' ? categories : expenseCategories}
            scheme={{label: 'name', value: 'id'}}
            messageError={
              touched.category && errors.category ? errors.category : undefined
            }
            onClosed={() => {
              setFieldTouched('category', true, true);
            }}
            isIconSetting
            onPressSetting={onPressSetting}
          />}
          
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
            style={styles.spacingInput}
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
            style={styles.spacingInput}
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
