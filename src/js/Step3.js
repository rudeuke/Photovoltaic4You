import React, { useState, useEffect, useContext, useMemo } from 'react'

import CalculatorContext from "./CalculatorContext";


const INVERTER_TYPES = [
    {
        name: "1,0 kW, 1-fazowy",
        kW: 1.0,
    },
    {
        name: "2,0 kW, 1-fazowy",
        kW: 2.0,
    },
    {
        name: "3,0 kW, 1-fazowy",
        kW: 3.0,
    },
    {
        name: "3,0 kW, 3-fazowy",
        kW: 3.0,
    },
    {
        name: "5,0 kW, 3-fazowy",
        kW: 5.0,
    },
    {
        name: "6,0 kW, 3-fazowy",
        kW: 6.0,
    },
    {
        name: "8,0 kW, 3-fazowy",
        kW: 8.0,
    },
    {
        name: "10,0 kW, 3-fazowy",
        kW: 10.0,
    },
]


export default function Step3({
    visible,
    setCanProceed,
}) {

    const [wantToModifyInstalation, setWantToModifyInstalation] = useState("n")
    const [personalNumberOfPanels, setPersonalNumberOfPanels] = useState(0)
    const [inverterType, setInverterType] = useState("")

    const {
        suggestedNumberOfPanels,
        setNumberOfPanels,
        instalationPeakPower
    } = useContext(CalculatorContext)


    // Update number of panels when user makes changes
    useEffect(() => {
        if (wantToModifyInstalation == "y") {
            setNumberOfPanels(personalNumberOfPanels)
        } else {
            setNumberOfPanels(suggestedNumberOfPanels)
        }
    }, [wantToModifyInstalation, personalNumberOfPanels, suggestedNumberOfPanels])


    // Update target instalaion peak power
    const targetInstalationPeakPower = useMemo(() => {
        if (wantToModifyInstalation == "y") {
            return instalationPeakPower(personalNumberOfPanels)
        } else {
            return instalationPeakPower(suggestedNumberOfPanels)
        }
    }, [wantToModifyInstalation, personalNumberOfPanels, suggestedNumberOfPanels])


    // Update possible inverter types when
    const possibleInverterTypes = useMemo(() => {
        return INVERTER_TYPES.filter(inverterType => inverterType.kW >= targetInstalationPeakPower)
    }, [targetInstalationPeakPower])

    // Enable and disable "Dalej" button
    useEffect(() => {
        setCanProceed(true)
    }, [visible])


    return (
        <div
            id="installation-tab"
            style={{
                display: visible ? "block" : "none",
            }}
        >
            <div className="container">
                <div className="row d-flex justify-content-between">
                    <div className="col-md-8 col-sm-12">
                        <div className="form-group">
                            <div className="row py-3">
                                <label className="col-sm-6 d-flex align-items-center justify-content-end control-label text-end">
                                    Czy chcesz zmodyfikować dobraną instalację?:
                                </label>
                                <div className="col-sm-6">
                                    <div className="input-group">
                                        <select
                                            className="form-control grey"
                                            name="adjustInstallation"
                                            value={wantToModifyInstalation}
                                            onChange={(e) => setWantToModifyInstalation(e.target.value)}
                                        >
                                            <option value="n">nie</option>
                                            <option value="y">tak</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {
                                wantToModifyInstalation === "y" &&
                                <>
                                    <div className="row py-3">
                                        <label className="col-sm-6 d-flex align-items-center justify-content-end control-label text-end">
                                            Ilość paneli:
                                        </label>
                                        <div className="col-sm-6">
                                            <div className="input-group">
                                                <input
                                                    name="panelQuantity"
                                                    type="number"
                                                    min="1"
                                                    max="30"
                                                    step="1"
                                                    placeholder="-"
                                                    className="form-control grey"
                                                    value={personalNumberOfPanels}
                                                    onChange={(e) => {
                                                        if (e.target.value === "") {
                                                            setPersonalNumberOfPanels(0)
                                                            return;
                                                        }

                                                        if (e.target.value >= 1 && e.target.value <= 30) {
                                                            setPersonalNumberOfPanels(e.target.value)
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row py-3">
                                        <label className="col-sm-6 d-flex align-items-center justify-content-end control-label text-end">
                                            Typ inwertera:
                                        </label>
                                        <div className="col-sm-6">
                                            <div className="input-control">
                                                <select
                                                    className="form-control grey"
                                                    name="inverterType"
                                                    value={inverterType}
                                                    onChange={(e) => setInverterType(e.target.value)}
                                                >
                                                    {possibleInverterTypes.map((inverterType) => {
                                                         return <option
                                                            value={inverterType.name}
                                                            key={inverterType.name}
                                                        >{inverterType.name}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 p-3 px-2">
                        { wantToModifyInstalation === "n" ?
                            <div className="p-3 text-end grey info">
                                <div className="py-3">
                                    <h6>
                                        <b>Ilość paneli:</b>
                                    </h6>
                                    <h6>
                                        {suggestedNumberOfPanels ?? "-"}<small> szt.</small>
                                    </h6>
                                </div>
                                <div className="py-3">
                                    <h6>
                                        <b>Moc szczytowa instalacji:</b>
                                    </h6>
                                    <h6>{instalationPeakPower(suggestedNumberOfPanels) ?? "-"}<small> kWp</small></h6>
                                </div>
                            </div>
                            :
                            <div className="p-3 text-end grey info">
                                <div className="row py-2 align-items-center">
                                    <div className="col-6 text-center">
                                        <h5><b>Nasza propozycja</b></h5>
                                    </div>
                                    <div className="col-6 text-center">
                                        <h5><b>Twój dobór</b></h5>
                                    </div>
                                </div>
                                <div className="py-3">
                                    <div className="row text-center">
                                        <h6><b>Ilość paneli:</b></h6>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-6 text-center">
                                            <h6>{suggestedNumberOfPanels ?? "-"}<small> szt.</small></h6>
                                        </div>
                                        <div className="col-6 text-center">
                                            <h6>{personalNumberOfPanels ?? "-"}<small> szt.</small></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3">
                                    <div className="row text-center">
                                        <h6><b>Moc szczytowa instalacji:</b></h6>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-6 text-center">
                                            <h6>{instalationPeakPower(suggestedNumberOfPanels) ?? "-"}<small> kWp</small></h6>
                                        </div>
                                        <div className="col-6 text-center">
                                            <h6>{instalationPeakPower(personalNumberOfPanels) ?? "-"}<small> kWp</small></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
  )
}
