import { useEffect, useRef, useState } from 'react';
import { Badge, C, ProgressBar } from '../ui';
import { SPRINT } from '../data/tasks';
import { callClaude, SYS_DELIVERY } from '../lib/claude';
import { useSession } from './SessionContext';

// Fixed-color confidence gauge segments — mirrors the Figma "Sprint Delivery
// Confidence" bar, which reads left (danger) to right (healthy) regardless
// of the live score, with the score itself controlling how far it's filled.
const CONFIDENCE_SEGMENTS = [
    { pct: 25, color: C.red },
    { pct: 25, color: C.orange },
    { pct: 25, color: C.yellow },
    { pct: 25, color: C.green },
];

// Illustrative chrome (not wired to a real breakdown) — mirrors the factor
// chips shown under the Figma mock's "Delivery Confidence Reasoning" disclosure.
const CONFIDENCE_FACTORS = [
    'Team capacity', 'Dependencies', 'Task health', 'Velocity',
    'Scope stability', 'Blocker count', 'Review turnaround',
];

export function DeliveryWidget() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [displayScore, setDisplayScore] = useState(52);
    const [reasoningOpen, setReasoningOpen] = useState(false);
    const fetched = useRef(false);
    const { projectedScore, sessionPhase } = useSession();
    const animationFrame = useRef(null);
    const prevScoreRef = useRef(52);

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
                    label: 'Steady but risky',
                    summary: 'Two tasks need attention to protect sprint delivery.',
                    tip: 'Prioritize unblocking TM-107 to restore downstream flow.',
                }),
            )
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const start = prevScoreRef.current;
        const target = projectedScore;
        if (start === target) {
            setDisplayScore(target);
            return;
        }

        const duration = 700;
        const begin = performance.now();

        const animate = (timestamp) => {
            const progress = Math.min((timestamp - begin) / duration, 1);
            const current = Math.round(start + (target - start) * progress);
            setDisplayScore(current);
            if (progress < 1) {
                animationFrame.current = requestAnimationFrame(animate);
            } else {
                prevScoreRef.current = target;
            }
        };

        animationFrame.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
        };
    }, [projectedScore]);

    const scoreValue = data ? displayScore : 52;
    const scoreColor = scoreValue >= 70 ? C.green : scoreValue >= 45 ? C.yellow : C.red;

    return (
        <div className="delivery-widget" style={{ boxShadow: data ? `0 0 0 1px ${scoreColor}10, 0 4px 20px ${scoreColor}06` : 'none' }}>
            <div className="delivery-widget__header">
                <i className="ti ti-rocket" style={{ fontSize: 14, color: C.teal }} aria-hidden="true" />
                <span className="title-sm text-ter" style={{ letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                    Sprint Delivery Confidence
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
                            <span style={{ fontSize: 12, color: C.textTer }}>
                                {sessionPhase === 'entry' ? 'Live' : 'Updated just now'}
                            </span>
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
                            {scoreValue}
                            <span style={{ fontSize: 16, opacity: 0.4 }}>/100</span>
                        </div>
                        <Badge label={data.label} color={scoreColor} size="sm" />
                    </div>
                    <div>
                        <ProgressBar segments={CONFIDENCE_SEGMENTS} height={5} />
                        <p className="delivery-widget__summary">{data.summary}</p>
                        <div className="delivery-widget__tip">
                            <i className="ti ti-bulb" style={{ fontSize: 14, color: C.yellow }} aria-hidden="true" />
                            <p style={{ fontSize: 14, color: C.yellow, margin: 0, lineHeight: 1.65, opacity: 0.9 }}>{data.tip}</p>
                        </div>
                        <div className="delivery-widget__caption">
                            <i className="ti ti-map-pin" aria-hidden="true" />
                            Calculated from {CONFIDENCE_FACTORS.length} operational factors across team capacity, dependencies, and task health
                        </div>
                    </div>
                </div>
            )}

            {data && (
                <button
                    type="button"
                    className="delivery-widget__reasoning-toggle"
                    onClick={() => setReasoningOpen((open) => !open)}
                    aria-expanded={reasoningOpen}
                >
                    <i className="ti ti-sparkles" style={{ color: C.indigo }} aria-hidden="true" />
                    <span>Delivery Confidence Reasoning</span>
                    <i className={`ti ti-chevron-down delivery-widget__reasoning-chevron${reasoningOpen ? ' delivery-widget__reasoning-chevron--open' : ''}`} aria-hidden="true" />
                </button>
            )}

            {data && reasoningOpen && (
                <div className="delivery-widget__reasoning-body">
                    {CONFIDENCE_FACTORS.map((factor) => (
                        <span key={factor} className="delivery-widget__reasoning-chip">{factor}</span>
                    ))}
                </div>
            )}
        </div>
    );
}
