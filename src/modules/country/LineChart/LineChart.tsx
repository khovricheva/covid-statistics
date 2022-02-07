import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { transformDate, getPrevDay, getDiffs, getNextDay } from '../../../utils/data-utils';
import { loadCountryData } from '../../services/actions';
import { getCountryData } from '../../services/selectors';
import { Country } from '../../../typedef';

type Props = {
    date: Date | Date[];
    country: string;
};
export const LineChart = ({ date, country }: Props) => {
    const titles: string[] = ['Date', 'Confirmed', 'Deaths', 'Active', 'Recovered'];
    const [apiData, setApiData] = useState<Country[]>([]);
    const [chartData, setChartData] = useState([titles]);
    const dispatch = useAppDispatch();
    const countryData = useAppSelector((state) => getCountryData(state).countries);

    useEffect(() => {
        if (!countryData[country]) {
            dispatch(loadCountryData(country));
        }
    }, [country]);

    useEffect(() => {
        if (countryData[country]) {
            setApiData(countryData[country]);
        }
    }, [countryData]);

    useEffect(() => {
        const filteredData = apiData.slice(-2);
        setChartData((prev) => [
            ...prev,
            [
                transformDate(date as Date),
                ...getDiffs(filteredData, 'Confirmed'),
                ...getDiffs(filteredData, 'Deaths'),
                ...getDiffs(filteredData, 'Active'),
                ...getDiffs(filteredData, 'Recovered')
            ]
        ]);
    }, [apiData]);

    useEffect(() => {
        setChartData([titles]);
    }, [date]);

    useEffect(() => {
        if (Array.isArray(date)) {
            const [firstDay, lastDay] = date;

            if (date.length === 1) {
                const filteredData = apiData.filter((item) => new Date(item.Date) < new Date(firstDay)).slice(-2);

                setChartData((prev) => [
                    ...prev,
                    [
                        transformDate(date[0] as Date),
                        ...getDiffs(filteredData, 'Confirmed'),
                        ...getDiffs(filteredData, 'Deaths'),
                        ...getDiffs(filteredData, 'Active'),
                        ...getDiffs(filteredData, 'Recovered')
                    ]
                ]);
            } else {
                const filteredData = apiData.filter(
                    (item) =>
                        new Date(getPrevDay(lastDay, 1)) > new Date(item.Date) &&
                        new Date(item.Date) > new Date(getPrevDay(firstDay, 2))
                );

                if (filteredData.length === 2) {
                    setChartData((prev) => [
                        ...prev,
                        [
                            transformDate(firstDay as Date),
                            ...getDiffs(filteredData, 'Confirmed'),
                            ...getDiffs(filteredData, 'Deaths'),
                            ...getDiffs(filteredData, 'Active'),
                            ...getDiffs(filteredData, 'Recovered')
                        ]
                    ]);
                } else {
                    const confirmedDiffs = getDiffs(filteredData, 'Confirmed');
                    const deathsDiffs = getDiffs(filteredData, 'Deaths');
                    const activeDiffs = getDiffs(filteredData, 'Active');
                    const recoveredDiffs = getDiffs(filteredData, 'Recovered');

                    filteredData.forEach((item, index) => {
                        if (index !== filteredData.length - 1) {
                            return setChartData((prev) => [
                                ...prev,
                                [
                                    transformDate(getNextDay(new Date(item.Date), 2)),
                                    confirmedDiffs[index],
                                    deathsDiffs[index],
                                    activeDiffs[index],
                                    recoveredDiffs[index]
                                ]
                            ]);
                        }
                    });
                }
            }
        }
    }, [date]);

    const options = {
        chart: {
            title: 'Total Cases'
        }
    };

    return (
        <>
            <Chart
                chartType={date instanceof Date || chartData.length === 2 ? 'Bar' : 'Line'}
                width='100%'
                height='100%'
                data={chartData}
                options={options}
            />
        </>
    );
};
