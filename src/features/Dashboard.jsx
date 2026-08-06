import { ALL_TASKS, SPRINT, TAG_CLR, TASKS } from '../data/tasks';
import { Avatar, Badge, Card, DonutChart, StatCard, Tooltip, C } from '../ui';
import { DeliveryWidget } from './DeliveryWidget';
import { CalendarWidget } from './CalendarWidget';
import { TeamChatsWidget } from './TeamChatsWidget';
import { useSession } from './SessionContext';
import sparkleIcon from '../assets/figma/sparkle-icon.svg';

export function Dashboard({ onOpen }) {
    const { briefingDismissed, briefingText, showSummary, summaryText, actionsLog } = useSession();
    const cols = ['Blocked', 'To Do', 'In Progress', 'Done'];
    const byStatus = {};
    cols.forEach((column) => {
        byStatus[column] = ALL_TASKS.filter((task) => task.status === column);
    });
    const colDot = { Blocked: C.red, Done: C.green, 'In Progress': C.teal, 'To Do': C.textTer };
    const donutSegments = [
        { label: 'Blocked', value: byStatus.Blocked.length, color: C.red },
        { label: 'To Do', value: byStatus['To Do'].length, color: C.textTer },
        { label: 'Done', value: byStatus.Done.length, color: C.green },
        { label: 'In Progress', value: byStatus['In Progress'].length, color: C.teal },
    ];
    const donutPct = Math.round((SPRINT.completed / SPRINT.total) * 100);
    const briefTask = TASKS.inProgress;

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <div className="dashboard__summary">
                    <h2 className="title-lg">{SPRINT.name}</h2>
                    <span className="text-ter" style={{ fontSize: 14 }}>
                        {SPRINT.dates} · {SPRINT.daysLeft} days remaining
                    </span>
                </div>
                <Badge label="Active sprint" tone="green" />
            </div>

            <div className="dashboard__row dashboard__row--delivery">
                <DeliveryWidget />
                <CalendarWidget />
                <TeamChatsWidget />
            </div>

            <div className="dashboard__row dashboard__row--brief">
                {!briefingDismissed ? (
                    <Card padding="lg" className="dashboard__briefing-card">
                        <div className="dashboard__briefing-header">
                            <img src={sparkleIcon} alt="" className="dashboard__briefing-icon" />
                            <span className="dashboard__briefing-label">Sprint Brief</span>
                        </div>
                        <p className="dashboard__briefing-copy">{briefingText}</p>
                        <div className="dashboard__briefing-task">
                            <div className="dashboard__briefing-task-info">
                                <Avatar initials={briefTask.assignee.initials} color={briefTask.assignee.color} size={22} />
                                <span className="dashboard__briefing-task-title">{briefTask.title}</span>
                                <span className="dashboard__briefing-task-id">{briefTask.id}</span>
                                <Badge label={briefTask.tags[1] || briefTask.tags[0]} color={TAG_CLR[briefTask.tags[1] || briefTask.tags[0]] || C.textSec} size="sm" />
                            </div>
                            <button type="button" className="dashboard__briefing-cta" onClick={() => onOpen('inProgress')}>
                                Review Options
                            </button>
                        </div>
                    </Card>
                ) : (
                    <div />
                )}
                <Card className="dashboard__donut-card">
                    <DonutChart segments={donutSegments} centerLabel={`${donutPct}%`} size={132} thickness={16} />
                </Card>
            </div>

            {showSummary && (
                <Card className="card-padding dashboard__summary-banner" style={{ marginBottom: 14, borderColor: 'rgba(39, 201, 154, 0.18)' }}>
                    <div className="dashboard__summary-banner-header">
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>✓ Sprint 24 · Session Complete</span>
                    </div>
                    <p style={{ margin: '10px 0', color: C.textSec, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{summaryText}</p>
                </Card>
            )}

            <div className="card-grid-4">
                {[
                    { label: 'Total tasks', val: SPRINT.total, color: C.textPri, icon: 'list-check' },
                    { label: 'Completed', val: SPRINT.completed, color: C.green, icon: 'circle-check' },
                    { label: 'In progress', val: SPRINT.inProgress, color: C.teal, icon: 'loader-2' },
                    { label: 'At risk', val: SPRINT.atRisk, color: C.red, icon: 'alert-triangle' },
                ].map((item) => (
                    <StatCard key={item.label} label={item.label} value={item.val} color={item.color} icon={item.icon} />
                ))}
            </div>

            <div className="dashboard__board-header">
                <span className="title-lg">Board</span>
                <Badge label={`${SPRINT.atRisk} at risk`} tone="red" size="sm" />
                <button type="button" className="dashboard__filter-view" disabled>
                    <i className="ti ti-filter" aria-hidden="true" />
                    Filter View
                    <span className="dashboard__filter-view-count">4/7</span>
                </button>
            </div>

            <div className="dashboard__section">
                {cols.map((column) => (
                    <div key={column}>
                        <div className="dashboard__section-header">
                            <div
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: colDot[column],
                                    boxShadow: `0 0 5px ${colDot[column]}`,
                                }}
                            />
                            <span className="title-sm text-ter" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                {column}
                            </span>
                            <Badge label={byStatus[column].length} color={C.textTer} size="sm" />
                        </div>
                        <div className="dashboard__task-column">
                            {byStatus[column].map((task) => {
                                const actionTaken = actionsLog.some((action) => action.taskId === task.id);
                                const cardClass = task.atRisk
                                    ? actionTaken
                                        ? 'dashboard__task-card--actioned'
                                        : 'dashboard__task-card--at-risk'
                                    : '';

                                return (
                                    <Card
                                        key={task.id}
                                        as="div"
                                        className={`dashboard__task-card ${cardClass}`}
                                        onClick={() => task.atRisk && onOpen(task.status === 'In Progress' ? 'inProgress' : 'todo')}
                                    >
                                        <div className="flex" style={{ alignItems: 'flex-start', gap: 6 }}>
                                            <p className="dashboard__task-title">{task.title}</p>
                                            {task.atRisk && (
                                                <Tooltip
                                                    text={
                                                        task.riskType === 'overtime'
                                                            ? '125% over AI estimate — click to review with Clairity'
                                                            : 'Blocked by dependency — click to review'
                                                    }
                                                >
                                                    <i className="ti ti-alert-triangle" style={{ fontSize: 14, color: C.red }} aria-hidden="true" />
                                                </Tooltip>
                                            )}
                                        </div>
                                        <div className="dashboard__task-meta">
                                            <span style={{ fontSize: 12, color: C.textTer }}>{task.id}</span>
                                            <Badge label={task.tag} color={TAG_CLR[task.tag] || C.textSec} size="sm" />
                                        </div>
                                        {task.atRisk && (
                                            <p className={`dashboard__task-insight ${actionTaken ? 'dashboard__task-insight--actioned' : ''}`}>
                                                {actionTaken
                                                    ? '✓ Action taken · Clairity monitoring'
                                                    : task.riskType === 'overtime'
                                                        ? '18h logged · review options →'
                                                        : 'Pending dependency · review options →'}
                                            </p>
                                        )}
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
