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
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import useChart from './hook';
import {styles} from './styles';
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
    pieValue
  } = useChart();
  // console.log(pieValue, 'trung')
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
    }
  ]

  const renderTypePicker = () => {
    return (
      <>
        <FlatList
          contentContainerStyle={styles.listTypePicker}
          data={dataType}
          renderItem={({item}) => {
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
        iconRight={{type: 'ionicon', name: 'ios-filter-outline'}}
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
        {pieValue[0] ? <PureChart data={pieValue} type='pie' /> : null}
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
