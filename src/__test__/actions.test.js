import axios from 'axios';
import { getFruit } from '../redux/apiCall';

describe('getFruit', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw an error when API returns an error', async () => {
    // Mock axios.get method to throw an error
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Network Error'));

    // Call the thunk and expect it to throw an error
    await expect(getFruit()).rejects.toThrowError();
    axios.get.mockRestore();
  }, 5000);
});
