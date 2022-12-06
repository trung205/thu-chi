import {Icon, IconProps, Text} from '@components';
import {BASE_PADDING, STATUS_BAR_HEIGHT} from '@constants';
import {useTheme} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {dismissKeyboard} from '@utils';

interface IHeader {
  title?: string;
  isBack?: boolean;
  backAction?: () => void;
  rightAction?: () => void;
  isRight?: boolean;
  iconRight?: IconProps;
}

export const Header: React.FC<IHeader> = ({
  title,
  isBack,
  backAction,
  rightAction,
  isRight,
  iconRight,
}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();

  const onPressBack = () => {
    if (backAction) {
      backAction();
    } else {
      dismissKeyboard();
      navigation.canGoBack() && navigation.goBack();
    }
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      {isBack && (
        <TouchableOpacity onPress={onPressBack}>
          <Icon type={'entypo'} name={'chevron-thin-left'} />
        </TouchableOpacity>
      )}
      <Text style={{flex: 1}} size={'x-large'} color={'white'}>
        {title}
      </Text>
      {isRight && (
        <TouchableOpacity onPress={rightAction}>
          {iconRight ? (
            <Icon type={iconRight.type} name={iconRight.name} />
          ) : (
            <Icon type={'material'} name={'delete'} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: BASE_PADDING,
    alignItems: 'flex-end',
    paddingBottom: 10,
    height: 80,
  },
});
