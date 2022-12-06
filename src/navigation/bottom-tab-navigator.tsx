import {TabBar} from '@components';
import {SCREENS} from '@constants';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Home, Profile, Statistic} from '@screens';
import React from 'react';

const TabStack = createBottomTabNavigator();

export const BottomTabNavigator: React.FC = () => {
  return (
    <TabStack.Navigator
      backBehavior="none"
      tabBar={(props: BottomTabBarProps) => {
        return <TabBar {...props} />;
      }}
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <TabStack.Screen name={SCREENS.HOME} component={Home} />

      <TabStack.Screen name={SCREENS.PROFILE} component={Profile} />
    </TabStack.Navigator>
  );
};
