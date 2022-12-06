import {combineReducers} from '@reduxjs/toolkit';

import appReducer from './slices/app.slice';
import alertReducer from './slices/alert.slice';
import userReducer from './slices/user.slice';
import categoriesReducer from './slices/categories.slice';
import incomesReducer from './slices/incomes.slice';
import expensesReducer from './slices/expenses.slice';
const rootReducer = combineReducers({
  app: appReducer,
  alert: alertReducer,
  user: userReducer,
  categories: categoriesReducer,
  incomes: incomesReducer,
  expenses: expensesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
