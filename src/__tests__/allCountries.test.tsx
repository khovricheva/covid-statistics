import React from 'react';
import { render, screen } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { AllCountries } from '../modules/allCountries';
import '@testing-library/jest-dom';

test('AllCountries test', async () => {
    render(<AllCountries />);

    const loader = screen.queryByTestId('loading');
    const header = screen.getByRole('heading', { level: 2 });
    const title = screen.getByRole('heading', { level: 3 });
    const input = screen.getByPlaceholderText('Search country');

    expect(loader).toBeNull();

    expect(header).toBeInTheDocument();
    screen.getByText(/Statistics/i);

    expect(title).toBeInTheDocument();
    screen.getByText(/Global cases/i);

    expect(input).toBeInTheDocument();
    await userEvent.type(input, 'ukraine');
    expect(input).toHaveValue('ukraine');
    await userEvent.clear(input);

    screen.getByText(/Country/i);
    screen.getByText(/Confirmed/i);
    screen.getByText(/Recovered/i);
    screen.getByText(/Deaths/i);
});
