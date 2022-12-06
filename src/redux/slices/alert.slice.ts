import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IAlertDialog {
  visible: boolean;
  title: string;
  message: string;
  icon?: 'error' | 'success' | 'warning';
  cancelable?: boolean;
  onNegativeButton?: () => void;
  onPositiveButton?: () => void;
  onRequestClose?: () => void;
  onBackdropPress?: () => void;
}
const initialState: IAlertDialog = {
  visible: false,
  title: '',
  message: '',
  icon: undefined,
  cancelable: false,
};

export const alertState = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<IAlertDialog>) => {
      state = {...state, ...action.payload};
      return state;
    },
    hideAlert: state => {
      state = {...initialState};
      return state;
    },
  },
});

const {reducer, actions} = alertState;
export const {showAlert, hideAlert} = actions;
export default reducer;
