import React, { useEffect, useState } from 'react';
import { scaleLinear } from 'd3-scale';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { useAppSelector } from '../../../../store/hooks';
import { getAllCountriesSummary } from '../../../services/selectors';
import { geoUrl, lightColor, darkColor, defaultColor, borderColor, highlightColor } from './constants';
import { GlobalCountry } from '../../../../typedef';
import './MapChart.scss';

type Props = {
    setTooltipContent: React.Dispatch<React.ReactNode>;
};

export const MapChart = ({ setTooltipContent }: Props) => {
    const allCountries = useAppSelector((state) => getAllCountriesSummary(state).Countries);
    const [countOfCases, setCountOfCases] = useState<number[]>([]);
    const [minCases, setMinCases] = useState<number>(0);
    const [maxCases, setMaxCases] = useState<number>(0);

    useEffect(() => {
        if (allCountries.length) {
            allCountries.map((country: GlobalCountry) => setCountOfCases((prev) => [...prev, country.TotalConfirmed]));
        }
    }, [allCountries]);

    useEffect(() => {
        const sortedCountOfCases = countOfCases.sort((a: number, b: number) => a - b);
        setMinCases(sortedCountOfCases[0]);
        setMaxCases(sortedCountOfCases[sortedCountOfCases.length - 1]);
    }, [countOfCases]);

    const customScale = scaleLinear<string>().domain([minCases, maxCases]).range([lightColor, darkColor]);

    return (
        <>
            <ComposableMap data-tip='' projectionConfig={{ scale: 200 }}>
                <ZoomableGroup center={[0, -10]}>
                    {allCountries.length && (
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const country = allCountries.find(
                                        (item) => item.CountryCode === geo.properties.ISO_A2
                                    );
                                    return (
                                        <Link key={geo.rsmKey} to={country ? country.Country.toLowerCase() : ''}>
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                fill={
                                                    country
                                                        ? customScale(country.TotalConfirmed).toString()
                                                        : defaultColor
                                                }
                                                stroke={borderColor}
                                                strokeWidth={0.5}
                                                onMouseEnter={() => {
                                                    const { NAME } = geo.properties;
                                                    setTooltipContent(
                                                        <div className='map-tooltip'>
                                                            <h4 className='map-tooltip__title'>{NAME}</h4>
                                                            <p className='map-tooltip__info'>
                                                                Total confirmed: {country?.TotalConfirmed}
                                                            </p>
                                                            <p className='map-tooltip__info'>
                                                                New confirmed: {country?.NewConfirmed}
                                                            </p>
                                                            <p className='map-tooltip__info'>
                                                                Total deaths: {country?.TotalDeaths}
                                                            </p>
                                                            <p className='map-tooltip__info'>
                                                                New deaths: {country?.NewDeaths}
                                                            </p>
                                                        </div>
                                                    );
                                                }}
                                                onMouseLeave={() => {
                                                    setTooltipContent('');
                                                }}
                                                style={{
                                                    hover: {
                                                        fill: highlightColor,
                                                        outline: 'none'
                                                    }
                                                }}
                                            />
                                        </Link>
                                    );
                                })
                            }
                        </Geographies>
                    )}
                </ZoomableGroup>
            </ComposableMap>
        </>
    );
};
