import PropTypes from 'prop-types';
import chevron from '../../assets/figma/shev.svg';
import styles from './ChevronToggle.module.css';

/** Expand / collapse chevron (Figma "shev"). Flips vertically when `expanded`. */
export function ChevronToggle({ expanded = false, label = 'Toggle details', onClick }) {
    return (
        <button
            type="button"
            className={[styles.toggle, expanded ? styles.open : ''].filter(Boolean).join(' ')}
            aria-expanded={expanded}
            aria-label={label}
            onClick={onClick}
        >
            <img src={chevron} alt="" className={styles.icon} />
        </button>
    );
}

ChevronToggle.propTypes = {
    expanded: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func,
};
