import { useEffect, useRef, useState } from 'react';
import { C } from '../constants/theme';
import { GlowBar } from '../components/GlowBar';
import { Pill } from '../components/Pill';
import { SPRINT } from '../data/tasks';
import { callClaude, SYS_DELIVERY } from '../lib/claude';

export function DeliveryWidget() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetched = useRef(false);

    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;

        callClaude(SYS_DELIVERY, [{
            role: 'user', content:
                `Sprint 24 | ${SPRINT.daysLeft} days left | ${SPRINT.total} tasks | ${SPRINT.completed} done | ${SPRINT.inProgress} in progress | ${SPRINT.atRisk} at risk | TM-112: 125% over AI estimate | TM-119: blocked, over capacity`
        }])
            .then(t => setData(JSON.parse(t.replace(/```json|```/g, '').trim())))
            .catch(() => setData({ score: 52, label: 'At risk', summary: 'Two tasks need attention to protect sprint delivery.', tip: 'Prioritize unblocking TM-107 to restore downstream flow.' }))
            .finally(() => setLoading(false));
    }, []);

    const scoreColor = data ? (data.score >= 70 ? C.green : data.score >= 45 ? C.yellow : C.red) : C.textTer;

    return (
        <div style={{
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 20px', marginBottom: 14,
            boxShadow: data ? `0 0 0 1px ${scoreColor}10, 0 4px 20px ${scoreColor}06` : 'none'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <i className="ti ti-rocket" style={{ fontSize: 14, color: C.teal }} aria-hidden="true" />
                <span style={{ fontSize: 11, fontWeight: 700, color: C.textTer, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                    Sprint Delivery Potential
                </span>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {loading
                        ? <span style={{ fontSize: 12, color: C.textTer }}>Clairity is assessing…</span>
                        : <><span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, boxShadow: `0 0 5px ${C.green}`, display: 'inline-block' }} />
                            <span style={{ fontSize: 12, color: C.textTer }}>Live</span></>}
                </div>
            </div>

            {loading && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {[35, 100, 68].map((width, index) => (
                        <div key={index} style={{ height: index === 1 ? 5 : 11, width: `${width}%`, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }} />
                    ))}
                </div>
            )}

            {data && (
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0 22px', alignItems: 'start' }}>
                    <div>
                        <div style={{ fontSize: 38, fontWeight: 700, color: scoreColor, lineHeight: 1, marginBottom: 6 }}>
                            {data.score}<span style={{ fontSize: 16, opacity: 0.4 }}>/100</span>
                        </div>
                        <Pill label={data.label} color={scoreColor} small />
                    </div>
                    <div>
                        <GlowBar pct={data.score} color={scoreColor} height={5} />
                        <p style={{ fontSize: 14, color: C.textSec, margin: '10px 0 8px', lineHeight: 1.65 }}>{data.summary}</p>
                        <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                            <i className="ti ti-bulb" style={{ fontSize: 14, color: C.yellow }} aria-hidden="true" />
                            <p style={{ fontSize: 14, color: C.yellow, margin: 0, lineHeight: 1.65, opacity: 0.9 }}>{data.tip}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
