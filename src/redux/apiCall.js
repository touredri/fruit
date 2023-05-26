import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const allOriginsUrl = 'https://api.allorigins.win/get?url=';
const targetUrl = 'https://www.fruityvice.com/api/fruit/all';
export const getFruit = createAsyncThunk('getFruit', async () => {
  try {
    const res = await axios.get(allOriginsUrl + encodeURIComponent(targetUrl));
    return res.data.contents;
  } catch (e) {
    throw new Error(e);
  }
});

export const fetchImageUrlByName = async (name) => {
  const accessKey = 'bc1pkJbD2NCmw4-E_tR3mmoQJnSlzcah95CqMegH8s4';
  const searchEndpoint = 'https://api.unsplash.com/search/photos';

  try {
    const response = await axios.get(searchEndpoint, {
      params: {
        query: name,
        client_id: accessKey,
      },
    });

    const { results } = response.data;
    if (results.length > 0) {
      return results[0].urls.small;
    }
    throw new Error('No image found for the provided name.');
  } catch (error) {
    throw new Error(`Error fetching image URL: ${error.message}`);
  }
};

export const fetchFruitData = async (name) => {
  try {
    const res = await axios(allOriginsUrl + encodeURIComponent(`https://www.fruityvice.com/api/fruit/${name}`));
    const contents = JSON.parse(res.data.contents);
    const nutrition = contents.nutritions;
    return nutrition;
  } catch (e) {
    throw new Error(e);
  }
};
