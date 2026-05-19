import { useEffect, useRef, useState } from 'react';
import { C } from '../constants/theme';
import { SPRINT } from '../data/tasks';
import { CtaButton } from '../components/CtaButton';
import { callClaude, SYS_TASK } from '../lib/claude';

export function ClarityPanel({ task }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetched = useRef(false);

    const impactCfg = {
        high: { color: C.teal, dim: C.tealDim },
        medium: { color: C.indigo, dim: C.indigoDim },
        low: { color: C.green, dim: C.greenDim },
    };

    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;
        setLoading(true);
        const isIP = task.status === "In Progress";
        const msg = isIP
            ? `Task: "${task.title}" | In Progress | Assignee: ${task.assignee.name} | Original: ${task.originalEstimate}h | AI estimate: ${task.aiEstimateHours}h | Actual: ${task.actualHours}h | ${SPRINT.daysLeft} days left | Steps remaining: ${task.steps.filter(s => !s.done).length}/${task.steps.length}`
            : `Task: "${task.title}" | To Do | Assignee: ${task.assignee.name} | AI estimate: ${task.aiEstimateHours}h | Sprint capacity: ~11h | Blocked by: "${task.dependency.title}" (${task.dependency.assignee}, ${task.dependency.team}) — ${task.dependency.status}`;
        callClaude(SYS_TASK, [{ role: "user", content: msg }])
            .then(t => { const d = JSON.parse(t.replace(/```json|```/g, "").trim()); d.actions = (d.actions || []).slice(0, 3); setData(d); })
            .catch(() => setData({ headline: "I'll reconnect in a moment.", insight: "Try refreshing — I'm here.", actions: [], mentorNote: null }))
            .finally(() => setLoading(false));
    }, [task]);

    const showBlockedFallback = task.id === 'TM-119';

    if (showBlockedFallback) {
        return (
            <div style={{ background: 'rgb(13, 23, 41)', border: '1px solid rgba(255, 255, 255, 0.055)', borderRadius: 12, overflow: 'hidden', marginBottom: 14, boxShadow: 'rgba(90, 79, 207, 0.063) 0px 0px 0px 1px, rgba(90, 79, 207, 0.024) 0px 8px 28px;' }} className="h2d-210c4701">
                <div style={{ padding: '11px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.055)', display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(90, 79, 207, 0.11)' }} className="h2d-739d76f">
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(90, 79, 207, 0.157)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} className="h2d-72fa42ff">
                        <i className="ti ti-sparkles" style={{ fontSize: 12, color: 'rgb(90, 79, 207)' }} aria-hidden="true" />
                    </div>
                    <div className="h2d-fd507f8a">
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgb(90, 79, 207)', letterSpacing: '0.06em' }} className="h2d-d5d24a3e">CLAIRITY</span>
                        <span style={{ fontSize: 11, color: 'rgb(90, 79, 207)', opacity: 0.6, marginLeft: 7 }} className="h2d-d6eda992">Sprint Intelligence Advisor</span>
                    </div>
                </div>
                <div style={{ padding: '14px 16px' }} className="h2d-84920678">
                    <p style={{ fontSize: 15, fontWeight: 700, color: 'rgb(228, 237, 255)', margin: 0, lineHeight: 1.4 }} className="h2d-fb64fa5b">Deployment blocked before it can begin.</p>
                    <p style={{ fontSize: 14, color: 'rgb(150, 175, 204)', margin: '0 0 14px', lineHeight: 1.65 }} className="h2d-358192a6">The 14h estimate already exceeds sprint capacity, and the upstream dependency hasn't started yet. This task needs either unblocking coordination or a scope decision before Daria can move forward.</p>
                    <div style={{ background: 'rgba(90, 79, 207, 0.11)', border: '1px solid rgba(90, 79, 207, 0.125)', borderRadius: 8, padding: '9px 12px', display: 'flex', gap: 8 }} className="h2d-de37d762">
                        <i className="ti ti-quote" style={{ fontSize: 13, color: 'rgb(90, 79, 207)' }} aria-hidden="true" />
                        <p style={{ fontSize: 13, color: 'rgb(90, 79, 207)', margin: 0, lineHeight: 1.6, fontStyle: 'italic', opacity: 0.88 }} className="h2d-7d2ae453">I'd prioritize the sync first — unblocking Rotem's work is the lever that makes everything else possible.</p>
                    </div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'rgb(88, 112, 144)', letterSpacing: '0.09em', textTransform: 'uppercase', margin: '0 0 7px' }} className="h2d-4182fd81">Suggested actions</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }} className="h2d-7c4f52c4">
                        <div style={{ background: 'rgba(255, 255, 255, 0.024)', borderRadius: 8, padding: '10px 12px', border: '1px solid rgba(39, 201, 154, 0.157)', boxShadow: 'rgba(39, 201, 154, 0.063) 0px 0px 0px 1px;' }} className="h2d-bc7da646">
                            <p style={{ fontSize: 14, fontWeight: 600, color: 'rgb(228, 237, 255)', margin: '0 0 4px', lineHeight: 1.35 }} className="h2d-9fb4303c">Sync with Rotem's team</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }} className="h2d-937e0c">
                                <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 20, background: 'rgba(39, 201, 154, 0.1)', color: 'rgb(39, 201, 154)', border: '1px solid rgba(39, 201, 154, 0.133)' }} className="h2d-7559a989">✓ Recommended</span>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 8px', borderRadius: 20, background: 'rgba(43, 176, 230, 0.1)', color: 'rgb(43, 176, 230)', border: '1px solid rgba(43, 176, 230, 0.133)' }} className="h2d-42534087">high impact</span>
                            </div>
                            <p style={{ fontSize: 13, color: 'rgb(150, 175, 204)', margin: '0 0 7px', lineHeight: 1.55 }} className="h2d-5d88715b"> Align on API Gateway timeline before sprint ends</p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="h2d-26e7dd47">
                                <button style={{ padding: '4px 11px', fontSize: 12, fontWeight: 600, borderRadius: 6, cursor: 'pointer', fontFamily: 'Afacad, Inter, system-ui, sans-serif', transition: '0.15s', whiteSpace: 'nowrap', outline: 'none', background: 'rgba(43, 176, 230, 0.1)', border: '1px solid rgba(43, 176, 230, 0.25)', color: 'rgb(43, 176, 230)' }} className="h2d-72adfcf">Schedule a sync →</button>
                            </div>
                        </div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.024)', borderRadius: 8, padding: '10px 12px', border: '1px solid rgba(255, 255, 255, 0.055)', boxShadow: 'none' }} className="h2d-97761998">
                            <p style={{ fontSize: 14, fontWeight: 600, color: 'rgb(228, 237, 255)', margin: '0 0 4px', lineHeight: 1.35 }} className="h2d-8588d51f">Reduce deployment scope</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }} className="h2d-a6f5f2ea">
                                <span className="h2d-3a15c1b6"></span>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 8px', borderRadius: 20, background: 'rgba(90, 79, 207, 0.11)', color: 'rgb(90, 79, 207)', border: '1px solid rgba(90, 79, 207, 0.133)' }} className="h2d-287fd5c4">medium impact</span>
                            </div>
                            <p style={{ fontSize: 13, color: 'rgb(150, 175, 204)', margin: '0 0 7px', lineHeight: 1.55 }} className="h2d-c2aa6709"> Scope to partial staging deploy within 11h capacity</p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="h2d-5a871774">
                                <button style={{ padding: '4px 11px', fontSize: 12, fontWeight: 600, borderRadius: 6, cursor: 'pointer', fontFamily: 'Afacad, Inter, system-ui, sans-serif', transition: '0.15s', whiteSpace: 'nowrap', outline: 'none', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.055)', color: 'rgb(150, 175, 204)' }} className="h2d-111f7a85">Reduce scope →</button>
                            </div>
                        </div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.024)', borderRadius: 8, padding: '10px 12px', border: '1px solid rgba(255, 255, 255, 0.055)', boxShadow: 'none' }} className="h2d-cb93d33e">
                            <p style={{ fontSize: 14, fontWeight: 600, color: 'rgb(228, 237, 255)', margin: '0 0 4px', lineHeight: 1.35 }} className="h2d-97f0e1f">Move to next sprint</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }} className="h2d-dd2b2fce">
                                <span className="h2d-1337d3c8"></span>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 8px', borderRadius: 20, background: 'rgba(39, 201, 154, 0.1)', color: 'rgb(39, 201, 154)', border: '1px solid rgba(39, 201, 154, 0.133)' }} className="h2d-a78ca783">low impact</span>
                            </div>
                            <p style={{ fontSize: 13, color: 'rgb(150, 175, 204)', margin: '0 0 7px', lineHeight: 1.55 }} className="h2d-53a57ee2"> Defer until dependency is resolved and capacity fits</p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="h2d-8aa6cb0d">
                                <button style={{ padding: '4px 11px', fontSize: 12, fontWeight: 600, borderRadius: 6, cursor: 'pointer', fontFamily: 'Afacad, Inter, system-ui, sans-serif', transition: '0.15s', whiteSpace: 'nowrap', outline: 'none', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.055)', color: 'rgb(150, 175, 204)' }} className="h2d-33cc5b34">Move to next sprint →</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
            overflow: "hidden", marginBottom: 14,
            boxShadow: `0 0 0 1px ${C.indigo}10, 0 8px 28px ${C.indigo}06`
        }}>

            {/* Header */}
            <div style={{
                padding: "11px 16px", borderBottom: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", gap: 9, background: C.indigoDim
            }}>
                <div style={{
                    width: 22, height: 22, borderRadius: 6, background: C.indigo + "28",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                    <i className="ti ti-sparkles" style={{ fontSize: 12, color: C.indigo }} aria-hidden="true" />
                </div>
                <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.indigo, letterSpacing: "0.06em" }}>CLAIRITY</span>
                    <span style={{ fontSize: 11, color: C.indigo, opacity: 0.6, marginLeft: 7 }}>Sprint Intelligence Advisor</span>
                </div>
                {loading && <span style={{ marginLeft: "auto", fontSize: 11, color: C.textTer }}>Reviewing…</span>}
            </div>

            {/* Skeleton */}
            {loading && (
                <div style={{ padding: "14px 16px" }}>
                    {[65, 45, 80, 38].map((w, i) => (
                        <div key={i} style={{ height: 10, width: `${w}%`, background: "rgba(255,255,255,0.05)", borderRadius: 4, marginBottom: 10 }} />
                    ))}
                </div>
            )}

            {/* Content */}
            {data && (
                <div style={{ padding: "14px 16px" }}>
                    {/* Headline */}
                    <p style={{ fontSize: 15, fontWeight: 700, color: C.textPri, margin: "0 0 5px", lineHeight: 1.4 }}>{data.headline}</p>
                    {/* Insight */}
                    <p style={{ fontSize: 14, color: C.textSec, margin: "0 0 14px", lineHeight: 1.65 }}>{data.insight}</p>

                    {/* Actions label */}
                    <p style={{
                        fontSize: 11, fontWeight: 700, color: C.textTer, letterSpacing: "0.09em",
                        textTransform: "uppercase", margin: "0 0 7px"
                    }}>Suggested actions</p>

                    {/* ── Action cards: tightened spacing ── */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                        {data.actions.map((a, i) => {
                            const ic = impactCfg[a.impact] || impactCfg.medium;
                            return (
                                <div key={i} style={{
                                    background: "rgba(255,255,255,0.025)", borderRadius: 8,
                                    padding: "10px 12px",                           /* ↓ was 12px 14px */
                                    border: `1px solid ${a.recommended ? C.green + "28" : C.border}`,
                                    boxShadow: a.recommended ? `0 0 0 1px ${C.green}10` : "none"
                                }}>

                                    {/* Row 1 — Title */}
                                    <p style={{
                                        fontSize: 14, fontWeight: 600, color: C.textPri,
                                        margin: "0 0 4px", lineHeight: 1.35
                                    }}>          {/* ↓ was 0 0 7px */}
                                        {a.label}
                                    </p>

                                    {/* Row 2 — Tags: Recommended (left) · Impact (right) */}
                                    <div style={{
                                        display: "flex", alignItems: "center",
                                        justifyContent: "space-between", marginBottom: 5
                                    }}> {/* ↓ was 8px */}
                                        {a.recommended
                                            ? <span style={{
                                                fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 20,
                                                background: C.greenDim, color: C.green, border: `1px solid ${C.green}22`
                                            }}>
                                                ✓ Recommended
                                            </span>
                                            : <span />}
                                        <span style={{
                                            fontSize: 10, fontWeight: 700, padding: "1px 8px", borderRadius: 20,
                                            background: ic.dim, color: ic.color, border: `1px solid ${ic.color}22`
                                        }}>
                                            {a.impact} impact
                                        </span>
                                    </div>

                                    {/* Row 3 — Detail */}
                                    <p style={{
                                        fontSize: 13, color: C.textSec,
                                        margin: a.cta ? "0 0 7px" : "0", lineHeight: 1.55
                                    }}> {/* ↓ was 0 0 10px */}
                                        {a.detail}
                                    </p>

                                    {/* Row 4 — CTA */}
                                    {a.cta && (
                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <CtaButton label={a.cta} recommended={a.recommended} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Mentor note */}
                    {data.mentorNote && (
                        <div style={{
                            background: C.indigoDim, border: `1px solid ${C.indigo}20`,
                            borderRadius: 8, padding: "9px 12px", display: "flex", gap: 8
                        }}> {/* ↓ was 10px 14px */}
                            <i className="ti ti-quote" style={{ fontSize: 13, color: C.indigo }} aria-hidden="true" />
                            <p style={{ fontSize: 13, color: C.indigo, margin: 0, lineHeight: 1.6, fontStyle: "italic", opacity: 0.88 }}>
                                {data.mentorNote}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}  