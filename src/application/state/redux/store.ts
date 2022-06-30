import { configureStore } from '@reduxjs/toolkit';
import { eventsListApi } from 'features/eventsList/state';

export const store = configureStore({
  reducer: {
    [eventsListApi.reducerPath]: eventsListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventsListApi.middleware),
});
