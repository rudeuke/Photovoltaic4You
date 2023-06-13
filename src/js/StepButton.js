import React from 'react'


export default function StepButton({
    text,
    active,
    onClick,
}) {
  return (
    <div className="col-12 col-md px-0">
        <button
            type='button'
            className={`step-button ${active ? "step-button-active" : ""} text-white w-100 h-100 p-3`}
            onClick={onClick}
        >
            {text}
        </button>
    </div>
  )
}
