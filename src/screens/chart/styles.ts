import {BASE_PADDING} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: BASE_PADDING,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listTypePicker: {
    marginHorizontal: BASE_PADDING,
  },
});
