import { C } from '../constants/theme';
import { ALL_TASKS, SPRINT, TAG_CLR } from '../data/tasks';
import { Card } from '../components/Card';
import { GlowBar } from '../components/GlowBar';
import { Pill } from '../components/Pill';
import { Tip } from '../components/Tip';
import { DeliveryWidget } from './DeliveryWidget';

export function Dashboard({ onOpen }) {
    const cols = ['Done', 'In Progress', 'To Do'];
    const byStatus = {};
    cols.forEach((column) => {
        byStatus[column] = ALL_TASKS.filter((task) => task.status === column);
    });
    const pct = Math.round((SPRINT.completed / SPRINT.total) * 100);
    const colDot = { Done: C.green, 'In Progress': C.teal, 'To Do': C.textTer };

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <div className="dashboard__summary">
                    <h2 className="title-lg">{SPRINT.name}</h2>
                    <span className="text-ter" style={{ fontSize: 14 }}>
                        {SPRINT.dates} · {SPRINT.daysLeft} days remaining
                    </span>
                </div>
                <Pill label="Active sprint" color={C.green} />
            </div>

            <div className="dashboard__progress">
                <div className="flex-between" style={{ marginBottom: 7 }}>
                    <span className="title-sm text-ter">Sprint progress</span>
                    <span style={{ fontSize: 12, color: C.green, fontWeight: 700 }}>{pct}% complete</span>
                </div>
                <GlowBar pct={pct} color={C.green} height={4} />
            </div>

            <DeliveryWidget />

            <div className="card-grid-4">
                {[
                    { label: 'Total tasks', val: SPRINT.total, color: C.textPri, icon: 'list-check' },
                    { label: 'Completed', val: SPRINT.completed, color: C.green, icon: 'circle-check' },
                    { label: 'In progress', val: SPRINT.inProgress, color: C.teal, icon: 'loader-2' },
                    { label: 'At risk', val: SPRINT.atRisk, color: C.red, icon: 'alert-triangle' },
                ].map((item) => (
                    <Card key={item.label} className="card-padding">
                        <div className="flex-center" style={{ gap: 7, marginBottom: 8 }}>
                            <i className={`ti ti-${item.icon}`} style={{ fontSize: 14, color: item.color }} aria-hidden="true" />
                            <span className="title-sm text-ter" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item.label}</span>
                        </div>
                        <span style={{ fontSize: 30, fontWeight: 700, color: item.color }}>{item.val}</span>
                    </Card>
                ))}
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
                            <span style={{ fontSize: 12, color: C.textTer, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '1px 7px' }}>
                                {byStatus[column].length}
                            </span>
                        </div>
                        <div className="dashboard__task-column">
                            {byStatus[column].map((task) => (
                                <div
                                    key={task.id}
                                    className={`dashboard__task-card ${task.atRisk ? 'dashboard__task-card--at-risk' : ''}`}
                                    onClick={() => task.atRisk && onOpen(task.status === 'In Progress' ? 'inProgress' : 'todo')}
                                >
                                    <div className="flex" style={{ alignItems: 'flex-start', gap: 6 }}>
                                        <p className="dashboard__task-title">{task.title}</p>
                                        {task.atRisk && (
                                            <Tip
                                                text={
                                                    task.riskType === 'overtime'
                                                        ? '125% over AI estimate — click to review with Clairity'
                                                        : 'Blocked by dependency — click to review'
                                                }
                                            >
                                                <i className="ti ti-alert-triangle" style={{ fontSize: 14, color: C.red }} aria-hidden="true" />
                                            </Tip>
                                        )}
                                    </div>
                                    {task.atRisk && (
                                        <p style={{ fontSize: 12, color: C.red, margin: '7px 0 0', opacity: 0.8 }}>
                                            {task.riskType === 'overtime'
                                                ? '18h logged · review options →'
                                                : 'Pending dependency · review options →'}
                                        </p>
                                    )}
                                    <div className="dashboard__task-meta">
                                        <span style={{ fontSize: 12, color: C.textTer }}>{task.id}</span>
                                        <Pill label={task.tag} color={TAG_CLR[task.tag] || C.textSec} small className="dashboard__task-pill" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
