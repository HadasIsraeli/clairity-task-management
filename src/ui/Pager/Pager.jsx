import PropTypes from 'prop-types';
import styles from './Pager.module.css';

/**
 * "< 1/3 >" pager used by the Suggested Actions carousel. `page` is 1-based.
 * The arrow at either end is dimmed (50%) and disabled, as in the Figma variants.
 */
export function Pager({ page, total, onPrev, onNext }) {
    return (
        <div className={styles.pager} role="group" aria-label="Pagination">
            <button type="button" className={styles.arrow} onClick={onPrev} disabled={page <= 1} aria-label="Previous option">
                {'<'}
            </button>
            <span aria-live="polite">{`${page}/${total}`}</span>
            <button type="button" className={styles.arrow} onClick={onNext} disabled={page >= total} aria-label="Next option">
                {'>'}
            </button>
        </div>
    );
}

Pager.propTypes = {
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
};
