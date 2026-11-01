import PropTypes from 'prop-types';
import styles from './Panel.module.css';

/**
 * Dashboard surface (Figma: Black/Background 60%, 8px radius, panel shadow).
 * `tone="brief"` is the violet AI surface used by the Sprint Brief.
 */
export function Panel({ as: Tag = 'section', tone, padded = false, className = '', children, ...props }) {
    const classes = [styles.panel, tone === 'brief' ? styles.brief : '', padded ? styles.padded : '', className].filter(Boolean).join(' ');
    return (
        <Tag className={classes} {...props}>
            {children}
        </Tag>
    );
}

Panel.propTypes = {
    as: PropTypes.elementType,
    tone: PropTypes.oneOf(['brief']),
    padded: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};
