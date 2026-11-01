import PropTypes from 'prop-types';
import styles from './Avatar.module.css';

/**
 * Person avatar. Pass `src` for a photo (Figma frames use photos), or
 * `initials` + `color` as the fallback. `presence` adds the status dot
 * (green = available, yellow = busy / in a meeting, red = unavailable).
 */
export function Avatar({ src, initials, color, size = 28, presence, alt = '' }) {
    return (
        <span className={styles.avatar} style={{ width: size, height: size }}>
            {src ? (
                <img src={src} alt={alt} className={styles.photo} />
            ) : (
                <span
                    className={styles.initials}
                    style={{ background: `${color}22`, border: `1.5px solid ${color}44`, fontSize: size * 0.32, color }}
                >
                    {initials}
                </span>
            )}
            {presence && <span className={`${styles.presence} ${styles[presence]}`} aria-hidden="true" />}
        </span>
    );
}

Avatar.propTypes = {
    src: PropTypes.string,
    initials: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    presence: PropTypes.oneOf(['green', 'yellow', 'red']),
    alt: PropTypes.string,
};
