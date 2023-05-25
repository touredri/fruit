import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const allOriginsUrl = 'https://api.allorigins.win/get?url=';
const targetUrl = 'https://www.fruityvice.com/api/fruit/all';
const getFruit = createAsyncThunk('getFruit', async () => {
  try {
    const res = await axios.get(allOriginsUrl + encodeURIComponent(targetUrl));
    return res.data.contents;
  } catch (e) {
    throw new Error(e);
  }
});

export default getFruit;
