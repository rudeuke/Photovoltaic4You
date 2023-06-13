import React, { useState, useContext, useMemo } from 'react'

import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import CalculatorContext from "./CalculatorContext";


const YEAR_LABELS = [
    '1 rok',
    '2 lata',
    '3 lata',
    '4 lata',
    '5 lat',
    '6 lat',
    '7 lat',
    '8 lat',
    '9 lat',
    '10 lat',
    '11 lat',
    '12 lat',
    '13 lat',
    '14 lat',
    '15 lat',
    '16 lat',
    '17 lat',
    '18 lat',
    '19 lat',
    '20 lat',
    '21 lat',
    '22 lata',
    '23 lata',
    '24 lata',
    '25 lat',
]


export default function Step4({
    visible,
}) {

    const [grantAmount, setGrantAmount] = useState(0)
    const [yearlyEnergyPriceIncrease, setYearlyEnergyPriceIncrease] = useState(5)

    const {
        totalInstalationCost,
        instalationPeakPower,
        numberOfPanels,
        totalYearkWhm2,
    } = useContext(CalculatorContext)


    const investmentAmount = useMemo(() => {
        if (totalInstalationCost === null || grantAmount === null) return null;

        return totalInstalationCost - grantAmount
    }, [totalInstalationCost, grantAmount])

    // In kWh, to be divided by 1000 to get MWh
    const totalYearlyEnergyProduction = useMemo(() => {
        return instalationPeakPower(numberOfPanels) * 0.9 * totalYearkWhm2
    }, [instalationPeakPower, numberOfPanels, totalYearkWhm2])

    const profitabilityChartData = useMemo(() => {

        const energyCostsPerYear = Array.from(Array(25).keys()).map((_, year) => {
            return 0.86 * totalYearlyEnergyProduction * (1 + yearlyEnergyPriceIncrease/100)**year
        })

        return {
            data: {
                labels: YEAR_LABELS,
                datasets: [
                    {
                        data: [...Array(25).keys()].map(() => investmentAmount),
                        borderColor: "#414141",
                        backgroundColor: "rgba(104, 104, 104, 0.2)",
                        fill: true,
                    },
                    {
                        data: Array.from(Array(25).keys()).map((_, year) => {
                            return energyCostsPerYear.slice(0, year+1).reduce((a, b) => a + b, 0)
                        }),
                        borderColor: "#1e5e41",
                        backgroundColor: "rgba(0, 105, 105, 0.50)",
                        fill: true,
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        ticks: {
                            callback: function(value, _, _) {
                                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " zł";
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                }
            }
        }
    }, [investmentAmount, yearlyEnergyPriceIncrease, totalYearlyEnergyProduction])

    const investmentReturnYears = useMemo(() => {
        for (let year = 0; year < 25; year++) {
            const investmentCostInYear = profitabilityChartData.data.datasets[0].data[year]
            const totalProducedEnergyValue = profitabilityChartData.data.datasets[1].data[year]

            if (investmentCostInYear < totalProducedEnergyValue) {
                return year+1
            }
        }
    }, [investmentAmount, profitabilityChartData])

    return (
        <div
            id="analyze-tab"
            style={{
                display: visible ? "block" : "none",
            }}
        >
            <div className="row d-flex justify-content-between">
                <div className="col-12">
                    <div className="financing-panel">
                        <div className="form-group">
                            <div className="row py-3">
                                <label className="col-sm-6 d-flex align-items-center justify-content-end control-label text-end">
                                    Kwota dofinansowania: (zł)
                                </label>
                                <div className="col-sm-6">
                                    <div className="input-group">
                                        <input
                                            className="form-control grey"
                                            name="dofinansowanieValue"
                                            type="number"
                                            min="0"
                                            max=""
                                            step="0.01"
                                            value={grantAmount}
                                            onChange={(e) => setGrantAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row py-3 d-flex justify-content-end">
                                <label className="col-sm-6 d-flex align-items-center justify-content-end control-label text-end">
                                    Roczny wzrost ceny energii:
                                </label>
                                <div className="col-sm-6">
                                    <strong>{yearlyEnergyPriceIncrease}</strong>
                                    <span>%</span>
                                </div>
                                <div className="py-1 col-sm-9">
                                    <input
                                        type="range"
                                        className="slider grey"
                                        min="0"
                                        max="15"
                                        step="1"
                                        value={yearlyEnergyPriceIncrease}
                                        onChange={(e) => setYearlyEnergyPriceIncrease(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="py-5 col-md-8 col-sm-12 analyze-summary-panel">
                    <div>
                        <h4>
                            <strong>Podsumowanie</strong>
                        </h4>
                    </div>
                    <table className="table border">
                        <tbody>
                            <tr>
                                <td className="text-center">
                                    Cena instalacji fotowoltaicznej wraz z montażem
                                </td>
                                <td>
                                    <strong>
                                        <span>{totalInstalationCost}</span>
                                        <span> zł</span>
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center">
                                    Wartość inwestycji w instalację PV
                                </td>
                                <td>
                                    <strong>
                                        <span>{investmentAmount}</span>
                                        <span> zł</span>
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center">
                                    Energia wytworzona przez instalację PV *
                                </td>
                                <td>
                                    <strong>
                                        <span>{(totalYearlyEnergyProduction*25/1000).toFixed(2)}</span>
                                        <span> MWh</span>
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center">
                                    Okres zwrotu inwestycji w instalację PV
                                </td>
                                <td>
                                    <strong>
                                        <span>{investmentReturnYears} lat</span>
                                    </strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        <small>
                            * dla 25 letniego objętego gwarancją okresu eksploatacji
                        </small>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="py-5 col-sm-10">
                    <h4>
                        <strong>Opłacalność</strong>
                    </h4>
                    <div id="chart" style={{
                        position: "relative",
                        width:"100%",
                        height:"100%"
                    }}>
                        <Line data={profitabilityChartData.data} options={profitabilityChartData.options}/>
                    </div>
                </div>
            </div>
        </div>
  )
}
