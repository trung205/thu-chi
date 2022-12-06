import {Icon, IconProps} from '@components';
import {BASE_PADDING} from '@constants';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '@components';
import {useTheme} from '@hooks';

export interface ItemProfileProps {
  text: string;
  secondaryText?: string;
  icon: IconProps;
  iconBg?: string;
  onPress: () => void;
}

const ICON_WIDTH = 30;
export const ItemProfile: React.FC<ItemProfileProps> = ({
  text,
  secondaryText,
  icon,
  iconBg,
  onPress,
}) => {
  const {colors} = useTheme();

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View
          style={[{backgroundColor: iconBg ? iconBg : ''}, styles.viewIcon]}>
          <Icon
            type={icon.type}
            name={icon.name}
            color={colors.white}
            size={15}
          />
        </View>
        <View style={{flex: 1}}>
          <View style={styles.viewContent}>
            <Text numberOfLines={1} style={styles.text}>
              {text}
            </Text>
            <Text style={styles.textSecondary}>{secondaryText}</Text>
            <View style={styles.iconRight}>
              <Icon
                type={'entypo'}
                name={'chevron-thin-right'}
                color={colors.grey}
                size={15}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: BASE_PADDING,
    paddingVertical: 8,
  },
  viewIcon: {
    width: ICON_WIDTH,
    height: ICON_WIDTH,
    borderRadius: ICON_WIDTH / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  viewContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  textSecondary: {},
  iconRight: {
    marginLeft: 8,
  },
});
