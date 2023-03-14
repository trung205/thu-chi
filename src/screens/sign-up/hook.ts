import {API_URL, SCREENS} from '@constants';
import { useLoading} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {addInformation, IUser} from '@redux';
import {dismissKeyboard} from '@utils';
import axios from 'axios';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
const useSignUp = () => {
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

  const handleSignUp = () => {
    if (!(dirty && isValid)) {
    } else {
      dismissKeyboard();
    }
    handleSubmit();
  };

  const handleSignIn = () => {
    navigation.navigate(SCREENS.SIGN_IN);
  };

  const callApi = () => {
    showLoading();
    axios
      .post(`${API_URL}/user/register`, {
        email: values.email,
        password: values.password,
      })
      .then(function (response) {
        hideLoading();
        navigation.goBack();
      })
      .catch(function (error) {
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
export default useSignUp;
