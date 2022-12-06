import {Text} from '@components';
import {Picker} from '@react-native-picker/picker';
import {getMonth} from '@utils';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface MonthPickerProps {
  selectedValue: string;
  onValueChange: (itemValue: any) => void;
  style?: StyleProp<ViewStyle>;
}
export const MonthPicker: React.FC<MonthPickerProps> = ({
  selectedValue,
  onValueChange,
  style,
}) => {
  return (
    <View style={styles.container}>
      <Text>Tháng: </Text>
      <Picker
        style={[{width: 150}, style]}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}>
        {getMonth().map((item, indx) => {
          return (
            <Picker.Item
              key={indx + 'xxx'}
              label={item.toString()}
              value={item.toString()}
            />
          );
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
