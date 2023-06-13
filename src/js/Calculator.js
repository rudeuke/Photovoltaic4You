import React, { useState } from 'react';

import StepButton from './StepButton';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import NavigationButton from './NavigationButton';


export function Calculator() {

    const [step, setStep] = useState(1);
    const [canProceed, setCanProceed] = useState(false);

    return (
        <form id="calc-form">
            <div className="container">
                <div className="row">
                    <StepButton active={step === 1}  onClick={() => setStep(1)} text="Dane użytkownika" />
                    <StepButton active={step === 2}  onClick={() => setStep(2)} text="Zużycie energii" />
                    <StepButton active={step === 3}  onClick={() => setStep(3)} text="Parametry instalacji" />
                    <StepButton active={step === 4}  onClick={() => setStep(4)} text="Analiza opłacalności" />
                </div>
            </div>
            <hr />
            <div className="tab-content">
                <Step1 visible={step === 1} setCanProceed={setCanProceed}/>
                <Step2 visible={step === 2} setCanProceed={setCanProceed}/>
                <Step3 visible={step === 3} setCanProceed={setCanProceed}/>
                <Step4 visible={step === 4}/>
            </div>
            <hr />
            <div className="row d-flex justify-content-around my-4">
                <NavigationButton
                    onClick={() => setStep(
                        (currentStep) => currentStep-1)
                    }
                    visible={step !== 1}
                    text="Cofnij"
                />
                <NavigationButton
                    onClick={() => setStep(
                        (currentStep) => currentStep+1)
                    }
                    visible={step !== 4}
                    disabled={!canProceed}
                    text="Dalej"
                />
            </div>
        </form>
    );
}
