import { Divider, FabButton, Header, ItemProfileProps, Text } from '@components';
import { SCREENS } from '@constants';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import useCategories from './hook';



export const ExpenseCategories: React.FC = () => {
    const navigation = useNavigation<any>();
    const {categories, onPressItem, onPressFab} = useCategories();

    return (
        <>
            <Header isBack title="Quản lý danh mục chi tiêu" />
            <FlatList
                contentContainerStyle={styles.container}
                data={categories}
                renderItem={({ item }) => {
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
