import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Cost} from '@types';

export interface IExpenses {
  data: Array<Cost>;
}

const initialState: IExpenses = {
  data: [],
};

export const expensesState = createSlice({
  name: 'expenses',
  initialState: initialState,
  reducers: {
    addExpenses: (state, action: PayloadAction<Cost[]>) => {
      state.data = [...action.payload];
      return state;
    },

    addExpense: (state, action: PayloadAction<Cost>) => {
      state.data = [...state.data, action.payload];
      return state;
    },

    updateExpense: (state, action: PayloadAction<Cost>) => {
      state.data = state.data.map(category =>
        category.id === action.payload.id
          ? {...category, ...action.payload}
          : category,
      );
      return state;
    },
    deleteExpense: (state, action: PayloadAction<Cost>) => {
      state.data = state.data.filter(
        category => category.id !== action.payload.id,
      );
      return state;
    },
  },
});

const {reducer, actions} = expensesState;
export const {addExpenses, addExpense, updateExpense, deleteExpense} = actions;
export default reducer;
