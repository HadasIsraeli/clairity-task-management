import { C } from './tokens';

/**
 * Shared button. Replaces CtaButton and the various hand-rolled
 * `<button className="button button--…">` instances across features.
 *
 * variant: 'ghost' (default) | 'recommended' | 'solid'
 * tone: semantic color used for 'recommended'/'solid' variants (defaults to teal)
 * size: 'md' (default) | 'sm'
 * arrow: append a trailing "→" (matches the CTA style used in ClarityPanel)
 */
export function Button({
    children,
    label,
    variant = 'ghost',
    tone = C.teal,
    size = 'md',
    arrow = false,
    className = '',
    style,
    ...props
}) {
    const classes = [
        'button',
        variant === 'recommended' ? 'button--recommended' : '',
        variant === 'ghost' ? 'button--ghost' : '',
        size === 'sm' ? 'button--small' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const toneStyle =
        variant === 'recommended'
            ? { borderColor: tone, color: tone, background: `${tone}1A` }
            : variant === 'solid'
              ? { background: tone, color: '#fff', borderColor: tone }
              : undefined;

    return (
        <button className={classes} style={{ ...toneStyle, ...style }} {...props}>
            {children ?? label}
            {arrow ? ' →' : ''}
        </button>
    );
}
