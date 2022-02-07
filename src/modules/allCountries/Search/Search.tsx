import React, { useContext } from 'react';
import { SearchContext } from '../../../context/searchContext';
import './Search.scss';

export const Search = () => {
    const { setSearchQuery } = useContext(SearchContext);

    const handleChange = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    };

    return (
        <div className='search-container'>
            <label htmlFor='search-input' />
            <input
                className='search-input'
                id='search-input'
                type='text'
                placeholder='Search country'
                onChange={(event) => handleChange(event.target.value)}
            />
        </div>
    );
};
