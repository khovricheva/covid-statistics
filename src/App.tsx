import React, { Suspense } from 'react';
import { AllCountries } from './modules/allCountries';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Country } from './modules/country';
import { Loader } from './components/Loader';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.scss';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Suspense fallback={<Loader />}>
                            <AllCountries />
                        </Suspense>
                    }
                />
                <Route
                    path='/:name'
                    element={
                        <Suspense fallback={<Loader />}>
                            <Country />
                        </Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
