import { TONE } from '../styles/tokens';

/**
 * Pill-shaped status/tag label (Figma "tags": 10px bold, 9% fill, 16% stroke).
 * Accepts either a semantic `tone` (teal, indigo, green, red, yellow, orange,
 * neutral) or a raw 6-digit hex `color` for per-tag colors coming from data.
 */
export function Badge({ label, tone, color, size = 'md', children }) {
    const resolved = tone
        ? TONE[tone] || TONE.neutral
        : {
              color: color || TONE.neutral.color,
              fill: `${color || TONE.neutral.color}18`,
              stroke: `${color || TONE.neutral.color}28`,
          };
    const classes = ['badge', 'badge--pill', size === 'sm' ? 'badge--small' : ''].filter(Boolean).join(' ');
    return (
        <span className={classes} style={{ background: resolved.fill, color: resolved.color, borderColor: resolved.stroke }}>
            {children || label}
        </span>
    );
}
