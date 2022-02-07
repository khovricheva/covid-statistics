import React from 'react';
import { render, screen } from '../utils/test-utils';
import { Country } from '../modules/country';
import '@testing-library/jest-dom';

test('AllCountries test', async () => {
    render(<Country />);

    const loader = screen.queryByTestId('loading');
    const header = screen.getByRole('heading', { level: 2 });

    expect(loader).toBeNull();
    expect(header).toBeInTheDocument();

    expect(screen.getByTitle(/Monday/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Tuesday/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Wednesday/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Thursday/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Friday/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Saturday/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Sunday/i)).toBeInTheDocument();
});
