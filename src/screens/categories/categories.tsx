import {Divider, FabButton, Header, Text} from '@components';
import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import useCategories from './hook';
import {styles} from './styles';

export const Categories: React.FC = () => {
  const {categories, onPressItem, onPressFab} = useCategories();

  return (
    <>
      <Header isBack title="Quản lý danh mục" />
      <FlatList
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
      <FabButton style={styles.fab} onPress={onPressFab} />
    </>
  );
};
