import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category} from '@types';

export interface ECategories {
  data: Array<Category>;
}

const initialState: ECategories = {
  data: [],
};

export const expenseCategoriesState = createSlice({
  name: 'expense-categories',
  initialState: initialState,
  reducers: {
    addExpenseCategories: (state, action: PayloadAction<Category[]>) => {
      state.data = [...action.payload];
      return state;
    },

    addExpenseCategory: (state, action: PayloadAction<Category>) => {
      state.data = [...state.data, action.payload];
      return state;
    },

    updateExpenseCategory: (state, action: PayloadAction<Category>) => {
      state.data = state.data.map(category =>
        category.id === action.payload.id
          ? {...category, ...action.payload}
          : category,
      );
      return state;
    },
    deleteExpenseCategory: (state, action: PayloadAction<Category>) => {
      state.data = state.data.filter(
        category => category.id !== action.payload.id,
      );
      return state;
    },
  },
});

const {reducer, actions} = expenseCategoriesState;
export const {addExpenseCategories, addExpenseCategory, updateExpenseCategory, deleteExpenseCategory} =
  actions;
export default reducer;
