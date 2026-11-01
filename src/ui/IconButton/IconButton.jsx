/**
 * Small square icon-only button (close buttons, send buttons, toolbar
 * actions). `icon` is a Tabler icon suffix, e.g. "x", "send", "chevron-right".
 */
export function IconButton({ icon, label, active = true, className = '', style, ...props }) {
    const classes = ['icon-button', className].filter(Boolean).join(' ');
    return (
        <button
            className={classes}
            aria-label={label}
            style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                border: 'none',
                outline: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: active ? 'pointer' : 'default',
                background: active ? 'var(--clr-indigo)' : 'rgba(255,255,255,0.05)',
                transition: 'background 0.2s',
                ...style,
            }}
            {...props}
        >
            <i className={`ti ti-${icon}`} style={{ fontSize: 15, color: active ? '#fff' : 'var(--clr-text-ter)' }} aria-hidden="true" />
        </button>
    );
}
