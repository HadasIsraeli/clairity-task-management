import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ActionButton } from '../../ui/ActionButton';
import { Avatar } from '../../ui/Avatar';
import { Badge } from '../../ui/Badge';
import { Panel } from '../../ui/Panel';
import { BRIEF_STATES, BRIEF_TASKS } from '../../data/fixtures/dashboard';
import { PEOPLE } from '../../data/fixtures/people';
import sparkle from '../../assets/figma/brief-sparkle.svg';
import styles from './SprintBrief.module.css';

function BriefBody({ runs }) {
    return (
        <p className={styles.body}>
            {runs.map((run, i) => {
                if (typeof run === 'string') return <Fragment key={i}>{run}</Fragment>;
                if (run.br) return <br key={i} />;
                return (
                    <strong key={i} className={run.tone ? styles[run.tone] : undefined}>
                        {run.text}
                    </strong>
                );
            })}
        </p>
    );
}

/**
 * Clairity Sprint Brief. `phase` selects the copy (52% / 69% / 72% "Final").
 * `onReview(taskKey)` opens the task when "Review Options" is pressed.
 */
export function SprintBrief({ phase = 'entry', onReview, className = '' }) {
    const state = BRIEF_STATES[phase] ?? BRIEF_STATES.entry;

    return (
        <Panel tone="brief" className={[styles.brief, className].filter(Boolean).join(' ')} aria-labelledby="sprint-brief-label">
            <div className={styles.header}>
                <img src={sparkle} alt="" className={styles.icon} />
                <h2 id="sprint-brief-label" className={styles.label}>
                    Sprint Brief
                </h2>
            </div>

            <div className={styles.content}>
                <div className={styles.copy}>
                    <p className={styles.title}>{state.title}</p>
                    <BriefBody runs={state.body} />
                </div>

                <ul className={styles.rows}>
                    {state.rows.map((row, index) => {
                        const task = BRIEF_TASKS[row.task];
                        const person = PEOPLE[row.person];
                        return (
                            <li key={row.task} className={`${styles.row} ${index > 0 ? styles.rowAlt : ''}`}>
                                <div className={styles.task}>
                                    <Avatar src={person.photo} alt={person.name} size={22} />
                                    <span className={styles.taskTitle}>{task.title}</span>
                                    <span className={styles.taskId}>{task.id}</span>
                                    <Badge label={task.tag.label} tone={task.tag.tone} soft />
                                </div>
                                <div className={styles.actions}>
                                    {row.points && <span className={styles.points}>{row.points}</span>}
                                    {row.action === 'done' ? (
                                        <ActionButton variant="success">{row.doneLabel}</ActionButton>
                                    ) : (
                                        <ActionButton variant="ghost" onClick={() => onReview?.(task.taskKey)}>
                                            Review Options
                                        </ActionButton>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Panel>
    );
}

SprintBrief.propTypes = {
    phase: PropTypes.oneOf(['entry', 'in-progress', 'complete']),
    onReview: PropTypes.func,
    className: PropTypes.string,
};
