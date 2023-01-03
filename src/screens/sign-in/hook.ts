import {API_URL, SCREENS} from '@constants';
import {useLoading} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {addInformation, hideAlert, IUser, showAlert} from '@redux';
import {dismissKeyboard} from '@utils';
import axios from 'axios';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
const useSignIn = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();

  const initialValues = {email: '', password: ''};
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Sai định dạng email!').required('Bắt buộc nhập'),
    password: Yup.string()
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

  const handleSignIn = () => {
    if (!(dirty && isValid)) {
    } else {
      dismissKeyboard();
    }
    handleSubmit();
  };

  const handleSignUp = () => {
    navigation.navigate(SCREENS.SIGN_UP);
  };

  const callApi = () => {
    showLoading();
    console.log(
      'trung'
    )

    axios
      .post(`${API_URL}/token/auth`, {
        email: values.email,
        password: values.password,
      })
      .then(function (response) {
        const result = response.data;
        getInformation(result.access, result.refresh);
      })
      .catch(function (error) {
        hideLoading();
        dispatch(
          showAlert({
            visible: true,
            title: 'Thông báo',
            message: 'Vui lòng kiểm tra lại!',
            icon: 'error',
            onPositiveButton: () => {
              dispatch(hideAlert());
            },
          }),
        );
      });
  };

  const getInformation = (access: string, refresh: string) => {
    axios
      .get(`${API_URL}/user/self`, {
        headers: {Authorization: `Bearer ${access}`},
      })
      .then(function (response) {
        let {id, email, is_active, date_joined} = response.data;
        let newData: IUser = {
          token: {
            refresh: refresh,
            access: access,
          },
          user: {
            id: id,
            email: email,
            is_active: is_active,
            date_joined: date_joined,
          },
          isSignedIn: true,
        };
        dispatch(addInformation(newData));
        navigation.reset({
          index: 0,
          routes: [{name: SCREENS.BOTTOM_TAB}],
        });
        hideLoading();
      })
      .catch(function (error) {
        console.log(error)
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

    handleSignIn,
    handleSignUp,
  };
};
export default useSignIn;
