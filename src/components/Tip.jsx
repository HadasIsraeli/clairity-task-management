import { C } from '../constants/theme';
import { useState } from "react";

export function Tip({ text, children }) {
    const [show, setShow] = useState(false);
    return (
        <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
            onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            {show && (
                <span style={{
                    position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
                    transform: "translateX(-50%)", background: "#1C2840", color: C.textSec,
                    fontSize: 13, padding: "7px 12px", borderRadius: 8, whiteSpace: "normal",
                    zIndex: 50, maxWidth: 220, lineHeight: 1.55, border: `1px solid ${C.borderMid}`,
                    textAlign: "center", pointerEvents: "none"
                }}>
                    {text}
                </span>
            )}
        </span>
    );
}