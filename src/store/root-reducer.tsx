import { combineReducers } from 'redux';
import { allCountriesSummary, countries } from '../modules/services/reducers';

export const rootReducer = combineReducers({
    allCountriesSummary,
    countries
});
