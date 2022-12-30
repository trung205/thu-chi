import {Dimensions, NativeModules, Platform} from 'react-native';
const {StatusBarManager} = NativeModules;
//
export const HARDWARE_BACK_PRESS_EVENT_NAME = 'hardwareBackPress';
export const KEYBOARD_DID_SHOW_EVENT_NAME = 'keyboardDidShow';
export const KEYBOARD_DID_HIDE_EVENT_NAME = 'keyboardDidHide';
//
export const STATUS_BAR_HEIGHT = StatusBarManager.HEIGHT;
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

export const IS_ANDROID = Platform.OS == 'android';
export const IS_IOS = Platform.OS == 'ios';

export const BASE_PADDING = 16;

export const API_URL = ' https://spiderpig83.pythonanywhere.com/api/v1';

export const CONTAINER_HEIGHT = 50 * 5;
export const ITEM_HEIGHT = 50;

export const HEIGHT_PICKER_ITEM = 50;
