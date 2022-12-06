import {
  Divider,
  FabButton,
  Header,
  ItemSelected,
  MonthYearPicker,
  Text,
  YearPicker,
} from '@components';
import {useTheme} from '@hooks';
import moment from 'moment';
import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Modalize} from 'react-native-modalize';
import useStatistic from './hook';
import {styles} from './styles';

export const Statistic: React.FC = () => {
  const {
    modalizeRef,
    onPressFilter,
    hideDatePicker,
    handleConfirmDate,
    date,
    visibleDatePicker,
    valueYear,
    setValueYear,

    onPressItemFilter,
    dataFiler,
    filter,
    totalExpenses,
    totalIncomes,
    onPressFabButton,

    refChooseMonthYear,
    refChooseYear,
    setValueMonthYear,
    valueMonthYear,
    renderFieldDate,
    onPressChooseTime,
  } = useStatistic();

  const {colors} = useTheme();
  const renderFilter = () => {
    return (
      <>
        <FlatList
          contentContainerStyle={styles.list}
          data={dataFiler}
          renderItem={({item}) => {
            return (
              <>
                <ItemSelected
                  label={item.label}
                  onPress={() => {
                    onPressItemFilter(item);
                  }}
                  checked={item.key == filter}
                />
              </>
            );
          }}
          ItemSeparatorComponent={() => <Divider />}
        />
      </>
    );
  };

  return (
    <>
      <Header
        isBack
        title="Thống kê"
        isRight
        iconRight={{type: 'ionicon', name: 'ios-filter-outline'}}
        rightAction={onPressFilter}
      />
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => {
              onPressChooseTime();
            }}>
            <Text>Chọn thời gian: {renderFieldDate()} </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.viewCost, {backgroundColor: colors.card}]}>
          <View style={[styles.headerCost, {backgroundColor: colors.primary}]}>
            <Text color="white">Tổng thu:</Text>
          </View>
          <Text style={styles.valueCost}>
            {' '}
            {new Intl.NumberFormat().format(totalIncomes)} vnđ
          </Text>
          <View style={[styles.headerCost, {backgroundColor: colors.primary}]}>
            <Text color="white">Chi tiêu:</Text>
          </View>
          <Text style={styles.valueCost}>
            {new Intl.NumberFormat().format(totalExpenses)} vnđ
          </Text>
          <View style={[styles.headerCost, {backgroundColor: colors.primary}]}>
            <Text color="white">Cân đối:</Text>
          </View>
          <Text style={styles.valueCost}>
            {new Intl.NumberFormat().format(totalIncomes - totalExpenses)} vnđ
          </Text>
        </View>
      </View>
      <FabButton
        icon={{type: 'ionicon', name: 'bar-chart'}}
        style={styles.fab}
        onPress={onPressFabButton}
      />
      <Modalize
        ref={modalizeRef}
        withHandle={false}
        adjustToContentHeight
        HeaderComponent={renderFilter()}
      />
      <YearPicker
        ref={refChooseYear}
        value={valueYear}
        onValueChange={(year: string) => {
          setValueYear(year);
        }}
      />
      <MonthYearPicker
        ref={refChooseMonthYear}
        value={valueMonthYear}
        onValueChange={(monthYear: string) => {
          setValueMonthYear(monthYear);
        }}
      />
      <DateTimePickerModal
        isVisible={visibleDatePicker}
        mode="date"
        is24Hour
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        date={moment(date, 'DD/MM/YYYY').toDate()}
      />
    </>
  );
};
