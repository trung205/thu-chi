import {ItemProfileProps} from '@components';
import {SCREENS} from '@constants';
import {useTheme} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {hideAlert, removeInformation, showAlert} from '@redux';
import {useDispatch} from 'react-redux';
const useProfile = () => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(
      showAlert({
        visible: true,
        title: 'Đăng xuất',
        message: 'Bạn có chắc đăng xuất không?',
        cancelable: true,
        onNegativeButton: () => {
          dispatch(hideAlert());
        },
        onPositiveButton: () => {
          dispatch(hideAlert());
          dispatch(removeInformation());
          navigation.reset({
            index: 0,
            routes: [{name: SCREENS.SIGN_IN}],
          });
        },
      }),
    );
  };

  const listItem: ItemProfileProps[] = [
    {
      text: 'Chế độ',
      secondaryText: 'Tắt',
      icon: {
        name: 'moon',
        type: 'ionicon',
      },
      iconBg: '#1c87fa',
      onPress: () => {},
    },
    {
      text: 'Danh mục',
      secondaryText: '',
      icon: {
        name: 'apps',
        type: 'ionicon',
      },
      iconBg: 'orange',
      onPress: () => {
        navigation.navigate(SCREENS.CATEGORIES);
      },
    },
    {
      text: 'Thống kê',
      secondaryText: 'Tắt',
      icon: {
        name: 'bar-chart',
        type: 'ionicon',
      },
      iconBg: '#1c87fa',
      onPress: () => {
        navigation.navigate(SCREENS.STATISTIC);
      },
    },
    {
      text: 'Thay đổi mật khẩu',
      secondaryText: '',
      icon: {
        name: 'lock-closed',
        type: 'ionicon',
      },
      iconBg: '#68d858',
      onPress: () => {
        navigation.navigate(SCREENS.CHANGE_PASSWORD);
      },
    },
    {
      text: 'Cài đặt khác',
      secondaryText: '',
      icon: {
        name: 'settings',
        type: 'ionicon',
      },
      iconBg: '#ac70f9',
      onPress: () => {},
    },
  ];
  return {
    showModal,
    listItem,
  };
};

export default useProfile;
