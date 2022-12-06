import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category} from '@types';

export interface ICategories {
  data: Array<Category>;
}

const initialState: ICategories = {
  data: [],
};

export const categoriesState = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    addCategories: (state, action: PayloadAction<Category[]>) => {
      state.data = [...action.payload];
      return state;
    },

    addCategory: (state, action: PayloadAction<Category>) => {
      state.data = [...state.data, action.payload];
      return state;
    },

    updateCategory: (state, action: PayloadAction<Category>) => {
      state.data = state.data.map(category =>
        category.id === action.payload.id
          ? {...category, ...action.payload}
          : category,
      );
      return state;
    },
    deleteCategory: (state, action: PayloadAction<Category>) => {
      state.data = state.data.filter(
        category => category.id !== action.payload.id,
      );
      return state;
    },
  },
});

const {reducer, actions} = categoriesState;
export const {addCategories, addCategory, updateCategory, deleteCategory} =
  actions;
export default reducer;
