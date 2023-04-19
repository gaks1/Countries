import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  countrydetails: [],
  iLoading: false,
  error: null,
};

const url = 'https://restcountries.com/v3.1/name/';

export const fetchCountry = createAsyncThunk('details/fetchCountry', async (countryName, thunkAPI) => {
  try {
    const response = await fetch(`${url}${countryName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCountry.pending]: (state) => ({ ...state, isLoading: true }),
    [fetchCountry.fulfilled]: (state, action) => ({
      ...state,
      isLoading: false,
      countrydetails: action.payload,
    }),
    [fetchCountry.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),

  },
});

export default detailsSlice.reducer;
