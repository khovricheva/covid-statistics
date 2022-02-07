import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart } from './LineChart';
import { CalendarComponent } from './CalendarComponent';
import { ErrorBoundary } from '../../errorBoundary';
import './Country.scss';

export const Country = () => {
    const today = new Date();
    const countryName = useParams();
    const [date, setDate] = useState<Date | Date[]>(today);

    return (
        <ErrorBoundary moduleName='country'>
            <div className='country'>
                <div className='country__info'>
                    <h2 className='country__name'>{countryName.name}</h2>
                    <div className='chart__container'>
                        <LineChart date={date} country={countryName.name as string} />
                    </div>
                </div>
                <CalendarComponent date={date} setDate={setDate} />
            </div>
        </ErrorBoundary>
    );
};
