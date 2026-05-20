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

        callClaude(SYS_DELIVERY, [
            {
                role: 'user',
                content: `Sprint 24 | ${SPRINT.daysLeft} days left | ${SPRINT.total} tasks | ${SPRINT.completed} done | ${SPRINT.inProgress} in progress | ${SPRINT.atRisk} at risk | TM-112: 125% over AI estimate | TM-119: blocked, over capacity`,
            },
        ])
            .then((t) => setData(JSON.parse(t.replace(/```json|```/g, '').trim())))
            .catch(() =>
                setData({
                    score: 52,
                    label: 'At risk',
                    summary: 'Two tasks need attention to protect sprint delivery.',
                    tip: 'Prioritize unblocking TM-107 to restore downstream flow.',
                }),
            )
            .finally(() => setLoading(false));
    }, []);

    const scoreColor = data ? (data.score >= 70 ? C.green : data.score >= 45 ? C.yellow : C.red) : C.textTer;

    return (
        <div className="delivery-widget" style={{ boxShadow: data ? `0 0 0 1px ${scoreColor}10, 0 4px 20px ${scoreColor}06` : 'none' }}>
            <div className="delivery-widget__header">
                <i className="ti ti-rocket" style={{ fontSize: 14, color: C.teal }} aria-hidden="true" />
                <span className="title-sm text-ter" style={{ letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                    Sprint Delivery Potential
                </span>
                <div className="delivery-widget__status">
                    {loading ? (
                        <span style={{ fontSize: 12, color: C.textTer }}>Clairity is assessing…</span>
                    ) : (
                        <>
                            <span
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: C.green,
                                    boxShadow: `0 0 5px ${C.green}`,
                                    display: 'inline-block',
                                }}
                            />
                            <span style={{ fontSize: 12, color: C.textTer }}>Live</span>
                        </>
                    )}
                </div>
            </div>

            {loading && (
                <div className="delivery-widget--loading">
                    {[35, 100, 68].map((width, index) => (
                        <div key={index} style={{ height: index === 1 ? 5 : 11, width: `${width}%`, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }} />
                    ))}
                </div>
            )}

            {data && (
                <div className="delivery-widget__bar">
                    <div>
                        <div className="delivery-widget__score" style={{ color: scoreColor }}>
                            {data.score}
                            <span style={{ fontSize: 16, opacity: 0.4 }}>/100</span>
                        </div>
                        <Pill label={data.label} color={scoreColor} small />
                    </div>
                    <div>
                        <GlowBar pct={data.score} color={scoreColor} height={5} />
                        <p className="delivery-widget__summary">{data.summary}</p>
                        <div className="delivery-widget__tip">
                            <i className="ti ti-bulb" style={{ fontSize: 14, color: C.yellow }} aria-hidden="true" />
                            <p style={{ fontSize: 14, color: C.yellow, margin: 0, lineHeight: 1.65, opacity: 0.9 }}>{data.tip}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
