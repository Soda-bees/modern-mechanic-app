import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import
import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import userSlice from './userSlice';
import reviewsSlice from './reviewSlice';
import dtcReportSlice from './dtcReportSlice';
import scanReducer from './scanSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  reviews: reviewsSlice,
  dtcReport: dtcReportSlice,
  scans: scanReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Ensure this is AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
