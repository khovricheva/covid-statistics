import React, { lazy, Suspense, useState } from 'react';
import { Cases } from './Cases';
import { Search } from './Search';
import { Table } from './Table';
import { Loader } from '../../components/Loader';
import { ErrorBoundary } from '../../errorBoundary';
import { SearchContext } from '../../context/searchContext';
import { transformDate } from '../../utils/data-utils';
import './AllCountries.scss';

const Map = lazy(() => import('./Map/Map'));

export const AllCountries = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const searchContext = {
        searchQuery,
        setSearchQuery
    };

    return (
        <ErrorBoundary moduleName='all-countries'>
            <div className='all-countries'>
                <div className='all-countries__statistics'>
                    <h2 className='header'>COVID-19 Statistics</h2>
                    <SearchContext.Provider value={searchContext}>
                        <h3 className='statistics__title'>Global cases by {transformDate(new Date())}</h3>
                        <Cases />
                        <Search />
                        <Table />
                    </SearchContext.Provider>
                </div>
                <Suspense fallback={<Loader />}>
                    <Map />
                </Suspense>
            </div>
        </ErrorBoundary>
    );
};
