import { useState } from 'react';

export function Tooltip({ text, children }) {
    const [show, setShow] = useState(false);
    return (
        <span
            className="tooltip-wrapper"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show && <span className="tooltip">{text}</span>}
        </span>
    );
}
