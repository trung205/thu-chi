import {BASE_PADDING} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: BASE_PADDING,
  },

  list: {
    marginHorizontal: BASE_PADDING,
  },
  viewCost: {
    paddingTop: 20,
    borderRadius: 10,
    paddingBottom: 10,
    marginTop: 20,
  },
  headerCost: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  valueCost: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
    textAlignVertical: 'center',
  },

  datePickerStyle: {
    height: 50,
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    right: BASE_PADDING,
    bottom: 50,
  },
});
