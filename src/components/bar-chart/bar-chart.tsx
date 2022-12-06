import {MainModal, Text} from '@components';
import {SCREEN_HEIGHT} from '@constants';
import React, {useState} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export interface DataChart {
  incomes: number;
  expenses: number;
  label: string;
}

export interface BarChartProps {
  data: Array<DataChart>;
  showIncomes: boolean;
  showExpenses: boolean;
}

const MAX_HEIGHT = SCREEN_HEIGHT / 2.5;

export const BarChart: React.FC<BarChartProps> = ({
  data,
  showIncomes,
  showExpenses,
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<DataChart>();
  let maxValueIncomes = Math.max(...data.map(e => e.incomes));
  let maxValueExpenses = Math.max(...data.map(e => e.expenses));
  let maxValue =
    maxValueExpenses > maxValueIncomes ? maxValueExpenses : maxValueIncomes;

  const checkMax = (maxMoney: number) => {
    if (maxMoney <= 100000) {
      return 10000; // Mỗi mốc 10k
    }
    if (maxMoney > 100000 && maxMoney <= 500000) {
      return 50000; // Mỗi mốc 50k
    }
    if (maxMoney > 500000 && maxMoney <= 1000000) {
      return 100000; // Mỗi mốc 100k
    }
    if (maxMoney > 1000000 && maxMoney <= 2000000) {
      return 200000; // Mỗi mốc 200k
    }
    if (maxMoney > 2000000 && maxMoney <= 5000000) {
      return 500000; // Mỗi mốc 500k
    }
    if (maxMoney > 5000000 && maxMoney <= 10000000) {
      return 1000000; // Mỗi mốc 1000k
    }
    if (maxMoney > 10000000 && maxMoney <= 20000000) {
      return 2000000; // Mỗi mốc 2000k
    }
    if (maxMoney > 20000000 && maxMoney <= 50000000) {
      return 5000000; // Mỗi mốc 5000k
    }
    if (maxMoney > 50000000 && maxMoney <= 100000000) {
      return 10000000; // Mỗi mốc 10000k
    }
    if (maxMoney > 100000000 && maxMoney <= 200000000) {
      return 20000000; // Mỗi mốc 20000k
    }
    if (maxMoney > 200000000 && maxMoney <= 500000000) {
      return 50000000; // Mỗi mốc 50000k
    }
    return 0;
  };
  const maxMoney = checkMax(maxValue);
  const [translateValue] = useState(new Animated.Value(0));
  const onPressItem = (item: DataChart) => {
    setVisible(true);
    setValue(item);
  };
  const initialValue = 0;
  const initialValueIncomes = 0;
  const totalIncomes = data?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.incomes,
    initialValueIncomes,
  );
  const totalExpenses = data?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.expenses,
    initialValue,
  );

  if (data.length !== 0)
    return (
      <>
        <View style={{flexDirection: 'row'}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => {
              return (
                <>
                  <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
                    renderItem={({item, index}) => {
                      const numberFixed = (
                        maxMoney *
                        (11 - index - 1)
                      ).toFixed();
                      const numberDipsplay = new Intl.NumberFormat().format(
                        Number(numberFixed),
                      );

                      return (
                        <View style={styles.viewLabelMoney}>
                          <Text>{numberDipsplay}</Text>
                        </View>
                      );
                    }}
                  />
                </>
              );
            }}
            horizontal
            data={data}
            renderItem={({item, index}) => {
              let heightIncomes = (MAX_HEIGHT * item.incomes) / maxMoney / 10;
              let heightExpenses = (MAX_HEIGHT * item.expenses) / maxMoney / 10;

              // Animated.spring(translateValue, {
              //   toValue: heightIncomes,
              //   velocity: 0,
              //   useNativeDriver: false,
              // }).start();
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      onPressItem(item);
                    }}>
                    <View style={styles.viewItem}>
                      {showIncomes && (
                        <Animated.View
                          style={[
                            styles.incomesView,
                            {
                              // transform: [{translateY: translateValue}],
                              height: heightIncomes,
                            },
                          ]}
                        />
                      )}
                      {showExpenses && (
                        <Animated.View
                          style={[
                            styles.expensesView,
                            {
                              height: heightExpenses,
                            },
                          ]}
                        />
                      )}
                    </View>
                    <Text style={styles.label}>{item.label}</Text>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        </View>
        <View style={styles.viewTotal}>
          {showIncomes && (
            <Text>
              Tổng thu nhập:{' '}
              {new Intl.NumberFormat().format(Number(totalIncomes))} vnđ{' '}
            </Text>
          )}
          {showExpenses && (
            <Text>
              Tổng chi tiêu:{' '}
              {new Intl.NumberFormat().format(Number(totalExpenses))} vnđ{' '}
            </Text>
          )}
        </View>
        <MainModal
          visible={visible}
          onRequestClose={() => {
            setVisible(false);
          }}
          onBackdropPress={() => {
            setVisible(false);
          }}>
          <Text>
            Thu nhập: {new Intl.NumberFormat().format(Number(value?.incomes))}{' '}
            vnđ
          </Text>
          <Text>
            Chi tiêu: {new Intl.NumberFormat().format(Number(value?.expenses))}{' '}
            vnđ
          </Text>
        </MainModal>
      </>
    );
  else return <></>;
};

const styles = StyleSheet.create({
  label: {textAlign: 'center', marginTop: 20},
  expensesView: {
    marginLeft: 1,
    width: 30,
    backgroundColor: '#ED6665',
  },
  incomesView: {
    width: 30,
    backgroundColor: '#177AD5',
  },
  viewItem: {
    height: MAX_HEIGHT,
    marginTop: MAX_HEIGHT / 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginLeft: 10,
  },
  viewLabelMoney: {
    height: MAX_HEIGHT / 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  viewTotal: {
    paddingTop: 20,
  },
});
