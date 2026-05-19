import { C } from '../constants/theme';

export function Card({ children, className = '', style, glow }) {
    const classes = ['card', glow ? 'panel--glow' : '', className].filter(Boolean).join(' ');
    return (
        <div className={classes} style={{ ...(glow ? { '--glow': glow } : {}), ...style }}>
            {children}
        </div>
    );
}