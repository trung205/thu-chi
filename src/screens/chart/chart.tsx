import {
  BarChart,
  DateRangePicker,
  Header,
  ItemSelected,
  MonthYearPicker,
  Text,
  YearPicker,
} from '@components';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import useChart from './hook';
import { styles } from './styles';
import PureChart from 'react-native-pure-chart';

export const Chart: React.FC = () => {
  const {
    refType,
    showTypePicker,
    dataType,
    onPressItemTypePicker,
    type,
    chartType,

    refFilter,
    dataFiler,
    showFilter,
    onPressItemFilter,
    filter,

    refChooseYear,
    onPressChooseTime,
    valueYear,
    setValueYear,

    refChooseMonthYear,
    valueMonthYear,
    setValueMonthYear,

    dataChart,
    renderFieldDate,

    visibleDatePicker,
    setVisbleDatePicker,
    endDate,
    setEndDate,
    startDate,
    setStartDate,
    pieValue,
    dataObj
  } = useChart();
  let sampleData = [
    {
      value: 50,
      label: 'Marketing',
    }, {
      value: 40,
      label: 'Sales',
    }, {
      value: 25,
      label: 'Support',
    },
  ]
  const colors = ['#009ef2', '#ff4d7d', '#00c4c3', '#ffd12f', '#e7e9ed']
  const renderTypePicker = () => {
    return (
      <>
        <FlatList
          contentContainerStyle={styles.listTypePicker}
          data={dataType}
          renderItem={({ item }) => {
            return (
              <>
                <ItemSelected
                  label={item.label}
                  onPress={() => {
                    onPressItemTypePicker(item);
                  }}
                  checked={item.key == type}
                />
              </>
            );
          }}
        />
      </>
    );
  };
  const renderFilter = () => {
    return (
      <>
        <FlatList
          contentContainerStyle={styles.listTypePicker}
          data={dataFiler}
          renderItem={({ item }) => {
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
        />
      </>
    );
  };

  return (
    <>
      <Header
        isBack
        title="Biểu đồ của bạn"
        isRight
        rightAction={showFilter}
        iconRight={{ type: 'ionicon', name: 'ios-filter-outline' }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onPressChooseTime}>
            <Text>Chọn thời gian: {renderFieldDate()}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showTypePicker}>
            <Text color={'primary'}>Loại thu tiền</Text>
          </TouchableOpacity>

        </View>
        {/* <BarChart
          showExpenses={chartType().showExpenses}
          showIncomes={chartType().showIncomes}
          data={dataChart}
        /> */}
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          {pieValue[0] ? <PureChart data={pieValue} type='pie' /> : null}
        </View>
        <View>
          {pieValue[0] && pieValue.map((item, index) => {
            return (
              <View style={{ flexDirection: 'row', paddingVertical: 5, width: 230, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 30, height: 20, backgroundColor: colors[index % (colors.length - 1)], marginRight: 10 }} />
                  <Text numberOfLines={1}>{item.label}</Text>
                </View>
                <Text>{new Intl.NumberFormat().format(item.value)} vnđ</Text>
              </View>
            )
          })}
          <View style={{ flexDirection: 'row', paddingVertical: 5, width: 230, justifyContent: 'space-between' }}>
            <Text>Tổng: </Text>
            <Text>{new Intl.NumberFormat().format(dataObj.total ? dataObj.total : null)} vnđ</Text>
          </View>
        </View>
      </View>
      <Modalize
        ref={refType}
        withHandle={false}
        adjustToContentHeight
        HeaderComponent={renderTypePicker()}
      />
      <Modalize
        ref={refFilter}
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
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        visible={visibleDatePicker}
        setVisble={setVisbleDatePicker}
        onValueChange={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
      />
    </>
  );
};
