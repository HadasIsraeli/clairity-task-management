import PropTypes from 'prop-types';
import { DonutChart } from '../../ui/DonutChart';
import { Panel } from '../../ui/Panel';
import { C } from '../../styles/tokens';
import styles from './StatusDonut.module.css';

// Legend order and colors from Figma "pie-01": soft palette, ring drawn at 0.7 opacity.
const LEGEND = [
    { key: 'blocked', label: 'Blocked', color: C.redSoft, glow: C.red },
    { key: 'todo', label: 'To Do', color: C.textSec, glow: C.textTer },
    { key: 'done', label: 'Done', color: C.greenSoft, glow: C.green },
    { key: 'inProgress', label: 'In Progress', color: C.tealSoft, glow: C.teal },
];
// Ring order, clockwise from 12 o'clock.
const RING_ORDER = ['inProgress', 'blocked', 'todo', 'done'];

/**
 * Task-status doughnut with legend (Figma "pie-01"). `counts` is
 * { blocked, todo, done, inProgress }; the center shows the done percentage.
 */
export function StatusDonut({ counts, className = '' }) {
    const total = Object.values(counts).reduce((sum, n) => sum + n, 0) || 1;
    const donePct = Math.round((counts.done / total) * 100);
    const byKey = Object.fromEntries(LEGEND.map((item) => [item.key, item]));
    const segments = RING_ORDER.map((key) => ({ label: byKey[key].label, value: counts[key], color: byKey[key].color }));

    return (
        <Panel className={[styles.card, className].filter(Boolean).join(' ')} aria-label="Task status breakdown">
            <div className={styles.chart}>
                <DonutChart
                    segments={segments}
                    centerLabel={`${donePct}%`}
                    centerColor={C.greenSoft}
                    centerFontSize={24}
                    size={132}
                    thickness={20}
                    segmentGap={4}
                    opacity={0.7}
                    ariaLabel={`${donePct}% of tasks done`}
                />
            </div>
            <ul className={styles.legend}>
                {LEGEND.map((item) => (
                    <li key={item.key} className={styles.item}>
                        <span className={styles.dotWrap}>
                            <span className={styles.dot} style={{ background: item.color, boxShadow: `0 0 5px ${item.glow}` }} />
                        </span>
                        <span className={styles.label}>{item.label}</span>
                        <span className={styles.count}>{counts[item.key]}</span>
                    </li>
                ))}
            </ul>
        </Panel>
    );
}

StatusDonut.propTypes = {
    counts: PropTypes.shape({
        blocked: PropTypes.number.isRequired,
        todo: PropTypes.number.isRequired,
        done: PropTypes.number.isRequired,
        inProgress: PropTypes.number.isRequired,
    }).isRequired,
    className: PropTypes.string,
};
