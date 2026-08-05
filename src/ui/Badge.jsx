import { TONE } from './tokens';

/**
 * Pill-shaped status/tag label. Accepts either a semantic `tone` (matches
 * the app's palette names — teal, indigo, green, red, yellow, orange,
 * neutral) or a raw `color`/`dim` pair for one-off values pulled from data
 * (e.g. per-tag colors in data/tasks.js).
 */
export function Badge({ label, tone, color, dim, size = 'md', children }) {
    const resolved = tone ? TONE[tone] || TONE.neutral : { color: color || TONE.neutral.color, dim };
    const bg = resolved.dim || (resolved.color ? `${resolved.color}18` : undefined);
    const classes = ['badge', 'badge--pill', size === 'sm' ? 'badge--small' : ''].filter(Boolean).join(' ');
    return (
        <span className={classes} style={{ background: bg, color: resolved.color, borderColor: `${resolved.color}28` }}>
            {children || label}
        </span>
    );
}
