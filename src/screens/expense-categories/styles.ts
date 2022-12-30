import {BASE_PADDING} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: BASE_PADDING,
  },
  fab: {
    position: 'absolute',
    right: BASE_PADDING,
    bottom: 50,
  },
  item: {
    paddingVertical: BASE_PADDING,
  },
  list: {
    marginHorizontal: BASE_PADDING,
    borderRadius: 10,
    marginTop: 30,
  },
});
