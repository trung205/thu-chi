import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const appState = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

const {reducer, actions} = appState;
export const {changeLoading} = actions;
export default reducer;
