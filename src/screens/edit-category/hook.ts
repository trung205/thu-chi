import {API_URL} from '@constants';
import {useLoading} from '@hooks';
import {EditCategoryRouteProp} from '@navigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  deleteCategory,
  hideAlert,
  RootState,
  showAlert,
  updateCategory,
  updateExpenseCategory,
  deleteExpenseCategory
} from '@redux';
import axios from 'axios';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';

const useEditCategory = () => {
  const navigation = useNavigation();
  const route = useRoute<EditCategoryRouteProp>();
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();

  //  Params
  const item = route?.params?.item;
  const type = route?.params?.key;
  const categories = type == 'incomes' ? 'income-categories' : 'expense-categories';

  //  Redux state
  const accessToken = useSelector(
    (state: RootState) => state.user.token.access,
  );

  // ...rest

  const initialValues = {
    name: item.name,
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
      callApiEdit(values.name);
    },
  });

  const onPressButton = () => {
    if (!isValid) {
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

  const callApiEdit = (value: string) => {
    console.log(value)
    console.log(item.id)
    showLoading();
    axios
      .put(
        `${API_URL}/${categories}/${item.id}`,
        {
          name: value,
        },
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      )
      .then(function (response) {
        if (type == 'incomes') {
          dispatch(updateCategory(response.data));
        } else {
          dispatch(updateExpenseCategory(response.data));
        }
        navigation.goBack();
        hideLoading();
      })
      .catch(function (error) {
        if (error?.response?.status == 400) {
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

  const onPressDelete = () => {
    dispatch(
      showAlert({
        visible: true,
        title: 'Thông báo',
        message: 'Bạn chắc chắn muốn xoá!',
        icon: 'warning',
        cancelable: true,
        onPositiveButton: () => {
          dispatch(hideAlert());
          callApiDelete();
        },
        onNegativeButton: () => {
          dispatch(hideAlert());
        },
      }),
    );
  };

  const callApiDelete = () => {
    showLoading();
    axios({
      method: 'delete',
      url: `${API_URL}/${categories}/${item.id}`,
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
        if (type == 'incomes') {
          dispatch(deleteCategory(item));
        } else {
          dispatch(deleteExpenseCategory(item));
        }
        navigation.goBack();
        hideLoading();
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
    onPressDelete,
  };
};
export default useEditCategory;
