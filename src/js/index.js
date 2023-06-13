// simpel react component

import React from 'react';
import { createRoot } from 'react-dom/client';

import { CalculatorProvider } from './CalculatorContext.js';

import { Calculator } from './Calculator.js';


const root = createRoot(document.querySelector('#calc'));
root.render(
    <CalculatorProvider>
        <Calculator />
    </CalculatorProvider>
);
