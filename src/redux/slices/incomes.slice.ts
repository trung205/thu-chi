import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Cost} from '@types';

export interface IIncomes {
  data: Array<Cost>;
}

const initialState: IIncomes = {
  data: [],
};

export const inComesState = createSlice({
  name: 'incomes',
  initialState: initialState,
  reducers: {
    addIncomes: (state, action: PayloadAction<Cost[]>) => {
      state.data = [...action.payload];
      return state;
    },

    addIncome: (state, action: PayloadAction<Cost>) => {
      state.data = [...state.data, action.payload];
      return state;
    },

    updateIncome: (state, action: PayloadAction<Cost>) => {
      state.data = state.data.map(category =>
        category.id === action.payload.id
          ? {...category, ...action.payload}
          : category,
      );
      return state;
    },
    deleteIncome: (state, action: PayloadAction<Cost>) => {
      state.data = state.data.filter(
        category => category.id !== action.payload.id,
      );
      return state;
    },
  },
});

const {reducer, actions} = inComesState;
export const {addIncomes, addIncome, updateIncome, deleteIncome} = actions;
export default reducer;
