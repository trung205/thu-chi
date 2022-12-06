import {Button, PickerWrapper, ScrollPicker} from '@components';
import {BASE_PADDING} from '@constants';
import {getYears} from '@utils';
import moment from 'moment';
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize, ModalizeProps} from 'react-native-modalize';

export interface YearPickerProps extends ModalizeProps {
  value: string;
  onValueChange: (year: string) => void;
}

export const YearPicker = forwardRef(
  ({value, onValueChange}: YearPickerProps, ref) => {
    const refSheet = useRef<any>();

    const DATA = getYears();

    const defaultYear = moment(new Date()).format('YYYY');
    let defaultValue = moment(value, 'YYYY').isValid() ? value : defaultYear;
    const [persitValue, setPersitValue] = useState(defaultValue);

    let initialScrollIndex = DATA.findIndex(e =>
      defaultValue?.toString().includes(e.toString()),
    );

    useEffect(() => {
      setPersitValue(defaultValue);
    }, [value]);

    const renderContent = () => {
      return (
        <View style={{marginVertical: BASE_PADDING}}>
          <PickerWrapper>
            <ScrollPicker
              initialScrollIndex={initialScrollIndex}
              ref={refSheet}
              data={DATA}
              value={value}
              onValueChange={(year: string) => {
                setPersitValue(year);
              }}
            />
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
