import React from 'react';
import { Audio } from 'react-loader-spinner';

export const Loader = () => {
    return <Audio height='100' width='100' color='#fde87a' data-testid='loading' />;
};
