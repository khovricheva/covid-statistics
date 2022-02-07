import React from 'react';
import Calendar from 'react-calendar';
import { transformDate } from '../../../utils/data-utils';
import 'react-calendar/dist/Calendar.css';
import './CalendarComponent.scss';

type Props = {
    date: Date | Date[];
    setDate: (date: Date) => void;
};
export const CalendarComponent = ({ date, setDate }: Props) => {
    const firstDayPandemic = new Date('21 January 2020 00:00 UTC');
    const today = new Date();

    return (
        <div className='calendar__container'>
            <Calendar
                onChange={setDate}
                value={date}
                selectRange={true}
                allowPartialRange={true}
                minDate={firstDayPandemic}
                maxDate={today}
            />
            <div className='calendar__date-info'>
                <h3 className='calendar__period'>
                    Period:{' '}
                    {!Array.isArray(date)
                        ? transformDate(date)
                        : transformDate(date[0]) === transformDate(date[1])
                        ? transformDate(date[0])
                        : date.map((item: Date) => transformDate(item)).join(' - ')}
                </h3>
            </div>
        </div>
    );
};
