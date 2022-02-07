import { AppState } from '../../store/typedef';

export const getAllCountriesSummary = (state: AppState) => state.allCountriesSummary;

export const getCountryData = (state: AppState) => state.countries;
