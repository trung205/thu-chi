import {Action, configureStore, Store, ThunkAction} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer, {RootState} from './root-reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
export const persistor = persistStore(store);
