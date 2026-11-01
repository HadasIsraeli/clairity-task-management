import PropTypes from 'prop-types';
import styles from './ActionButton.module.css';

/**
 * Figma "task action buttons": the CTA at the bottom of a Suggested Action card.
 * `primary` (teal) is used on the recommended option, `neutral` on the others.
 */
export function ActionButton({ children, variant = 'primary', fullWidth = false, type = 'button', ...props }) {
    const classes = [styles.btn, styles[variant], fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ');
    return (
        <button type={type} className={classes} {...props}>
            {children}
        </button>
    );
}

ActionButton.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'neutral']),
    fullWidth: PropTypes.bool,
    type: PropTypes.string,
};
