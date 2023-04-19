import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'https://restcountries.com/v3.1/all';

const initialState = {
  countries: [],
  isLoading: false,
  fetched: false,
  error: null,
};

export const fetchCountries = createAsyncThunk('home/fetchCountries', async (_, thunkAPI) => {
  try {
    const response = await fetch(`${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCountries.pending]: (state) => ({ ...state, isLoading: true }),
    [fetchCountries.fulfilled]: (state, action) => ({
      ...state,
      isLoading: false,
      fetched: true,
      countries: action.payload,
    }),
    [fetchCountries.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },

});

export default homeSlice.reducer;
