import {Divider, Icon, Input, ItemSelected} from '@components';
import {BASE_PADDING} from '@constants';
import {Portal} from '@gorhom/portal';
import {useTheme} from '@hooks';
import {dismissKeyboard} from '@utils';
import _ from 'lodash';
import React, {useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Modalize, ModalizeProps} from 'react-native-modalize';
export interface DropdownProps extends ModalizeProps {
  label: string;
  scheme: {
    label: string;
    value: string;
  };
  required?: boolean;
  placeholder?: string;
  data: Array<any>;
  value: string;
  onChangeValue: (value: string) => void;
  messageError?: string | any;
  isIconSetting?: boolean;
  onPressSetting?: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  required,
  placeholder,
  data,
  scheme,
  value,
  onChangeValue,
  messageError,
  isIconSetting,
  onPressSetting,
  ...rest
}) => {
  const dropdownRef = useRef<Modalize>();
  const {colors} = useTheme();

  const onSetting = () => {
    dropdownRef.current?.close();
    onPressSetting && onPressSetting();
  };

  const renderHeader = () => {
    return (
      <>
        {isIconSetting && (
          <Icon
            type={'ionicon'}
            name={'settings'}
            color={colors['secondary-text']}
            style={styles.iconSetting}
            onPress={onSetting}
          />
        )}
        <FlatList
          contentContainerStyle={styles.list}
          data={data}
          renderItem={({item, index}) => {
            const checked = _.isEqual(item, getSelectedItem);
            return (
              <View key={_.get(item, [scheme.value])}>
                <ItemSelected
                  label={_.get(item, [scheme.label])}
                  checked={checked}
                  onPress={() => {
                    onChangeValue(_.get(item, [scheme.value]));
                    dropdownRef.current?.close();
                  }}
                />
              </View>
            );
          }}
          ItemSeparatorComponent={() => <Divider />}
        />
      </>
    );
  };

  const openDropdown = () => {
    dismissKeyboard();
    dropdownRef.current?.open();
  };

  const getSelectedItem = data.find(item =>
    value.includes(_.get(item, [scheme.value])),
  );

  return (
    <>
      <Input
        onPress={openDropdown}
        value={getSelectedItem && _.get(getSelectedItem, [scheme.label])}
        pointerEvents="none"
        editable={false}
        label={label}
        required={required}
        placeholder={placeholder ? placeholder : 'Vui lòng chọn'}
        messageError={messageError}
      />
      <Portal>
        <Modalize
          ref={dropdownRef}
          withHandle={false}
          adjustToContentHeight
          HeaderComponent={renderHeader()}
          {...rest}
        />
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    marginHorizontal: BASE_PADDING,
  },
  iconSetting: {
    justifyContent: 'flex-end',
    paddingHorizontal: BASE_PADDING,
    paddingTop: 10,
    paddingBottom: 5,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
});
