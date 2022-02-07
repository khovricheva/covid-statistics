import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadAllCountriesSummary = createAsyncThunk('load-all-countries', async () => {
    return fetch(`https://api.covid19api.com/summary`).then((res) => res.json());
});

export const loadCountryData = createAsyncThunk('load-country-data', async (country: string) => {
    return fetch(`https://api.covid19api.com/total/dayone/country/${country}`).then((res) => res.json());
});
