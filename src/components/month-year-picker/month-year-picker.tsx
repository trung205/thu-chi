import {Button, PickerWrapper, ScrollPicker} from '@components';
import {BASE_PADDING} from '@constants';
import {getMonths, getYears} from '@utils';
import moment from 'moment';
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize, ModalizeProps} from 'react-native-modalize';

export interface MonthYearPickerProps extends ModalizeProps {
  value: string;
  onValueChange: (year: string) => void;
}

const DATA_MONTH = getMonths();
const DATA_YEAR = getYears();

export const MonthYearPicker = forwardRef(
  ({value, onValueChange}: MonthYearPickerProps, ref) => {
    const refSheet = useRef<any>();

    const defaultMonth = moment(new Date()).format('MM');
    let defaultValueMonth = moment(value, 'MM-YYYY').isValid()
      ? moment(value, 'MM-YYYY').format('MM')
      : defaultMonth;
    const initialScrollIndexMonth = DATA_MONTH.findIndex(e =>
      defaultValueMonth.includes(e.toString()),
    );

    const defaultYear = moment(new Date()).format('YYYY');
    let defaultValueYear = moment(value, 'MM-YYYY').isValid()
      ? moment(value, 'MM-YYYY').format('YYYY')
      : defaultYear;
    let initialScrollIndexYear = DATA_YEAR.findIndex(e =>
      defaultValueYear.includes(e.toString()),
    );

    const [persitValue, setPersitValue] = useState(
      moment(`${defaultValueMonth}-${defaultValueYear}`, 'MM-YYYY').format(
        'MM-YYYY',
      ),
    );

    useEffect(() => {
      setPersitValue(
        moment(`${defaultValueMonth}-${defaultValueYear}`, 'MM-YYYY').format(
          'MM-YYYY',
        ),
      );
    }, [value]);

    const renderContent = () => {
      return (
        <View style={{marginVertical: BASE_PADDING}}>
          <PickerWrapper>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <ScrollPicker
                  initialScrollIndex={initialScrollIndexMonth}
                  ref={refSheet}
                  data={DATA_MONTH}
                  value={value}
                  onValueChange={(month: string) => {
                    setPersitValue(
                      moment(`${month}-${defaultValueYear}`, 'MM-YYYY').format(
                        'MM-YYYY',
                      ),
                    );
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <ScrollPicker
                  initialScrollIndex={initialScrollIndexYear}
                  ref={refSheet}
                  data={DATA_YEAR}
                  value={value}
                  onValueChange={(year: string) => {
                    setPersitValue(
                      moment(`${defaultValueMonth}-${year}`, 'MM-YYYY').format(
                        'MM-YYYY',
                      ),
                    );
                  }}
                />
              </View>
            </View>
          </PickerWrapper>
        </View>
      );
    };

    const onCancel = () => {
      ref?.current?.close();
    };

    const onConfirm = () => {
      ref?.current?.close();
      onValueChange(persitValue);
    };

    return (
      <Modalize
        ref={ref}
        withHandle={false}
        adjustToContentHeight
        HeaderComponent={renderContent()}>
        <View style={styles.buttonWrapper}>
          <View style={[styles.button, {marginRight: 8}]}>
            <Button onPress={onCancel} type={'outline'} title="Huỷ" />
          </View>
          <View style={styles.button}>
            <Button onPress={onConfirm} title="OK" />
          </View>
        </View>
      </Modalize>
    );
  },
);

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
