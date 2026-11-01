import PropTypes from 'prop-types';
import { Badge } from '../../ui/Badge';
import { BreakTimer } from '../../components/BreakTimer';
import { DeliveryConfidence } from '../../components/DeliveryConfidence';
import { ScheduleCard } from '../../components/ScheduleCard';
import { SprintBrief } from '../../components/SprintBrief';
import { StatusDonut } from '../../components/StatusDonut';
import { TeamStatusList } from '../../components/TeamStatusList';
import { ALL_TASKS, SPRINT } from '../../data/fixtures/tasks';
import { useSession } from '../../state/SessionContext';
import styles from './Dashboard.module.css';

// Sprint 24's own tasks only — tasks owned by other teams (e.g. TM-107) are excluded.
const STATUS_KEYS = { Blocked: 'blocked', 'To Do': 'todo', Done: 'done', 'In Progress': 'inProgress' };
const countByStatus = () =>
    ALL_TASKS.filter((task) => !task.external).reduce(
        (counts, task) => ({ ...counts, [STATUS_KEYS[task.status]]: counts[STATUS_KEYS[task.status]] + 1 }),
        { blocked: 0, todo: 0, done: 0, inProgress: 0 },
    );

/**
 * Dashboard screen section (Figma "dashboard 52% / 69% / 72%").
 * The delivery-confidence score and the brief copy follow the session phase:
 * entry = 52%, in-progress = 69%, complete = 72%.
 */
export function Dashboard({ onOpen }) {
    const { sessionPhase } = useSession();

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.heading}>
                    <h1 className={styles.title}>{SPRINT.name}</h1>
                    <p className={styles.dates}>{SPRINT.dates}</p>
                </div>
                <div className={styles.tags}>
                    <Badge label={`${SPRINT.daysLeft}d left`} tone="yellow" status />
                    <Badge label="Active sprint" tone="green" />
                </div>
            </header>

            <div className={styles.topRow}>
                <SprintBrief phase={sessionPhase} onReview={onOpen} />
                <StatusDonut counts={countByStatus()} />
            </div>

            <div className={styles.mainRow}>
                <DeliveryConfidence phase={sessionPhase} />
                <ScheduleCard />
                <div className={styles.side}>
                    <BreakTimer />
                    <TeamStatusList />
                </div>
            </div>
        </div>
    );
}

Dashboard.propTypes = {
    onOpen: PropTypes.func,
};
