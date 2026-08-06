import { ALL_TASKS, SPRINT, TAG_CLR } from '../data/tasks';
import { Badge, Card, DonutChart, StatCard, Tooltip, C } from '../ui';
import { ProgressBar } from '../ui/ProgressBar';
import { DeliveryWidget } from './DeliveryWidget';
import { CalendarWidget } from './CalendarWidget';
import { TeamChatsWidget } from './TeamChatsWidget';
import { useSession } from './SessionContext';

export function Dashboard({ onOpen }) {
    const { briefingDismissed, dismissBriefing, briefingText, showSummary, summaryText, actionsLog } = useSession();
    const cols = ['Blocked', 'To Do', 'In Progress', 'Done'];
    const byStatus = {};
    cols.forEach((column) => {
        byStatus[column] = ALL_TASKS.filter((task) => task.status === column);
    });
    const pct = Math.round((SPRINT.completed / SPRINT.total) * 100);
    const colDot = { Blocked: C.red, Done: C.green, 'In Progress': C.teal, 'To Do': C.textTer };
    const donutSegments = [
        { label: 'Blocked', value: byStatus.Blocked.length, color: C.red },
        { label: 'To Do', value: byStatus['To Do'].length, color: C.textTer },
        { label: 'Done', value: byStatus.Done.length, color: C.green },
        { label: 'In Progress', value: byStatus['In Progress'].length, color: C.teal },
    ];
    const donutPct = Math.round((SPRINT.completed / SPRINT.total) * 100);

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

            <div className="dashboard__progress">
                <div className="flex-between" style={{ marginBottom: 7 }}>
                    <span className="title-sm text-ter">Sprint progress</span>
                    <span style={{ fontSize: 12, color: C.green, fontWeight: 700 }}>{pct}% complete</span>
                </div>
                <ProgressBar pct={pct} color={C.green} height={4} />
            </div>

            <div className="dashboard__row">
                <DeliveryWidget />
                <div className="dashboard__side-stack">
                    <CalendarWidget />
                    <TeamChatsWidget />
                </div>
            </div>

            <div className="dashboard__row">
                {!briefingDismissed ? (
                    <Card className="card-padding dashboard__briefing-card" style={{ borderColor: 'rgba(90, 79, 207, 0.18)' }}>
                        <div className="dashboard__briefing-header">
                            <span className="title-xs" style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.indigo }}>
                                CLAIRITY · Sprint Briefing
                            </span>
                            <button className="button button--ghost button--small" onClick={dismissBriefing} style={{ color: C.textTer, borderColor: 'transparent' }}>
                                Dismiss
                            </button>
                        </div>
                        <p className="dashboard__briefing-copy" style={{ margin: '10px 0 14px', color: C.textSec, lineHeight: 1.7 }}>{briefingText}</p>
                        <div className="flex-between" style={{ gap: 10 }}>
                            <button
                                className="button button--primary"
                                type="button"
                                onClick={() => onOpen('inProgress')}
                            >
                                Review TM-112 →
                            </button>
                        </div>
                    </Card>
                ) : (
                    <div />
                )}
                <Card padding="lg">
                    <span className="title-sm text-ter" style={{ letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10, display: 'block' }}>
                        Tasks done
                    </span>
                    <DonutChart segments={donutSegments} centerLabel={`${donutPct}%`} size={110} thickness={13} />
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
