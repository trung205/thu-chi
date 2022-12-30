import {Divider, FabButton, Header, ItemProfile, ItemProfileProps, Text} from '@components';
import { SCREENS } from '@constants';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import useCategories from './hook';
import {styles} from './styles';
import {useTheme} from '@hooks';


export const Categories: React.FC = () => {
  const navigation = useNavigation<any>();
  const {colors} = useTheme();

  const listItem: ItemProfileProps[] = [
    {
      text: 'Thu nhập',
      secondaryText: '',
      icon: {
        name: 'moon',
        type: 'ionicon',
      },
      iconBg: '#1c87fa',
      onPress: () => { navigation.navigate(SCREENS.CATEGORIES_INCOME)},
    },
    {
      text: 'Chi tiêu',
      secondaryText: '',
      icon: {
        name: 'apps',
        type: 'ionicon',
      },
      iconBg: 'orange',
      onPress: () => {
        navigation.navigate(SCREENS.CATEGORIES_EXPENSE);
      },
    },
  ];
  return (
    <>
      <Header isBack title="Quản lý danh mục" />
      {/* <FlatList
        contentContainerStyle={styles.container}
        data={categories}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onPressItem(item);
              }}
              style={styles.item}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <Divider />}
      />
      <FabButton style={styles.fab} onPress={onPressFab} /> */}
      <FlatList
        contentContainerStyle={[styles.list, {backgroundColor: colors.card}]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={listItem}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              <ItemProfile
                text={item.text}
                icon={item.icon}
                iconBg={item.iconBg}
                onPress={item.onPress}
              />
            </View>
          );
        }}
        ItemSeparatorComponent={() => <Divider />}
      />
    </>
  );
};
