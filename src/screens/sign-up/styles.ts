import {BASE_PADDING} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: BASE_PADDING,
  },
  title: {
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: 100,
  },
  subTitle: {
    textAlign: 'center',
    marginBottom: 50,
  },
  viewSignUp: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  spacingInput: {
    marginBottom: 10,
  },
  buttonWrapper: {
    marginTop: 50,
  },
  forgotPassword: {
    marginRight: 20,
    marginTop: 10,
  },
});
