import React, { useState, useEffect, useContext, useRef } from 'react'

import CalculatorContext from "./CalculatorContext";


const yearlyEnergyConsumptionForPeople = (peopleCount) => {
    switch (peopleCount) {
        case 0:
            return null;
        case 1:
            return 1050;
        default:
            return 1050 + 750 * (peopleCount - 1);
    }
}


export default function Step2({
    visible,
    setCanProceed,
}) {

    const [energyConsumptionDeclareMethod, setEnergyConsumptionDeclareMethod] = useState("")

    const [monthsOnRecipe, setMonthsOnRecipe] = useState("")
    const [usedkWhInTimePeriod, setUsedkWhInTimePeriod] = useState(0)
    const [bruttoCostOnRecipe, setBruttoCostOnRecipe] = useState(0)

    const [peopleCount, setPeopleCount] = useState(0)

    const {
        yearlyEnergyConsumptionkWh, setYearlyEnergyConsumptionkWh,
        averagegYearlykWhCostBrutto, setAveragegYearlykWhCostBrutto,
        yearlyEnergyCostBrutto
    } = useContext(CalculatorContext);

    useEffect(() => {
        effect: {
            switch (energyConsumptionDeclareMethod) {
                case "byEnergyUsageBill":
                    if (monthsOnRecipe === "" || !parseFloat(usedkWhInTimePeriod) > 0 || !parseFloat(bruttoCostOnRecipe) > 0) {
                        setYearlyEnergyConsumptionkWh(null)
                        setAveragegYearlykWhCostBrutto(null)
                        break effect;
                    };

                    const months = parseInt(monthsOnRecipe);
                    setYearlyEnergyConsumptionkWh((12 / months * usedkWhInTimePeriod).toFixed(2))
                    setAveragegYearlykWhCostBrutto((bruttoCostOnRecipe / usedkWhInTimePeriod).toFixed(2))
                    break effect;
                case "byPeopleCount":
                    setYearlyEnergyConsumptionkWh(
                        yearlyEnergyConsumptionForPeople(peopleCount)
                    )
                    setAveragegYearlykWhCostBrutto(0.86)
                    break effect;
                default:
                    setYearlyEnergyConsumptionkWh(null)
            }
        }
    }, [
        energyConsumptionDeclareMethod,
        monthsOnRecipe, usedkWhInTimePeriod, bruttoCostOnRecipe,
        peopleCount
    ])

    useEffect(() => {
        if (visible) {
            switch (energyConsumptionDeclareMethod) {
                case "byEnergyUsageBill":
                    setCanProceed(monthsOnRecipe !== "" && usedkWhInTimePeriod > 0 && bruttoCostOnRecipe > 0)
                    break;
                case "byPeopleCount":
                    setCanProceed(peopleCount > 0)
                    break;
                default:
                    setCanProceed(false)
            }
        }
    }, [visible, energyConsumptionDeclareMethod, monthsOnRecipe, usedkWhInTimePeriod, bruttoCostOnRecipe, peopleCount])

    return (
        <div
            id="energy-tab"
            className="container"
            style={{
                display: visible ? "block" : "none",
            }}
        >
            <div className="row d-flex justify-content-between">
                <div className="col-md-8 col-sm-12">
                    <div className="form-group">
                        <div className="row py-3">
                            <label className="col-sm-6 d-flex align-items-center justify-content-end control-label text-end">
                                Sposób podania zużycia energii:
                            </label>
                            <div className="col-sm-6">
                                <div className="input-group">
                                    <select
                                        className="form-control grey"
                                        name="countByType"
                                        value={energyConsumptionDeclareMethod}
                                        onChange={(e) => setEnergyConsumptionDeclareMethod(e.target.value)}
                                    >
                                        <option value="">wybierz</option>
                                        <option value="byEnergyUsageBill">Rachunek za energię elektryczną</option>
                                        <option value="byPeopleCount">Liczba mieszkańców budynku</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        { energyConsumptionDeclareMethod === "byEnergyUsageBill" &&
                            <>
                                <div className="row py-3">
                                    <label className="col-sm-6 d-flex align-items-center justify-content-end control-label text-end">
                                        Okres jaki pokrywa rachunek za energię:
                                    </label>
                                    <div className="col-sm-6">
                                        <div className="input-control">
                                            <select
                                                className="form-control grey"
                                                name="energyPeriodUnit"
                                                value={monthsOnRecipe}
                                                onChange={(e) => setMonthsOnRecipe(e.target.value)}
                                            >
                                                <option value="" selected="selected">wybierz</option>
                                                <option value="1">miesiąc</option>
                                                <option value="2">dwa miesiące</option>
                                                <option value="12">rok</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row py-3">
                                    <label className="col-sm-6 d-flex align-items-center justify-content-end control-label text-end">
                                        Zużycie energii elektrycznej w wybranym okresie: (kWh)
                                    </label>
                                    <div className="col-sm-6">
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                min="1"
                                                max="10"
                                                step="0.1" placeholder="-"
                                                className="form-control grey"
                                                name="energyUsageInPeriod"
                                                value={usedkWhInTimePeriod}
                                                onChange={(e) => setUsedkWhInTimePeriod(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-info text-center">
                                        <small>
                                            Kreator został przygotowany dla instalacji do 10 kW. W celu uzyskania oferty na większe
                                            zapotrzebowanie skontaktuj się z działem fotowoltaiki.
                                        </small>
                                    </div>
                                </div>
                                <div className="row py-3">
                                    <label className="col-sm-6 d-flex align-items-center justify-content-end control-label text-end">
                                        Kwota brutto z rachunku w wybranym okresie: (zł)
                                    </label>
                                    <div className="col-sm-6">
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                min="25"
                                                max=""
                                                step="0.01"
                                                placeholder="-"
                                                className="form-control grey"
                                                name="energyCostInPeriod"
                                                value={bruttoCostOnRecipe}
                                                onChange={(e) => setBruttoCostOnRecipe(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        { energyConsumptionDeclareMethod === "byPeopleCount" &&
                            <>
                                <div className="row py-3">
                                    <label className="col-sm-6 d-flex align-items-center justify-content-end control-label text-end">
                                        Liczba mieszkańców budynku:
                                    </label>
                                    <div className="col-sm-6">
                                        <div className="input-group">
                                            <input
                                            type="number"
                                            min="1"
                                            max="15"
                                            placeholder="-"
                                            className="form-control grey"
                                            name="flatPeopleCount"
                                            value={peopleCount}
                                            onChange={(e) => setPeopleCount(e.target.value)}
                                         />
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="col-md-3 col-sm-12 p-3 px-2">
                    <div className="p-3 text-end grey info">
                        <div className="py-3">
                            <h6><b>Roczne zużycie energii:</b></h6>
                            <h6>{yearlyEnergyConsumptionkWh ?? "-"} <small>kWh</small></h6>
                        </div>
                        <div className="py-3">
                            <h6><b>Roczny koszt energii brutto:</b></h6>
                            <h6>{yearlyEnergyCostBrutto() ?? "-"} <small>zł</small></h6>
                        </div>
                        <div className="py-3">
                            <h6><b>Średni roczny koszt kWh brutto:</b></h6>
                            <h6>{averagegYearlykWhCostBrutto ?? "-"} <small>zł</small></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
