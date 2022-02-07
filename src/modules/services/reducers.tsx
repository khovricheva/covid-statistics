import { createReducer } from '@reduxjs/toolkit';
import { loadAllCountriesSummary, loadCountryData } from './actions';
import { GlobalCountry, Global, Country } from '../../typedef';

type allCountriesState = {
    Global: Global | null;
    Countries: GlobalCountry[];
};

type CountriesState = {
    countries: {
        [country: string]: Country[];
    };
    selectedCountry: string | undefined;
};
const allCountriesDefaultState = {
    Global: null,
    Countries: []
} as allCountriesState;

const countriesDefaultState = {
    countries: {},
    selectedCountry: ''
} as CountriesState;

export const allCountriesSummary = createReducer(allCountriesDefaultState, (builder) =>
    builder.addCase(loadAllCountriesSummary.fulfilled, (state, { payload }) => {
        state.Countries = payload.Countries;
        state.Global = payload.Global;
    })
);

export const countries = createReducer(countriesDefaultState, (builder) => {
    builder.addCase(loadCountryData.fulfilled, (state, { payload }) => {
        state.countries[payload[0].Country.toLowerCase()] = payload;
    });
});
