import React, { createContext, useState, useMemo, useCallback } from "react";

const CalculatorContext = createContext(null);

export function CalculatorProvider({ children })  {

    // Step 1
    const [totalYearkWhm2, setTotalYearkWhm2] = useState(null);
    const [deductsVAT, setDeductsVAT] = useState(null);


    // Step 2
    const [yearlyEnergyConsumptionkWh, setYearlyEnergyConsumptionkWh] = useState(null);
    const [averagegYearlykWhCostBrutto, setAveragegYearlykWhCostBrutto] = useState(null);

    const yearlyEnergyCostBrutto = () => {
        if (yearlyEnergyConsumptionkWh === null || averagegYearlykWhCostBrutto === null) {
            return null;
        } else {
            return (yearlyEnergyConsumptionkWh * averagegYearlykWhCostBrutto).toFixed(2);
        }
    };


    // Step 3
    const [numberOfPanels, setNumberOfPanels] = useState(null);

    const instalationPeakPower = useCallback(_numberOfPanels => {
        if (_numberOfPanels === null || totalYearkWhm2 === null) {
            return null;
        }

        return (
            _numberOfPanels * 0.385 * Math.min(totalYearkWhm2, 1000) / 1000
        ).toFixed(2);
    }, [totalYearkWhm2]);

    const suggestedNumberOfPanels = useMemo(() => {
        if (yearlyEnergyConsumptionkWh === null) {
            return null;
        }

        for (let panels = 1; panels < 100; panels++) {
            if (instalationPeakPower(panels) * 1000 >= yearlyEnergyConsumptionkWh) {
                return panels;
            }
        }
    }, [yearlyEnergyConsumptionkWh])


    // Step 4
    const totalInstalationCost = useMemo(() => {
        if (numberOfPanels === null || deductsVAT === null) return null;

        return (numberOfPanels * 1292 + 4973) * (deductsVAT ? 0.77 : 1);
    }, [numberOfPanels, deductsVAT])


    const contextValue = {
        totalYearkWhm2, setTotalYearkWhm2,
        deductsVAT, setDeductsVAT,
        yearlyEnergyConsumptionkWh, setYearlyEnergyConsumptionkWh,
        averagegYearlykWhCostBrutto, setAveragegYearlykWhCostBrutto,
        yearlyEnergyCostBrutto,
        numberOfPanels, setNumberOfPanels,
        instalationPeakPower,
        suggestedNumberOfPanels,
        totalInstalationCost,
    };

    return (
        <CalculatorContext.Provider value={contextValue}>
            {children}
        </CalculatorContext.Provider>
    );
};

export default CalculatorContext;
