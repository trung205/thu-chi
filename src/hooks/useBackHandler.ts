import {HARDWARE_BACK_PRESS_EVENT_NAME} from '@constants';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export const useBackHandler = (handler: () => boolean) => {
  useEffect(() => {
    BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT_NAME, handler);

    return () =>
      BackHandler.removeEventListener(HARDWARE_BACK_PRESS_EVENT_NAME, handler);
  }, [handler]);
};
