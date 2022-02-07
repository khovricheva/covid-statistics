import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { MapChart } from './MapChart';

function Map() {
    const [content, setContent] = useState<React.ReactNode | string>('');

    return (
        <>
            <MapChart setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
        </>
    );
}

export default Map;
