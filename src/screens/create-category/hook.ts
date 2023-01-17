import {API_URL} from '@constants';
import {useLoading} from '@hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {addCategory, addExpenseCategory, hideAlert, RootState, showAlert} from '@redux';
import axios from 'axios';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
const useCreateCategory = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();

  // params
  const type = route?.params?.key;
  const categories = type == 'incomes' ? 'income-categories' : 'expense-categories';

  // Redux state
  const accessToken = useSelector(
    (state: RootState) => state.user.token.access,
  );

  const initialValues = {
    name: '',
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Bắt buộc nhập'),
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
      callApi(values.name);
    },
  });

  const onPressButton = () => {
    if (!(dirty && isValid)) {
      dispatch(
        showAlert({
          visible: true,
          title: 'Thông báo',
          message: 'Bạn chưa nhập gì cả!',
          icon: 'error',
          onPositiveButton: () => {
            dispatch(hideAlert());
          },
        }),
      );
    }
    handleSubmit();
  };

  const callApi = (value: string) => {
    showLoading();
    axios
      .post(
        `${API_URL}/${categories}`,
        {
          name: value,
        },
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      )
      .then(function (response) {
        if (type == 'incomes') {
          dispatch(addCategory(response.data));
        } else {
          dispatch(addExpenseCategory(response.data))
        }
        navigation.goBack();
        hideLoading();
      })
      .catch(function (error) {
        if (error?.response?.status == 303) {
          dispatch(
            showAlert({
              visible: true,
              title: 'Thông báo',
              message: 'Tên danh mục đã được sử dụng!',
              icon: 'error',
              onPositiveButton: () => {
                dispatch(hideAlert());
              },
            }),
          );
          hideLoading();
        } else {
          console.log(error)
          hideLoading();
        }
      });
  };
  return {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleBlur,

    onPressButton,
  };
};
export default useCreateCategory;
