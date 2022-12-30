import {API_URL, SCREENS} from '@constants';
import {useLoading} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@redux';
import {Statistic} from '@types';
import axios from 'axios';
import moment from 'moment';
import {useEffect, useRef, useState} from 'react';
import {Modalize} from 'react-native-modalize';
import {useSelector} from 'react-redux';
enum StatisticFilter {
  DATES = 'DATES',
  MONTHS = 'MONTHS',
  YEARS = 'YEARS',
}
const useStatistic = () => {
  const navigation = useNavigation<any>();
  //  Redux state
  const accessToken = useSelector(
    (state: RootState) => state.user.token.access,
  );
  const {showLoading, hideLoading} = useLoading();

  const [filter, setFilter] = useState<StatisticFilter>(StatisticFilter.MONTHS);
  const [totalIncomes, setTotalIncomes] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [date, setDate] = useState(moment(new Date()).format('DD/MM/YYYY'));
  const [valueYear, setValueYear] = useState(moment(new Date()).format('YYYY'));
  const [valueMonthYear, setValueMonthYear] = useState(
    moment(new Date()).format('MM-YYYY'),
  );
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);

  const dataFiler = [
    {
      label: 'Theo ngày',
      key: StatisticFilter.DATES,
    },
    {
      label: 'Theo tháng',
      key: StatisticFilter.MONTHS,
    },
    {
      label: 'Theo năm',
      key: StatisticFilter.YEARS,
    },
  ];

  const modalizeRef = useRef<Modalize>();
  const refChooseYear = useRef<Modalize>();
  const refChooseMonthYear = useRef<Modalize>();
  const onPressFilter = () => {
    modalizeRef.current?.open();
  };

  const onPressItemFilter = (item: {label: string; key: StatisticFilter}) => {
    modalizeRef.current?.close();
    setFilter(item.key);
  };

  const showDatePicker = () => {
    setVisibleDatePicker(true);
  };

  const hideDatePicker = () => {
    setVisibleDatePicker(false);
  };

  const handleConfirmDate = (date: Date) => {
    setVisibleDatePicker(false);
    setDate(moment(date).format('DD/MM/YYYY'));
  };

  const getValueStartDate = () => {
    switch (filter) {
      case StatisticFilter.DATES:
        return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
      case StatisticFilter.YEARS:
        return moment(valueYear, 'YYYY').startOf('year').format('YYYY-MM-DD');
      case StatisticFilter.MONTHS:
        return moment(valueMonthYear, 'MM-YYYY')
          .startOf('month')
          .format('YYYY-MM-DD');
    }
  };

  const getValueEndDate = () => {
    switch (filter) {
      case StatisticFilter.DATES:
        return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
      case StatisticFilter.YEARS:
        return moment(valueYear, 'YYYY').endOf('year').format('YYYY-MM-DD');
      case StatisticFilter.MONTHS:
        return moment(valueMonthYear, 'MM-YYYY')
          .endOf('month')
          .format('YYYY-MM-DD');
    }
  };

  const onPressFabButton = () => {
    navigation.navigate(SCREENS.CHART);
  };
  const renderFieldDate = () => {
    switch (filter) {
      case StatisticFilter.DATES:
        return date;
      case StatisticFilter.MONTHS:
        return moment(valueMonthYear, 'MM-YYYY').format('MM/YYYY');
      case StatisticFilter.YEARS:
        return valueYear;
    }
  };

  const onPressChooseTime = () => {
    switch (filter) {
      case StatisticFilter.YEARS:
        refChooseYear.current?.open();
        break;
      case StatisticFilter.MONTHS:
        refChooseMonthYear.current?.open();
        break;
      case StatisticFilter.DATES:
        setVisibleDatePicker(true);
    }
  };

  useEffect(() => {
    showLoading();
    axios
      .get(`${API_URL}/statistic/common`, {
        headers: {Authorization: `Bearer ${accessToken}`},
        params: {
          start_date: getValueStartDate(),
          end_date: getValueEndDate(),
        },
      })
      .then(function (response) {
        const result: Statistic[] = response.data.data;
        const initialValue = 0;
        const initialValueIncomes = 0;
        const totalIncomes = result.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.total_incomes,
          initialValueIncomes,
        );
        const totalExpenses = result.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.total_expenses,
          initialValue,
        );
        setTotalIncomes(totalIncomes);

        setTotalExpenses(totalExpenses);
        hideLoading();
      })
      .catch(function (error) {
        console.warn(error);
        hideLoading();
      });
  }, [filter, valueMonthYear, valueYear, date]);

  return {
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
  };
};
export default useStatistic;
