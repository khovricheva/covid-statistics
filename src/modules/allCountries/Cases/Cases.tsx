import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { loadAllCountriesSummary } from '../../services/actions';
import { getAllCountriesSummary } from '../../services/selectors';
import iconVirusBlue from '../../../assets/icon-virus-blue.png';
import iconVirusGreen from '../../../assets/icon-virus-green.png';
import iconVirusRed from '../../../assets/icon-virus-red.png';
import './Cases.scss';

export const Cases = () => {
    const dispatch = useAppDispatch();
    const allCountriesSummary = useAppSelector((state) => getAllCountriesSummary(state).Global);

    useEffect(() => {
        if (!allCountriesSummary) {
            dispatch(loadAllCountriesSummary());
        }
    }, [allCountriesSummary]);

    return (
        <>
            {allCountriesSummary && (
                <div className='cases-container'>
                    <div className='cases-block'>
                        <img alt='virus-icon' src={iconVirusBlue} />
                        <div className='cases__info'>
                            <p className='info__title confirmed'>Total confirmed:</p>
                            <p className='info__total'>{allCountriesSummary.TotalConfirmed}</p>
                            <p className='info__new'>
                                <small>+{allCountriesSummary.NewConfirmed}</small>
                            </p>
                        </div>
                    </div>
                    <div className='cases-block'>
                        <img alt='virus-icon' src={iconVirusGreen} />
                        <div className='cases__info'>
                            <p className='info__title recovered'>Total recovered:</p>
                            <p className='info__total'>
                                {allCountriesSummary.TotalConfirmed &&
                                    allCountriesSummary.TotalConfirmed - allCountriesSummary.TotalDeaths}
                            </p>
                            <p className='info__new '>
                                <small>
                                    {allCountriesSummary.NewRecovered !== 0 && `+${allCountriesSummary.NewRecovered}`}
                                </small>
                            </p>
                        </div>
                    </div>
                    <div className='cases-block'>
                        <img alt='virus-icon' src={iconVirusRed} />
                        <div className='cases__info'>
                            <p className='info__title deaths'>Total deaths:</p>
                            <p className='info__total'>{allCountriesSummary.TotalDeaths}</p>
                            <p className='info__new'>
                                <small>+{allCountriesSummary.NewDeaths} </small>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
