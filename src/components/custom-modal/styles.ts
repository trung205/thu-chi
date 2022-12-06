import {BASE_PADDING} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  viewContent: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    borderRadius: 20,
    paddingHorizontal: BASE_PADDING,
    paddingBottom: 10,
    paddingTop: 20,
  },
  title: {},
  subTille: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
});
