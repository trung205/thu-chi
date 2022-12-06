import {API_URL, SCREENS} from '@constants';
import {useLoading} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {hideAlert, RootState, showAlert} from '@redux';
import axios from 'axios';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
const useChangePassword = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();

  // Redux state
  const accessToken = useSelector(
    (state: RootState) => state.user.token.access,
  );

  const initialValues = {
    oldPassword: '',
    newPassword: '',
  };
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(4, 'Mật khẩu ít nhất phải có 4 ký tự')
      .required('Bắt buộc nhập'),
    newPassword: Yup.string()
      .min(4, 'Mật khẩu ít nhất phải có 4 ký tự')
      .required('Bắt buộc nhập'),
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
      callApi();
    },
  });

  const onPressButton = () => {
    if (!(dirty && isValid)) {
      dispatch(
        showAlert({
          visible: true,
          title: 'Thông báo',
          message: 'Bạn vui lòng kiểm tra lại các trường!',
          icon: 'error',
          onPositiveButton: () => {
            dispatch(hideAlert());
          },
        }),
      );
    }
    handleSubmit();
  };

  const callApi = () => {
    showLoading();
    axios
      .put(
        `${API_URL}/user/self`,
        {
          current_password: values.oldPassword,
          new_password: values.newPassword,
        },
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      )
      .then(function (response) {
        navigation.reset({
          index: 0,
          routes: [{name: SCREENS.SIGN_IN}],
        });
        hideLoading();
      })
      .catch(function (error) {
        if (error?.response?.status == 400) {
          dispatch(
            showAlert({
              visible: true,
              title: 'Thông báo',
              message: 'Mật khẩu không chính xác !',
              icon: 'error',
              onPositiveButton: () => {
                dispatch(hideAlert());
              },
            }),
          );
          hideLoading();
        } else {
          hideLoading();
        }
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
  };
};
export default useChangePassword;
