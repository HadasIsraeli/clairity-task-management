export function Pill({ label, color, dim, small }) {
    const classes = ['badge', 'badge--pill', small ? 'badge--small' : ''].filter(Boolean).join(' ');
    return (
        <span className={classes} style={{ background: dim || color + '18', color, borderColor: color + '28' }}>
            {label}
        </span>
    );
}