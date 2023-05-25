import { createSlice } from '@reduxjs/toolkit';
import { getFruit } from './apiCall';

const Fruit = createSlice({
  name: 'fruit',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFruit.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default Fruit.reducer;
