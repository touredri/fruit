import { configureStore } from '@reduxjs/toolkit';
import FruitReducer from './FruitSlice';

const store = configureStore({
  reducer: {
    fruit: FruitReducer,
  },
});

export default store;
