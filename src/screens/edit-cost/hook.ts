import {API_URL, SCREENS} from '@constants';
import {useLoading} from '@hooks';
import {EditCostRouteProp} from '@navigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  deleteExpense,
  deleteIncome,
  hideAlert,
  RootState,
  showAlert,
  updateExpense,
  updateIncome,
} from '@redux';
import axios from 'axios';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';

const useEditCost = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<EditCostRouteProp>();
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();

  // Params
  const {item, key} = route.params;

  // Redux state
  const categories =  key == 'incomes' ? useSelector((state: RootState) => state.categories.data) : useSelector((state: RootState) => state?.expenseCategories?.data);
  // const expenseCategories = useSelector((state: RootState) => state?.expenseCategories?.data);

  const accessToken = useSelector(
    (state: RootState) => state.user.token.access,
  );

  // ... rest

  const headerTitle =
    key == 'incomes' ? 'Chỉnh sửa thu nhập' : 'Chỉnh sửa chi tiêu';

  const initialValues = {
    category: key == 'incomes' ? item.income_category_id : item.expense_category_id,
    description: item?.description,
    date: item?.date,
    amount: item.amount.toString(),
  };

  const validationSchema = Yup.object().shape({
    category: Yup.string().required('Bắt buộc chọn'),
    description: Yup.string().required('Bắt buộc nhập'),
    date: Yup.string().required('Bắt buộc chọn'),
    amount: Yup.number().required('Bắt buộc nhập'),
  });

  const {
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    dirty,
    isValid,
  } = useFormik({
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      if (key == 'incomes') {
        callApiEditIncome();
      }
      if (key == 'expenses') {
        callApiEditExpense();
      }
    },
  });

  const callApiEditIncome = () => {
    showLoading();
    axios
      .put(
        `${API_URL}/incomes/${item.id}`,
        {
          category_id: values.category,
          description: values.description,
          amount: values.amount,
          date: values.date,
        },
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      )
      .then(function (response) {
        dispatch(updateIncome(response.data));
        navigation.goBack();
        hideLoading();
      })
      .catch(function (error) {
        hideLoading();
      });
  };

  const callApiEditExpense = () => {
    showLoading();
    axios
      .put(
        `${API_URL}/expenses/${item.id}`,
        {
          category_id: values.category,
          description: values.description,
          amount: values.amount,
          date: values.date,
        },
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      )
      .then(function (response) {
        dispatch(updateExpense(response.data));
        navigation.goBack();
        hideLoading();
      })
      .catch(function (error) {
        hideLoading();
      });
  };

  const callApiDeleteIncome = () => {
    showLoading();
    axios({
      method: 'delete',
      url: `${API_URL}/incomes/${item.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: null,
    })
      .then(function (response) {
        hideLoading();
      })
      .catch(function (error) {
        dispatch(deleteIncome(item));
        navigation.goBack();
        hideLoading();
      });
  };

  const callApiDeleteExpense = () => {
    showLoading();
    axios({
      method: 'delete',
      url: `${API_URL}/expenses/${item.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: null,
    })
      .then(function (response) {
        hideLoading();
      })
      .catch(function (error) {
        dispatch(deleteExpense(item));
        navigation.goBack();
        hideLoading();
      });
  };

  const onPressButton = () => {
    if (!isValid) {
      dispatch(
        showAlert({
          visible: true,
          title: 'Thông báo',
          message: 'Bạn vui lòng kiểm tra các trường!',
          icon: 'error',
          onPositiveButton: () => {
            dispatch(hideAlert());
          },
        }),
      );
    }

    handleSubmit();
  };

  const handleDelete = () => {
    dispatch(
      showAlert({
        visible: true,
        title: 'Thông báo',
        message: 'Bạn chắc chắn muốn xoá!',
        icon: 'warning',
        cancelable: true,
        onPositiveButton: () => {
          dispatch(hideAlert());
          if (key == 'incomes') {
            callApiDeleteIncome();
          }
          if (key == 'expenses') {
            callApiDeleteExpense();
          }
        },
        onNegativeButton: () => {
          dispatch(hideAlert());
        },
      }),
    );
  };

  const onPressSetting = () => {
    navigation.navigate(SCREENS.CATEGORIES);
  };

  return {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    headerTitle,
    categories,
    
    onPressButton,
    handleDelete,
    onPressSetting,
  };
};
export default useEditCost;
