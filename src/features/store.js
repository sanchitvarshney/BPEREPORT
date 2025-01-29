import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import report from './reports/reportSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    report
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
