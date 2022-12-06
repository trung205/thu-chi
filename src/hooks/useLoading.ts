import {changeLoading} from '@redux';
import {useDispatch} from 'react-redux';

export const useLoading = () => {
  const dispatch = useDispatch();
  const changeLoadingStatus = (isLoading: boolean) => {
    dispatch(changeLoading(isLoading));
  };

  const showLoading = () => {
    changeLoadingStatus(true);
  };

  const hideLoading = () => {
    changeLoadingStatus(false);
  };

  return {showLoading, hideLoading};
};
