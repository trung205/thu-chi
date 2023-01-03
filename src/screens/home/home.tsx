import {Divider, FabButton, Header, ItemCost} from '@components';
import {useTheme} from '@hooks';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {fonts} from '@styles';
import React from 'react';
import {FlatList} from 'react-native';
import useHome from './hook';
import {styles} from './styles';

const Tab = createMaterialTopTabNavigator();

export const Home: React.FC = () => {
  const {colors} = useTheme();
  const {
    incomes,
    expenses,
    categories,
    expenseCategories,
    handleFabButton,
    onPressItemIncome,
    onPressItemExpense,
  } = useHome();
  const ListIncomes = () => {
    return (
      <>
        <FlatList
          contentContainerStyle={{paddingHorizontal: 20}}
          data={incomes}
          renderItem={({item, index}) => {
            const itemCategory = categories.find(category =>
              item.income_category_id.includes(category.id),
            );
            return (
              <ItemCost
                type={'incomes'}
                item={item}
                category={itemCategory}
                onPress={() => {
                  onPressItemIncome(item);
                }}
              />
            );
          }}
          ItemSeparatorComponent={() => <Divider />}
        />
      </>
    );
  };

  const ListExpenses = () => {
    return (
      <>
        <FlatList
          contentContainerStyle={{paddingHorizontal: 20}}
          data={expenses}
          renderItem={({item, index}) => {
            const itemCategory = expenseCategories.find(category =>
              item.expense_category_id.includes(category.id),
            );

            return (
              <ItemCost
                type={'expenses'}
                item={item}
                category={itemCategory}
                onPress={() => {
                  onPressItemExpense(item);
                }}
              />
            );
          }}
          ItemSeparatorComponent={() => <Divider />}
        />
      </>
    );
  };

  return (
    <>
      <Header title="Quản lý thu chi" />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontFamily: fonts.medium,
            color: colors.white,
            fontSize: 14,
          },
          tabBarIndicatorStyle: {
            height: 1,
            backgroundColor: colors.white,
          },
          tabBarStyle: {
            backgroundColor: colors.primary,
          },
        }}>
        <Tab.Screen name="Thu Nhập" component={ListIncomes} />
        <Tab.Screen name="Chi Tiêu" component={ListExpenses} />
      </Tab.Navigator>
      <FabButton style={styles.fab} onPress={handleFabButton} />
    </>
  );
};
