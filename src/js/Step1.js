import React, { useState, useEffect, useContext, useRef } from 'react'

import CalculatorContext from "./CalculatorContext";

const REGIONS = [
    {
        name: `dolnośląskie`,
        totalYearkWhm2: 993,
    },
    {
        name: `kujawsko-pomorskie`,
        totalYearkWhm2: 857,
    },
    {
        name: `lubelskie`,
        totalYearkWhm2: 975,
    },
    {
        name: `lubuskie`,
        totalYearkWhm2: 830,
    },
    {
        name: `łódzkie`,
        totalYearkWhm2: 978,
    },
    {
        name: `małopolskie`,
        totalYearkWhm2: 1046,
    },
    {
        name: `mazowieckie`,
        totalYearkWhm2: 978,
    },
    {
        name: `opolskie`,
        totalYearkWhm2: 1014,
    },
    {
        name: `podkarpackie`,
        totalYearkWhm2: 1051,
    },
    {
        name: `podlaskie`,
        totalYearkWhm2: 897,
    },
    {
        name: `pomorskie`,
        totalYearkWhm2: 886,
    },
    {
        name: `śląskie`,
        totalYearkWhm2: 1020,
    },
    {
        name: `świętokrzyskie`,
        totalYearkWhm2: 982,
    },
    {
        name: `warmińsko-mazurskie`,
        totalYearkWhm2: 883,
    },
    {
        name: `wielkopolskie`,
        totalYearkWhm2: 961,
    },
    {
        name: `zachodniopomorskie`,
        totalYearkWhm2: 863,
    },
]


export default function Step1({
    visible,
    setCanProceed,
}) {

    const [region, setRegion] = useState("")
    const [userType, setUserType] = useState("")
    const [deductsVAT, setDeductsVAT] = useState("");

    const {
        setTotalYearkWhm2,
        setDeductsVAT: setDeductsVATContext
    } = useContext(CalculatorContext);


    useEffect(() => {
        setTotalYearkWhm2(
            REGIONS.find(r => r.name === region)?.totalYearkWhm2 || null
        )
    }, [region])

    useEffect(() => {
        switch (userType) {
            case "person":
                setDeductsVATContext(false)
                return
            case "company":
                setDeductsVATContext(deductsVAT === "y")
                return
        }
    }, [userType, deductsVAT])

    useEffect(() => {
        if (visible) {
            setCanProceed(
                region !== "" && (
                    userType === "person" || (
                        userType === "company" && deductsVAT !== ""
                    )
                )
            )
        }
    }, [visible, region, userType, deductsVAT])


    return (
    <div
        id="user-tab"
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
                            Województwo:
                        </label>
                        <div className="col-sm-6">
                            <div className="input-control">
                                <select
                                    className="form-control grey"
                                    name="region"
                                    value={region}
                                    onChange={e => setRegion(e.target.value)}
                                >
                                    <option value="">wybierz</option>
                                    {REGIONS.map(region => (
                                        <option key={region.name} value={region.name}>
                                            {region.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row py-3">
                        <label className="col-sm-6 d-flex align-items-center justify-content-end control-label text-end">
                            Typ użytkownika:
                        </label>
                        <div className="col-sm-6">
                            <div className="input-control">
                                <select
                                    className="form-control grey"
                                    name="clientType"
                                    value={userType}
                                    onChange={e => setUserType(e.target.value)}
                                >
                                    <option value="">wybierz</option>
                                    <option value="person">osoba fizyczna</option>
                                    <option value="company">przedsiębiorstwo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={
                    userType === "company" ? {} : {display: "none"}
                }>
                    <div className="row py-3">
                        <label className="col-sm-6 d-flex align-items-center justify-content-end control-label text-end">
                            Odliczam VAT od ceny zakupu instalacji fotowoltaicznej oraz kosztów energii elektrycznej:
                        </label>
                        <div className="col-sm-6">
                            <div className="input-control">
                                <select
                                    className="form-control grey"
                                    name="companyVatDeduct"
                                    value={deductsVAT}
                                    onChange={e => setDeductsVAT(e.target.value)}
                                >
                                    <option value="">wybierz</option>
                                    <option value="n">nie</option>
                                    <option value="y">tak</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3 col-sm-12 p-3 px-2">
                <div className="p-3 text-end grey info">
                    <div className="py-3">
                        <h6>
                            <b>Roczna suma energii promieniowania słonecznego:</b>
                        </h6>
                        <h6>
                            {
                                REGIONS.find(r => r.name === region)?.totalYearkWhm2 || "- "
                            }<small>kWh/m²</small>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
