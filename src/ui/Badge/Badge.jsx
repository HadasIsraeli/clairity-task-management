import PropTypes from 'prop-types';
import styles from './Badge.module.css';

const TONES = ['teal', 'indigo', 'green', 'red', 'yellow', 'orange', 'neutral'];

/**
 * Pill tag (Figma "tags": 17px, 10px bold, 9% fill, 16% stroke).
 * Use `tone` for the semantic palette. Use `color` (6-digit hex) only for
 * data-driven colors such as per-category tags. `soft` selects the dimmer text
 * Figma uses on Suggested Actions tags (High / Medium impact, Recommended).
 * `size` is accepted for backwards compatibility and has no effect.
 */
export function Badge({ label, tone, color, soft = false, children }) {
    const classes = [styles.tag, tone ? styles[tone] : '', soft ? styles.soft : ''].filter(Boolean).join(' ');
    const dataStyle = !tone && color ? { '--tag-fill': `${color}18`, '--tag-stroke': `${color}28`, '--tag-text': color } : undefined;
    return (
        <span className={classes} style={dataStyle}>
            {children ?? label}
        </span>
    );
}

Badge.propTypes = {
    label: PropTypes.node,
    tone: PropTypes.oneOf(TONES),
    color: PropTypes.string,
    soft: PropTypes.bool,
    children: PropTypes.node,
};
