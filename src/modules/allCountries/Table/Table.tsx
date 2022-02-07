import React, { useContext, useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { getAllCountriesSummary } from '../../services/selectors';
import { SearchContext } from '../../../context/searchContext';
import { GlobalCountry } from '../../../typedef';
import iconArrowUp from '../../../assets/icon-arrow-up.png';
import iconArrowDown from '../../../assets/icon-arrow-down.png';
import './Table.scss';

export const Table = () => {
    const allCountriesData = useAppSelector((state) => getAllCountriesSummary(state).Countries);
    const { searchQuery } = useContext(SearchContext);
    const [countries, setCountries] = useState<GlobalCountry[]>([]);
    const [isDesc, setIsDesc] = useState<boolean>(true);
    const [sortKey, setSortKey] = useState<string | null>('TotalConfirmed');
    const [icon, setIcon] = useState(iconArrowDown);

    const onSort = (sortKey: Element) => {
        const sortTitle = sortKey.getAttribute('data-title');
        if (sortTitle === 'Country') {
            setCountries(isDesc ? [...allCountriesData] : [...allCountriesData].reverse());
        } else if (sortTitle === 'TotalRecovered') {
            setCountries(
                countries.sort((a: GlobalCountry, b: GlobalCountry) => {
                    const A_totalConfirmed: number = Number(a['TotalConfirmed']);
                    const B_totalConfirmed: number = Number(b['TotalConfirmed']);
                    const A_totalDeaths: number = Number(a['TotalDeaths']);
                    const B_totalDeaths: number = Number(b['TotalDeaths']);
                    return isDesc
                        ? B_totalConfirmed - B_totalDeaths - (A_totalConfirmed - A_totalDeaths)
                        : A_totalConfirmed - A_totalDeaths - (B_totalConfirmed - B_totalDeaths);
                })
            );
        } else {
            setCountries(
                countries.sort((a: GlobalCountry, b: GlobalCountry) => {
                    const A: number = Number(a[sortTitle as keyof GlobalCountry]);
                    const B: number = Number(b[sortTitle as keyof GlobalCountry]);
                    return isDesc ? B - A : A - B;
                })
            );
        }
        setSortKey(sortTitle);
        setIsDesc(!isDesc);
    };

    useEffect(() => {
        if (allCountriesData.length) {
            setCountries(
                [...allCountriesData].sort((a: GlobalCountry, b: GlobalCountry) => {
                    const A: number = Number(a[sortKey as keyof GlobalCountry]);
                    const B: number = Number(b[sortKey as keyof GlobalCountry]);
                    return isDesc ? B - A : A - B;
                })
            );
            setIsDesc(!isDesc);
        }
    }, [allCountriesData]);

    useEffect(() => {
        setIcon(icon === iconArrowDown ? iconArrowUp : iconArrowDown);
    }, [isDesc]);

    return (
        <>
            <ul className='table'>
                <li className='table__item' onClick={(e) => onSort(e.target as Element)}>
                    <div className='item__title' data-title='Country'>
                        Country
                        {sortKey === 'Country' ? (
                            <img alt='sort-direction' className='sort-direction-icon' src={icon} />
                        ) : null}
                    </div>
                    <div className='item__title confirmed' data-title='TotalConfirmed'>
                        Confirmed
                        {sortKey === 'TotalConfirmed' ? (
                            <img alt='sort-direction' className='sort-direction-icon' src={icon} />
                        ) : null}
                    </div>
                    <div className='item__title recovered' data-title='TotalRecovered'>
                        Recovered
                        {sortKey === 'TotalRecovered' ? (
                            <img alt='sort-direction' className='sort-direction-icon' src={icon} />
                        ) : null}
                    </div>
                    <div className='item__title deaths' data-title='TotalDeaths'>
                        Deaths
                        {sortKey === 'TotalDeaths' ? (
                            <img alt='sort-direction' className='sort-direction-icon' src={icon} />
                        ) : null}
                    </div>
                </li>
                {countries
                    .filter((country: GlobalCountry) => {
                        return country.Country.toLowerCase().includes(searchQuery.toLowerCase());
                    })
                    .slice(0, 5)
                    .map((country) => {
                        return (
                            <li className='table__item' key={country.ID}>
                                <div className='item__info'>
                                    <img
                                        alt='flag'
                                        className='flag'
                                        src={`https://flagcdn.com/${country.CountryCode.toLocaleLowerCase()}.svg`}
                                    />
                                    {country.Country}
                                </div>
                                <div className='item__info'>{country.TotalConfirmed}</div>
                                <div className='item__info'>{country.TotalConfirmed - country.TotalDeaths}</div>
                                <div className='item__info'>{country.TotalDeaths}</div>
                            </li>
                        );
                    })}
            </ul>
        </>
    );
};
