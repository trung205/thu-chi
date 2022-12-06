import {Input} from '@components';
import React, {useEffect, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {dismissKeyboard} from '@utils';
interface TimePickerProps {
  date: string | undefined;
  placeholder: string;
  required?: boolean;
  onChangeValue?: (date: Date) => void;
  messageError?: string | any;
  label: string;
  onClosed?: () => void;
}
export const DatePickerModal: React.FC<TimePickerProps> = ({
  date,
  placeholder,
  required,
  onChangeValue,
  messageError,
  label,
  onClosed,
  ...rest
}) => {
  const [value, setValue] = useState<Date>();
  const [show, setShow] = useState<boolean>(false);

  const showDatePicker = () => {
    dismissKeyboard();
    setShow(true);
  };
  const handleCancel = () => {
    setShow(false);
    onClosed && onClosed();
  };
  const handleConfirm = (date: Date) => {
    setValue(date);
    setShow(false);
    onChangeValue && onChangeValue(date);
  };

  useEffect(() => {
    if (date == '' || date == undefined) {
      setValue(new Date());
    }
  }, [date]);

  return (
    <>
      <Input
        editable={false}
        pointerEvents={'none'}
        required={required}
        onPress={showDatePicker}
        label={label}
        value={date}
        placeholder={placeholder}
        messageError={messageError}
      />

      {show && (
        <DateTimePickerModal
          isVisible={show}
          mode="date"
          is24Hour
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          date={value}
          {...rest}
        />
      )}
    </>
  );
};
