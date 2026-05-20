import { useState } from 'react';
import { C } from '../constants/theme';
import { TASKS, TAG_CLR } from '../data/tasks';
import { Avatar } from '../components/Avatar';
import { Card } from '../components/Card';
import { GlowBar } from '../components/GlowBar';
import { Pill } from '../components/Pill';
import { Tip } from '../components/Tip';
import { ClarityPanel } from './ClarityPanel';

export function TaskView({ taskKey, onBack }) {
    const task = TASKS[taskKey];
    const [tab, setTab] = useState('description');
    const isInProgress = taskKey === 'inProgress';
    const overPct = isInProgress ? Math.round(((task.actualHours - task.aiEstimateHours) / task.aiEstimateHours) * 100) : 0;
    const doneCount = task.steps.filter((step) => step.done).length;

    return (
        <div className="dashboard" style={{ maxWidth: 760, paddingBottom: 32 }}>
            <button
                onClick={onBack}
                className="button button--ghost button--small"
                style={{ marginBottom: 18, gap: 7, padding: '7px 15px', color: C.textTer, borderColor: C.borderMid }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = C.tealDim;
                    e.currentTarget.style.color = C.teal;
                    e.currentTarget.style.borderColor = C.teal + '40';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = C.textTer;
                    e.currentTarget.style.borderColor = C.borderMid;
                }}
            >
                <i className="ti ti-arrow-left" style={{ fontSize: 14, color: C.textTer }} aria-hidden="true" />
                Back to Sprint 24
            </button>

            <Card className="card-padding" glow={C.red} style={{ marginBottom: 14 }}>
                <div className="flex" style={{ gap: 14 }}>
                    <Avatar initials={task.assignee.initials} color={task.assignee.color} size={38} />
                    <div style={{ flex: 1 }}>
                        <div className="flex-wrap" style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                            <span style={{ fontSize: 12, color: C.textTer, fontWeight: 600 }}>{task.id}</span>
                            <Pill label={task.status} color={isInProgress ? C.teal : C.textSec} />
                            <Pill label="Needs attention" color={C.red} />
                        </div>
                        <h2 className="title-lg" style={{ margin: '0 0 10px', lineHeight: 1.35 }}>{task.title}</h2>
                        <div className="flex-wrap" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <span style={{ fontSize: 14, color: C.textSec, display: 'flex', alignItems: 'center', gap: 5 }}>
                                <i className="ti ti-user" style={{ fontSize: 14, color: C.textSec }} aria-hidden="true" />
                                {task.assignee.name}
                            </span>
                            <span style={{ fontSize: 14, color: C.textSec, display: 'flex', alignItems: 'center', gap: 5 }}>
                                <i className="ti ti-calendar" style={{ fontSize: 14, color: C.textSec }} aria-hidden="true" />
                                Due May 20
                            </span>
                            <div className="flex-wrap" style={{ display: 'flex', gap: 5 }}>
                                {task.tags.map((tag) => (
                                    <Pill key={tag} label={tag} color={TAG_CLR[tag] || C.textSec} small />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <ClarityPanel task={task} />

            {isInProgress && (
                <Card className="card-padding" style={{ marginBottom: 14 }}>
                    <p className="title-sm text-ter" style={{ margin: '0 0 14px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Time tracking
                    </p>
                    <div className="grid-3" style={{ gap: 10, marginBottom: 14 }}>
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
                            <div key={item.label} style={{ background: 'rgba(255,255,255,0.025)', borderRadius: 8, padding: '12px 14px', border: `1px solid ${C.border}` }}>
                                <div className="flex-center" style={{ gap: 5, marginBottom: 8 }}>
                                    <span style={{ fontSize: 11, color: C.textTer, opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {item.label}
                                    </span>
                                    {item.tip && (
                                        <Tip text={item.tip}>
                                            <i className="ti ti-info-circle" style={{ fontSize: 12, color: C.textTer }} aria-hidden="true" />
                                        </Tip>
                                    )}
                                </div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.val}</div>
                                <div style={{ fontSize: 13, color: item.color === C.red ? C.red : C.textTer, opacity: 0.85 }}>{item.sub}</div>
                            </div>
                        ))}
                    </div>
                    <GlowBar pct={(task.actualHours / 22) * 100} color={C.red} height={5} />
                </Card>
            )}

            {!isInProgress && task.dependency && (
                <Card
                    className="card-padding"
                    style={{
                        marginBottom: 14,
                        border: `1px solid rgba(240,80,106,0.20)`,
                        background: 'rgba(240,80,106,0.04)',
                    }}
                >
                    <div className="flex" style={{ gap: 13 }}>
                        <div className="icon-box icon-box--large" style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(240,80,106,0.14)' }}>
                            <i className="ti ti-git-branch" style={{ fontSize: 16, color: C.red }} aria-hidden="true" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: C.red, margin: '0 0 5px' }}>Pending dependency</p>
                            <p style={{ fontSize: 14, color: C.red, opacity: 0.75, margin: '0 0 12px', lineHeight: 1.6 }}>
                                Sequenced after <strong style={{ opacity: 1 }}>{task.dependency.id}</strong>: "{task.dependency.title}" — {task.dependency.assignee} ({task.dependency.team}) · {task.dependency.status}
                            </p>
                            <div className="grid-3" style={{ gap: 8 }}>
                                {[
                                    { label: 'AI estimate', val: `${task.aiEstimateHours}h` },
                                    { label: 'Sprint capacity', val: '~11h' },
                                    { label: 'Gap', val: `${task.aiEstimateHours - 11}h` },
                                ].map((item) => (
                                    <div key={item.label} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 6, padding: '8px 10px' }}>
                                        <div style={{ fontSize: 11, color: C.red, opacity: 0.55, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                            {item.label}
                                        </div>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: C.red }}>{item.val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            <div className="flex" style={{ gap: 0, marginBottom: 13, background: 'rgba(255,255,255,0.03)', borderRadius: 9, padding: 3, border: `1px solid ${C.border}` }}>
                {[
                    ['description', 'file-text', 'Task brief'],
                    ['steps', 'checklist', 'Progress'],
                ].map(([type, icon, label]) => (
                    <button
                        key={type}
                        onClick={() => setTab(type)}
                        className="button button--ghost"
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            padding: '8px 0',
                            background: tab === type ? C.card : 'transparent',
                            borderRadius: 7,
                            border: tab === type ? `1px solid ${C.borderMid}` : '1px solid transparent',
                            color: tab === type ? C.textPri : C.textTer,
                            fontWeight: tab === type ? 700 : 500,
                        }}
                    >
                        <i className={`ti ti-${icon}`} style={{ fontSize: 14, color: tab === type ? C.textPri : C.textTer }} aria-hidden="true" />
                        {label}
                    </button>
                ))}
            </div>

            {tab === 'description' && (
                <Card className="card-padding">
                    <p className="title-sm text-ter" style={{ margin: '0 0 12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        PM brief
                    </p>
                    <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.75, margin: '0 0 16px' }}>{task.description}</p>
                    <div className="flex-wrap" style={{ gap: 6 }}>
                        {task.tags.map((tag) => (
                            <Pill key={tag} label={tag} color={TAG_CLR[tag] || C.textSec} />
                        ))}
                    </div>
                </Card>
            )}

            {tab === 'steps' && (
                <Card className="card-padding">
                    <div className="flex-between" style={{ marginBottom: 14 }}>
                        <p className="title-sm text-ter" style={{ margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            Implementation steps
                        </p>
                        <span style={{ fontSize: 14, color: C.textSec }}>
                            {doneCount}/{task.steps.length} done
                        </span>
                    </div>
                    <GlowBar pct={(doneCount / task.steps.length) * 100} color={C.green} height={4} />
                    <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column' }}>
                        {task.steps.map((step, index) => (
                            <div
                                key={index}
                                className="flex"
                                style={{
                                    alignItems: 'center',
                                    gap: 11,
                                    padding: '11px 0',
                                    borderBottom: index < task.steps.length - 1 ? `1px solid ${C.border}` : 'none',
                                }}
                            >
                                <div
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: '50%',
                                        flexShrink: 0,
                                        border: step.done ? 'none' : `1.5px solid ${C.borderMid}`,
                                        background: step.done ? C.green + '28' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {step.done && <i className="ti ti-check" style={{ fontSize: 11, color: C.green }} aria-hidden="true" />}
                                </div>
                                <span style={{ fontSize: 14, color: step.done ? C.textTer : C.textPri, textDecoration: step.done ? 'line-through' : 'none' }}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}
