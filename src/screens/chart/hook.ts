import {DataChart} from '@components';
import {API_URL} from '@constants';
import {useLoading} from '@hooks';
import {RootState} from '@redux';
import {Statistic} from '@types';
import axios from 'axios';
import moment from 'moment';
import {useEffect, useRef, useState} from 'react';
import {Modalize} from 'react-native-modalize';
import {useSelector} from 'react-redux';

enum ChartType {
  INCOMES = 'INCOMES',
  EXPENSES = 'EXPENSES',
  ALL = 'ALL',
}

enum ChartFilter {
  DATES = 'DATES',
  MONTHS = 'MONTHS',
  YEARS = 'YEARS',
}

interface InputData {
  start_date: string;
  end_date: string;
}

const useChart = () => {
  const refType = useRef<Modalize>();
  const refFilter = useRef<Modalize>();
  const refChooseYear = useRef<Modalize>();
  const refChooseMonthYear = useRef<Modalize>();
  const [visibleDatePicker, setVisbleDatePicker] = useState(false);
  const [type, setType] = useState(ChartType.ALL);
  const [filter, setFilter] = useState(ChartFilter.MONTHS);
  const {showLoading, hideLoading} = useLoading();

  //  Redux state
  const accessToken = useSelector(
    (state: RootState) => state.user.token.access,
  );

  const [valueYear, setValueYear] = useState(moment(new Date()).format('YYYY'));
  const [valueMonthYear, setValueMonthYear] = useState(
    moment(new Date()).format('MM-YYYY'),
  );

  const [startDate, setStartDate] = useState(
    moment(new Date()).startOf('month').format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).endOf('month').format('YYYY-MM-DD'),
  );

  const dataType = [
    {
      label: 'Thu nhập',
      key: ChartType.INCOMES,
    },
    {
      label: 'Chi tiêu',
      key: ChartType.EXPENSES,
    },
    {
      label: 'Thu nhập & Chi tiêu',
      key: ChartType.ALL,
    },
  ];

  const dataFiler = [
    {
      label: 'Tuỳ chọn',
      key: ChartFilter.DATES,
    },
    {
      label: 'Theo tháng',
      key: ChartFilter.MONTHS,
    },
    {
      label: 'Theo năm',
      key: ChartFilter.YEARS,
    },
  ];

  const chartType = () => {
    switch (type) {
      case ChartType.INCOMES:
        return {
          showIncomes: true,
          showExpenses: false,
        };
      case ChartType.EXPENSES:
        return {
          showIncomes: false,
          showExpenses: true,
        };
      case ChartType.ALL:
        return {
          showIncomes: true,
          showExpenses: true,
        };
    }
  };

  const showTypePicker = () => {
    refType.current?.open();
  };

  const onPressItemTypePicker = (item: {label: string; key: ChartType}) => {
    refType.current?.close();
    setType(item.key);
  };

  const showFilter = () => {
    refFilter.current?.open();
  };

  const onPressItemFilter = (item: {label: string; key: ChartFilter}) => {
    refFilter.current?.close();
    setFilter(item.key);
  };

  const onPressChooseTime = () => {
    switch (filter) {
      case ChartFilter.YEARS:
        refChooseYear.current?.open();
        break;
      case ChartFilter.MONTHS:
        refChooseMonthYear.current?.open();
        break;
      case ChartFilter.DATES:
        setVisbleDatePicker(true);
    }
  };

  const getValueStartDate = () => {
    switch (filter) {
      case ChartFilter.MONTHS:
        return moment(valueMonthYear, 'MM-YYYY')
          .startOf('month')
          .format('YYYY-MM-DD');
      case ChartFilter.DATES:
        return startDate;
    }
  };

  const getValueEndDate = () => {
    switch (filter) {
      case ChartFilter.MONTHS:
        return moment(valueMonthYear, 'MM-YYYY')
          .endOf('month')
          .format('YYYY-MM-DD');
      case ChartFilter.DATES:
        return endDate;
    }
  };

  const [dataChart, setDataChart] = useState<DataChart[]>([]);

  const renderFieldDate = () => {
    switch (filter) {
      case ChartFilter.DATES:
        return (
          moment(startDate, 'YYYY-MM-DD').format('DD/MM/YYYY') +
          ' - ' +
          moment(endDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
        );
      case ChartFilter.MONTHS:
        return moment(valueMonthYear, 'MM-YYYY').format('MM/YYYY');
      case ChartFilter.YEARS:
        return valueYear;
    }
  };

  const getValueDate = () => {
    let array: InputData[] = [];
    for (var i = 1; i <= 12; i++) {
      const newObj = {
        start_date: moment(`${i}/${valueYear}`, 'MM/YYYY')
          .startOf('month')
          .format('YYYY-MM-DD'),
        end_date: moment(`${i}/${valueYear}`, 'MM/YYYY')
          .endOf('month')
          .format('YYYY-MM-DD'),
      };
      array.push(newObj);
    }
    return array;
  };

  const getStatisticMonth = (input: InputData) => {
    return axios
      .get(`${API_URL}/statistic`, {
        headers: {Authorization: `Bearer ${accessToken}`},
        params: input,
      })
      .then(res => {
        const result: Statistic[] = res.data.data;
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
        const newObj: DataChart = {
          incomes: totalIncomes,
          expenses: totalExpenses,
          label: `${'T' + moment(input.start_date, 'YYYY-MM-DD').format('M')}`,
        };
        return newObj;
      });
  };

  const getStatisticAYear = async () => {
    showLoading();
    Promise.all(getValueDate().map(getStatisticMonth))
      .then(values => {
        setDataChart(values);
        hideLoading();
      })
      .catch(e => {
        hideLoading();
      });
  };

  useEffect(() => {
    if (filter == ChartFilter.YEARS) {
      getStatisticAYear();
    }
  }, [filter, valueYear]);

  useEffect(() => {
    if (filter !== ChartFilter.YEARS) {
      showLoading();
      axios
        .get(`${API_URL}/statistic`, {
          headers: {Authorization: `Bearer ${accessToken}`},
          params: {
            start_date: getValueStartDate(),
            end_date: getValueEndDate(),
          },
        })
        .then(function (response) {
          const result: Statistic[] = response.data.data;
          let newArray: DataChart[] = [];
          result.map(e => {
            let newObj: DataChart = {
              incomes: e.total_incomes,
              expenses: e.total_expenses,
              label:
                filter == ChartFilter.DATES
                  ? moment(e.date, 'YYYY-MM-DD').format('DD/MM')
                  : moment(e.date, 'YYYY-MM-DD').format('DD'),
            };
            newArray.push(newObj);
          });
          setDataChart(newArray);
          hideLoading();
        })
        .catch(function (error) {
          hideLoading();
        });
    }
  }, [filter, valueMonthYear, startDate, endDate]);

  return {
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
  };
};
export default useChart;
