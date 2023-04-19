import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
    countrydetails: [],
    iLoading: false,
    error: null,
};

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {},
    extraReducers: {
    },
});

export default detailsSlice.reducer;
