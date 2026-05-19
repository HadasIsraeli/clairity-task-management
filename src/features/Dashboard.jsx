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
    cols.forEach((column) => { byStatus[column] = ALL_TASKS.filter((task) => task.status === column); });
    const pct = Math.round((SPRINT.completed / SPRINT.total) * 100);
    const colDot = { Done: C.green, 'In Progress': C.teal, 'To Do': C.textTer };

    return (
        <div style={{ maxWidth: 920, margin: '0 auto', paddingBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                    <h2 style={{ margin: '0 0 3px', fontSize: 21, fontWeight: 700, color: C.textPri }}>{SPRINT.name}</h2>
                    <span style={{ fontSize: 14, color: C.textTer }}>{SPRINT.dates} · {SPRINT.daysLeft} days remaining</span>
                </div>
                <Pill label="Active sprint" color={C.green} />
            </div>

            <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                    <span style={{ fontSize: 12, color: C.textTer, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sprint progress</span>
                    <span style={{ fontSize: 12, color: C.green, fontWeight: 700 }}>{pct}% complete</span>
                </div>
                <GlowBar pct={pct} color={C.green} height={4} />
            </div>

            <DeliveryWidget />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 18 }}>
                {[
                    { label: 'Total tasks', val: SPRINT.total, color: C.textPri, icon: 'list-check' },
                    { label: 'Completed', val: SPRINT.completed, color: C.green, icon: 'circle-check' },
                    { label: 'In progress', val: SPRINT.inProgress, color: C.teal, icon: 'loader-2' },
                    { label: 'At risk', val: SPRINT.atRisk, color: C.red, icon: 'alert-triangle' },
                ].map((item) => (
                    <Card key={item.label} style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                            <i className={`ti ti-${item.icon}`} style={{ fontSize: 14, color: item.color }} aria-hidden="true" />
                            <span style={{ fontSize: 12, color: C.textTer, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item.label}</span>
                        </div>
                        <span style={{ fontSize: 30, fontWeight: 700, color: item.color }}>{item.val}</span>
                    </Card>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                {cols.map((column) => (
                    <div key={column}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: colDot[column], boxShadow: `0 0 5px ${colDot[column]}` }} />
                            <span style={{ fontSize: 12, fontWeight: 700, color: C.textSec, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{column}</span>
                            <span style={{ fontSize: 12, color: C.textTer, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '1px 7px' }}>{byStatus[column].length}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                            {byStatus[column].map((task) => (
                                <div key={task.id} onClick={() => task.atRisk && onOpen(task.status === 'In Progress' ? 'inProgress' : 'todo')} style={{ background: task.atRisk ? 'rgba(240,80,106,0.05)' : C.card, border: task.atRisk ? `1px solid rgba(240,80,106,0.24)` : `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', cursor: task.atRisk ? 'pointer' : 'default', transition: 'all 0.15s' }} onMouseEnter={(e) => task.atRisk && (e.currentTarget.style.background = 'rgba(240,80,106,0.09)')} onMouseLeave={(e) => task.atRisk && (e.currentTarget.style.background = 'rgba(240,80,106,0.05)')}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                                        <p style={{ fontSize: 14, fontWeight: 500, color: C.textPri, margin: '0 0 6px', lineHeight: 1.4, flex: 1 }}>{task.title}</p>
                                        {task.atRisk && (
                                            <Tip text={task.riskType === 'overtime' ? '125% over AI estimate — click to review with Clairity' : 'Blocked by dependency — click to review'}>
                                                <i className="ti ti-alert-triangle" style={{ fontSize: 14, color: C.red }} aria-hidden="true" />
                                            </Tip>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: 12, color: C.textTer }}>{task.id}</span>
                                        <Pill label={task.tag} color={TAG_CLR[task.tag] || C.textSec} small />
                                    </div>
                                    {task.atRisk && (
                                        <p style={{ fontSize: 12, color: C.red, margin: '7px 0 0', opacity: 0.8 }}>
                                            {task.riskType === 'overtime' ? '18h logged · review options →' : 'Pending dependency · review options →'}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
