import { createSlice } from '@reduxjs/toolkit';
import { getFruit } from './apiCall';

export const initialState = {
  data: [],
};
const Fruit = createSlice({
  name: 'fruit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFruit.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default Fruit.reducer;
