import {Button, MainModal} from '@components';
import {BASE_PADDING, SCREEN_WIDTH} from '@constants';
import React, {Dispatch, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ModalizeProps} from 'react-native-modalize';
import DateRange from './dateRange';

export interface DateRangePickerProps extends ModalizeProps {
  visible: boolean;
  setVisble: Dispatch<boolean>;
  startDate: string;
  endDate: string;
  onValueChange: (start: string, end: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  visible,
  setVisble,
  startDate,
  endDate,
  onValueChange,
}) => {
  const onCancel = () => {
    setVisble(false);
  };

  const onConfirm = () => {
    onValueChange(persitStartDate, persitEndDate);
    setVisble(false);
    console.log(persitEndDate);
    console.log(persitStartDate);
  };

  const [persitStartDate, setPersitStartDate] = useState(startDate);
  const [persitEndDate, setPersitEndDate] = useState(endDate);

  return (
    <>
      <MainModal visible={visible}>
        <View style={{width: SCREEN_WIDTH - 60}}>
          <DateRange
            initialRange={[startDate, endDate]}
            onSuccess={(s: string, e: string) => {
              setPersitEndDate(e);
              setPersitStartDate(s);
            }}
            theme={{markColor: 'skyblue', markTextColor: 'white'}}
          />

          <View style={styles.buttonWrapper}>
            <View style={[styles.button, {marginRight: 8}]}>
              <Button onPress={onCancel} type={'outline'} title="Huỷ" />
            </View>
            <View style={styles.button}>
              <Button onPress={onConfirm} title="OK" />
            </View>
          </View>
        </View>
      </MainModal>
    </>
  );
};

const styles = StyleSheet.create({
  labelAction: {},
  buttonWrapper: {
    flexDirection: 'row',
    marginHorizontal: BASE_PADDING,
    marginBottom: 20,
  },
  button: {
    flex: 1,
  },
});
