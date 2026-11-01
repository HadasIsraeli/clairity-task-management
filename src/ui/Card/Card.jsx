import { C } from '../../styles/tokens';

/**
 * Base surface used throughout the app. `padding` maps to the existing
 * `.card-padding` / `.card-content` utility classes so spacing stays
 * consistent without every caller hand-rolling inline padding.
 */
export function Card({ children, className = '', style, glow, padding, as: Tag = 'div', ...props }) {
    const paddingClass = padding === 'lg' ? 'card-padding' : padding === 'md' ? 'card-content' : '';
    const classes = ['card', glow ? 'panel--glow' : '', paddingClass, className].filter(Boolean).join(' ');
    return (
        <Tag className={classes} style={{ ...(glow ? { '--glow': glow } : {}), ...style }} {...props}>
            {children}
        </Tag>
    );
}

// Re-exported so callers that only need the palette don't need a second import.
export { C };
