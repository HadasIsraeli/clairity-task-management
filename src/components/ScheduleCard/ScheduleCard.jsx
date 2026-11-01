import PropTypes from 'prop-types';
import { Panel } from '../../ui/Panel';
import { SCHEDULE, SCHEDULE_DATE, SCHEDULE_HOURS } from '../../data/fixtures/dashboard';
import styles from './ScheduleCard.module.css';

// Figma timeline: the 9:00 event sits 30px from the top and each hour adds 37px.
const ORIGIN_MINUTES = 9 * 60;
const ORIGIN_TOP = 30;
const PX_PER_HOUR = 37;
const GUIDE_COUNT = 12;
const GUIDE_FIRST = 8;
const GUIDE_STEP = 28;

const toMinutes = (time) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
};
const topFor = (time) => ORIGIN_TOP + ((toMinutes(time) - ORIGIN_MINUTES) / 60) * PX_PER_HOUR;

/** "Today's Schedule" card — an hourly timeline of today's meetings (Figma "calendar"). */
export function ScheduleCard({ events = SCHEDULE, date = SCHEDULE_DATE, className = '' }) {
    return (
        <Panel padded className={[styles.card, className].filter(Boolean).join(' ')} aria-labelledby="schedule-title">
            <header className={styles.header}>
                <h2 id="schedule-title" className={styles.title}>
                    Today&apos;s Schedule
                </h2>
                <p className={styles.date}>{date}</p>
            </header>

            <div className={styles.timeline}>
                <ol className={styles.gutter} aria-hidden="true">
                    {SCHEDULE_HOURS.map((hour) => (
                        <li key={hour} className={styles.hour}>
                            {hour}
                        </li>
                    ))}
                </ol>

                <ul className={styles.track}>
                    {Array.from({ length: GUIDE_COUNT }, (_, i) => (
                        <li key={i} className={styles.guide} style={{ top: GUIDE_FIRST + i * GUIDE_STEP }} aria-hidden="true" />
                    ))}
                    {events.map((event) => (
                        <li
                            key={event.id}
                            className={[styles.event, styles[event.state], event.faded ? styles.faded : ''].filter(Boolean).join(' ')}
                            style={{ top: topFor(event.time) }}
                            aria-current={event.state === 'now' ? 'time' : undefined}
                        >
                            <span className={styles.what}>
                                <span className={`${styles.bar} ${styles[`bar_${event.bar}`]}`}>|</span>
                                <span className={styles.time}>{event.time}</span>
                                <span className={styles.name}>{event.title}</span>
                            </span>
                            {(event.state === 'ended' || event.state === 'now') && (
                                <span className={styles.status}>{event.state === 'now' ? 'now' : 'ended'}</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </Panel>
    );
}

ScheduleCard.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            state: PropTypes.oneOf(['ended', 'now', 'later']).isRequired,
            bar: PropTypes.oneOf(['neutral', 'orange', 'red', 'teal']),
            faded: PropTypes.bool,
        }),
    ),
    date: PropTypes.string,
    className: PropTypes.string,
};
