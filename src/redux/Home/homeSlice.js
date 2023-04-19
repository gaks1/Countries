import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    countries: [],
    isLoading: false,
    fetched: false,
    error: null,
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: {
    },

});

export default homeSlice.reducer;
