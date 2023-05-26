import axios from 'axios';
import FruitReducer from '../redux/FruitSlice';
import { fetchImageUrlByName, getFruit } from '../redux/apiCall';

jest.mock('axios');

describe('apiCall', () => {
  describe('fetchImageUrlByName', () => {
    it('should return the image URL for a valid fruit name', async () => {
      const name = 'apple';
      const response = {
        data: {
          results: [
            {
              urls: {
                small: 'https://example.com/image.jpg',
              },
            },
          ],
        },
      };

      axios.get.mockResolvedValue(response);

      const imageUrl = await fetchImageUrlByName(name);

      expect(imageUrl).toBe('https://example.com/image.jpg');
      expect(axios.get).toHaveBeenCalledWith('https://api.unsplash.com/search/photos', {
        params: {
          query: name,
          client_id: 'bc1pkJbD2NCmw4-E_tR3mmoQJnSlzcah95CqMegH8s4',
        },
      });
    });

    it('should throw an error if no image is found for the provided name', async () => {
      const name = 'apple';
      const response = {
        data: {
          results: [],
        },
      };

      axios.get.mockResolvedValue(response);

      await expect(fetchImageUrlByName(name)).rejects.toThrow('No image found for the provided name.');
    });

    it('should throw an error if there is an error fetching the image URL', async () => {
      const name = 'apple';

      axios.get.mockRejectedValue(new Error('Network error'));

      await expect(fetchImageUrlByName(name)).rejects.toThrow('Error fetching image URL: Network error');
    });
  });
  describe('FruitSlice', () => {
    describe('reducer', () => {
      it('should handle getFruit.fulfilled action', () => {
        const initialState = { data: [] };
        const fruits = [{ name: 'apple' }, { name: 'banana' }];
        const action = { type: getFruit.fulfilled.type, payload: fruits };

        const nextState = FruitReducer(initialState, action);

        expect(nextState.data).toEqual(fruits);
      });
    });
  });
});
