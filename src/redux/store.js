import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './Home/homeSlice';
import detailsReducer from './Details/detailsSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    details: detailsReducer,
  },
});

export default store;
