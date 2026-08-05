import { useEffect, useState } from 'react';
import { TASKS, TAG_CLR } from '../data/tasks';
import { Avatar, Badge, Button, C, Card, ProgressBar, Tooltip } from '../ui';
import { Tabs } from '../ui/Tabs';
import { ClarityPanel } from './ClarityPanel';
import { useSession } from './SessionContext';

export function TaskView({ taskKey, onBack }) {
    const task = TASKS[taskKey];
    const [tab, setTab] = useState('description');
    const { markReviewed } = useSession();
    const isInProgress = taskKey === 'inProgress';
    const overPct = isInProgress ? Math.round(((task.actualHours - task.aiEstimateHours) / task.aiEstimateHours) * 100) : 0;
    const doneCount = task.steps.filter((step) => step.done).length;

    useEffect(() => {
        markReviewed(task.id);
    }, [markReviewed, task.id]);

    return (
        <div className="task-view">
            <Button label="Back to Sprint 24" onClick={onBack} className="back-button" variant="ghost" size="sm">
                <i className="ti ti-arrow-left" style={{ fontSize: 14, color: C.textTer }} aria-hidden="true" /> Back to Sprint 24
            </Button>

            <Card padding="lg" glow={C.red} style={{ marginBottom: 14 }}>
                <div className="task-header">
                    <Avatar initials={task.assignee.initials} color={task.assignee.color} size={38} />
                    <div className="task-header-main">
                        <div className="task-status-group">
                            <span style={{ fontSize: 12, color: C.textTer, fontWeight: 600 }}>{task.id}</span>
                            <Badge label={task.status} color={isInProgress ? C.teal : C.textSec} />
                            <Badge label="Needs attention" tone="red" />
                        </div>
                        <h2 className="task-title">{task.title}</h2>
                        <div className="task-meta">
                            <span className="task-meta-item">
                                <i className="ti ti-user" aria-hidden="true" />
                                {task.assignee.name}
                            </span>
                            <span className="task-meta-item">
                                <i className="ti ti-calendar" aria-hidden="true" />
                                Due May 20
                            </span>
                            <div className="flex-wrap" style={{ display: 'flex', gap: 5 }}>
                                {task.tags.map((tag) => (
                                    <Badge key={tag} label={tag} color={TAG_CLR[tag] || C.textSec} size="sm" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {isInProgress && (
                <Card padding="lg" style={{ marginBottom: 14 }}>
                    <p className="title-sm text-ter" style={{ margin: '0 0 14px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Time tracking
                    </p>
                    <div className="task-meta-grid">
                        {[
                            { label: 'Time logged', val: `${task.actualHours}h`, color: C.red, sub: `+${overPct}% beyond estimate` },
                            {
                                label: 'AI estimate',
                                val: `${task.aiEstimateHours}h`,
                                color: C.textPri,
                                sub: 'Based on similar tasks',
                                tip: 'From 3 comparable auth tasks (avg 11h). Token refresh complexity adds ~25%.',
                            },
                            { label: 'Original story', val: `${task.originalEstimate}h`, color: C.textTer, sub: 'Initial estimate' },
                        ].map((item) => (
                            <div key={item.label} className="task-figure">
                                <div className="flex-center" style={{ gap: 5, marginBottom: 8 }}>
                                    <span className="task-figure-title">{item.label}</span>
                                    {item.tip && (
                                        <Tooltip text={item.tip}>
                                            <i className="ti ti-info-circle" style={{ fontSize: 12, color: C.textTer }} aria-hidden="true" />
                                        </Tooltip>
                                    )}
                                </div>
                                <div className="task-figure-value" style={{ color: item.color }}>{item.val}</div>
                                <div className="task-figure-sub" style={{ color: item.color === C.red ? C.red : C.textTer }}>{item.sub}</div>
                            </div>
                        ))}
                    </div>
                    <ProgressBar pct={(task.actualHours / 22) * 100} color={C.red} height={5} />
                </Card>
            )}

            {!isInProgress && task.dependency && (
                <Card padding="lg" className="task-dependency">
                    <div className="flex" style={{ gap: 13 }}>
                        <div className="task-dependency__icon">
                            <i className="ti ti-git-branch" style={{ fontSize: 16, color: C.red }} aria-hidden="true" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: C.red, margin: '0 0 5px' }}>Pending dependency</p>
                            <p style={{ fontSize: 14, color: C.red, opacity: 0.75, margin: '0 0 12px', lineHeight: 1.6 }}>
                                Sequenced after <strong style={{ opacity: 1 }}>{task.dependency.id}</strong>: "{task.dependency.title}" — {task.dependency.assignee} ({task.dependency.team}) · {task.dependency.status}
                            </p>
                            <div className="task-dependency-grid">
                                {[
                                    { label: 'AI estimate', val: `${task.aiEstimateHours}h` },
                                    { label: 'Sprint capacity', val: '~11h' },
                                    { label: 'Gap', val: `${task.aiEstimateHours - 11}h` },
                                ].map((item) => (
                                    <div key={item.label} className="task-detail-flag">
                                        <div className="task-detail-flag-title">{item.label}</div>
                                        <div className="task-detail-flag-value">{item.val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            <ClarityPanel task={task} />

            <Tabs
                value={tab}
                onChange={setTab}
                items={[
                    { value: 'description', icon: 'file-text', label: 'Task brief' },
                    { value: 'steps', icon: 'checklist', label: 'Progress' },
                ]}
            />

            {tab === 'description' && (
                <Card padding="lg">
                    <p className="title-sm text-ter" style={{ margin: '0 0 12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        PM brief
                    </p>
                    <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.75, margin: '0 0 16px' }}>{task.description}</p>
                    <div className="flex-wrap" style={{ gap: 6 }}>
                        {task.tags.map((tag) => (
                            <Badge key={tag} label={tag} color={TAG_CLR[tag] || C.textSec} />
                        ))}
                    </div>
                </Card>
            )}

            {tab === 'steps' && (
                <Card padding="lg">
                    <div className="flex-between" style={{ marginBottom: 14 }}>
                        <p className="title-sm text-ter" style={{ margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            Implementation steps
                        </p>
                        <span style={{ fontSize: 14, color: C.textSec }}>
                            {doneCount}/{task.steps.length} done
                        </span>
                    </div>
                    <ProgressBar pct={(doneCount / task.steps.length) * 100} color={C.green} height={4} />
                    <div className="task-steps">
                        {task.steps.map((step, index) => (
                            <div key={index} className={`task-step${step.done ? ' task-step--done' : ''}`}>
                                <div className="task-step-number">
                                    {step.done && <i className="ti ti-check" style={{ fontSize: 11, color: C.green }} aria-hidden="true" />}
                                </div>
                                <span className="task-step-label">{step.label}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}
