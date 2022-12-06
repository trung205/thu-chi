import {API_URL, SCREENS} from '@constants';
import {useLoading} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {addExpense, addIncome, hideAlert, RootState, showAlert} from '@redux';
import axios from 'axios';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
const useCreateCost = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.user.token.access,
  );
  const {showLoading, hideLoading} = useLoading();

  const categories = useSelector((state: RootState) => state.categories.data);

  const initialValues = {
    type: '',
    category: '',
    description: '',
    date: '',
    amount: '',
  };
  const validationSchema = Yup.object().shape({
    type: Yup.string().required('Bắt buộc chọn'),
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
      if (values.type == 'incomes') {
        callApiCreateIncome();
      } else {
        callApiCreateExpense();
      }
    },
  });

  const callApiCreateIncome = () => {
    showLoading();
    axios
      .post(
        `${API_URL}/incomes`,
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
        dispatch(addIncome(response.data));
        navigation.goBack();
        hideLoading();
      })
      .catch(function (error) {
        // console.log('error');
        // console.log(error);
        hideLoading();
      });
  };

  const callApiCreateExpense = () => {
    showLoading();
    axios
      .post(
        `${API_URL}/expenses`,
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
        dispatch(addExpense(response.data));
        navigation.goBack();
        hideLoading();
      })
      .catch(function (error) {
        // console.log('error');
        // console.log(error);
        hideLoading();
      });
  };

  const onPressButton = () => {
    if (!(dirty && isValid)) {
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

    categories,
    onPressButton,
    onPressSetting,
  };
};
export default useCreateCost;
