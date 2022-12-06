import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IUser {
  token: {
    refresh: string;
    access: string;
  };
  user: {
    id: string;
    email: string;
    is_active: boolean;
    date_joined: string;
  };
  isSignedIn: boolean;
}

const initialState: IUser = {
  token: {
    refresh: '',
    access: '',
  },
  user: {
    id: '',
    email: '',
    is_active: true,
    date_joined: '',
  },
  isSignedIn: false,
};

export const userState = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    addInformation: (state, action: PayloadAction<IUser>) => {
      state = {...state, ...action.payload};
      return state;
    },
    removeInformation: state => {
      state = initialState;
      return state;
    },
  },
});

const {reducer, actions} = userState;
export const {addInformation, removeInformation} = actions;
export default reducer;
