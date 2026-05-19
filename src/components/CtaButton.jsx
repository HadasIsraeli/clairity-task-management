import { C, F } from '../constants/theme';

export function CtaButton({ label, recommended, className = '', ...props }) {
    const classes = ['button', recommended ? 'button--recommended' : '', className].filter(Boolean).join(' ');
    return (
        <button {...props} className={classes} style={{ fontFamily: F, borderColor: recommended ? C.teal : undefined, color: recommended ? C.teal : undefined }}>
            {label} →
        </button>
    );
}