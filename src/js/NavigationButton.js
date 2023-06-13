import React from 'react'


export default function NavigationButton({
    text,
    visible,
    disabled = false,
    onClick,
}) {
  return (
    <div
        className="col-1"
        style={{
            visibility: visible ? "visible" : "hidden"
        }}
    >
        <button
            type='button'
            className="navigation-button py-2 px-4"
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    </div>
  )
}
