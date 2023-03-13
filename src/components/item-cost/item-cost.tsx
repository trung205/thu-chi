import {Text} from '@components';
import { decryptData } from '@hooks';
import {palette} from '@styles';
import {Category, Cost} from '@types';
import moment from 'moment';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface ItemCostProps {
  item: Cost;
  category?: Category;
  onPress: () => void;
  type: 'incomes' | 'expenses';
}

export const ItemCost: React.FC<ItemCostProps> = ({
  item,
  category,
  onPress,
  type,
}) => {
  const renderCharacter = () => {
    switch (type) {
      case 'incomes':
        return '+ ';
      case 'expenses':
        return '- ';
    }
  };

  const renderTextColor = () => {
    switch (type) {
      case 'incomes':
        return 'green';
      case 'expenses':
        return palette.red;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.viewLeft}>
        <Text>{decryptData(category?.name)}</Text>
        <Text color={'secondary-text'}>{decryptData(item.description)}</Text>
      </View>
      <View style={styles.viewRight}>
        <Text>{moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</Text>
        <Text style={{color: renderTextColor()}}>
          {renderCharacter()}
          {item?.amount && new Intl.NumberFormat().format(Number(item.amount))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewLeft: {flex: 1},
  viewRight: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
});
