import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {TabActions} from '@react-navigation/native';

import React, {useState} from 'react';

import {Icon} from '@components';
import {useTheme} from '@hooks';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type TabProps = {
  label: string;
  size: number;
  icon: string;
  type: any;
};

export const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / state.routes.length;
  const [translateValue] = useState(new Animated.Value(0));
  const bottomInsets = insets.bottom;
  const bottomBarHeight = 60 + (bottomInsets > 0 ? bottomInsets - 10 : 10);

  const size = 25;

  const tabs: TabProps[] = [
    {
      label: 'Trang chủ',
      size: size,
      icon: 'home',
      type: 'ionicon',
    },
    {
      label: 'Cá nhân',
      size: 20,
      icon: 'settings',
      type: 'ionicon',
    },
  ];

  return (
    <View
      style={[
        styles.tabContainer,
        {
          width: totalWidth,
          height: bottomBarHeight,
        },
      ]}>
      <View style={{flexDirection: 'row'}}>
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{translateX: translateValue}],
              width: tabWidth - 20,
              backgroundColor: '#097efa',
            },
          ]}
        />
        {state.routes.map((route: any, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.dispatch({
                ...TabActions.jumpTo(route.name),
                target: state.key,
              });
            }
            Animated.spring(translateValue, {
              toValue: index * tabWidth,
              velocity: 10,
              useNativeDriver: true,
            }).start();
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tab}>
              <View>
                <Icon
                  type={tabs[index].type}
                  name={tabs[index].icon}
                  size={tabs[index].size}
                  color={isFocused ? '#097efa' : colors['secondary-text']}
                />
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused ? '#097efa' : colors['secondary-text'],
                  },
                ]}>
                {tabs[index].label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {},
  slider: {
    height: 2,
    position: 'absolute',
    top: 0,
    left: 10,
    borderRadius: 10,
    width: 50,
  },
  tab: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabLabel: {
    // fontSize: fontSizes.small,
  },
});
