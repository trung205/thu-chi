import {API_URL, SCREENS} from '@constants';
import {HomeNavigationProp} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {addCategories, addExpenses, addIncomes, RootState} from '@redux';
import {Cost} from '@types';
import axios from 'axios';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const useHome = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.user.token.access,
  );

  const expenses = useSelector((state: RootState) => state?.expenses?.data);
  const categories = useSelector((state: RootState) => state?.categories?.data);
  const incomes = useSelector((state: RootState) => state?.incomes?.data);

  const handleFabButton = () => {
    navigation.navigate(SCREENS.CREATE_COST);
  };

  const onPressItemIncome = (item: Cost) => {
    navigation.navigate(SCREENS.EDIT_COST, {
      item,
      key: 'incomes',
    });
  };

  const onPressItemExpense = (item: Cost) => {
    navigation.navigate(SCREENS.EDIT_COST, {
      item,
      key: 'expenses',
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios
        .get(`${API_URL}/incomes`, {
          headers: {Authorization: `Bearer ${accessToken}`},
        })
        .then(function (response) {
          dispatch(addIncomes(response.data.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios
        .get(`${API_URL}/expenses`, {
          headers: {Authorization: `Bearer ${accessToken}`},
        })
        .then(function (response) {
          dispatch(addExpenses(response.data.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios
        .get(`${API_URL}/categories`, {
          headers: {Authorization: `Bearer ${accessToken}`},
        })
        .then(function (response) {
          dispatch(addCategories(response.data.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    return unsubscribe;
  }, [navigation]);

  return {
    incomes,
    expenses,
    categories,

    handleFabButton,
    onPressItemIncome,
    onPressItemExpense,
  };
};
export default useHome;
