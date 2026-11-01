import { forwardRef, useEffect, useRef, useState } from 'react';
import { Badge, C, ProgressBar } from '../../ui/index';
import { SPRINT } from '../../data/fixtures/tasks';
import { callClaude, SYS_DELIVERY } from '../../lib/claude';
import { useSession } from '../../state/SessionContext';
import lampIcon from '../../assets/figma/lamp-icon.svg';
import sparkleIcon from '../../assets/figma/sparkle-icon.svg';
import chevronIcon from '../../assets/figma/chevron-icon.svg';

// Fixed-color confidence gauge segments — mirrors the Figma "Sprint Delivery
// Confidence" bar, which reads left (danger) to right (healthy) regardless
// of the live score, with the score itself controlling how far it's filled.
const CONFIDENCE_SEGMENTS = [
    { pct: 25, color: C.red },
    { pct: 25, color: C.orange },
    { pct: 25, color: C.yellow },
    { pct: 25, color: C.green },
];

// Real "Delivery Confidence Reasoning" breakdown pulled from Figma
// (node 316:4284), one list per session-phase checkpoint (52% entry /
// 69% in-progress / 72% complete). tone maps to the Badge palette:
// critical/high -> red/orange, medium -> yellow, positive -> green.
const REASONING = {
    entry: [
        { tone: 'red', tag: 'Critical Risk', title: 'Team member unavailable', detail: 'Yoni Ben-David is sick - Day 2. TM-112 auth task unattended', impact: '-14%' },
        { tone: 'red', tag: 'Critical Risk', title: 'Blocked dependency', detail: 'TM-119 cannot begin until TM-107 (Platform Team) is started', impact: '-13%' },
        { tone: 'orange', tag: 'High Risk', title: 'Task over AI estimate', detail: 'TM-112 is 125% over its AI estimate with 3 steps remaining', impact: '-10%' },
        { tone: 'yellow', tag: 'Medium Risk', title: 'Sprint window pressure', detail: '7 days remaining with current workload requiring full team capacity', impact: '-6%' },
        { tone: 'yellow', tag: 'Medium Risk', title: 'Unresolved scope', detail: 'TM-112 scope not aligned between estimate and actual complexity', impact: '-5%' },
        { tone: 'green', tag: 'Positive', title: 'Developer availability', detail: '3 of 5 team members have available bandwidth today', impact: '+4%' },
        { tone: 'green', tag: 'Positive', title: 'Review pipeline clear', detail: 'No tasks stuck in review or QA, TM-115 on track to merge today', impact: '+2%' },
    ],
    'in-progress': [
        { tone: 'yellow', tag: 'Medium Risk', title: 'Blocked dependency', detail: 'TM-119 cannot begin until TM-107 (Platform Team) is started', impact: '-13%' },
        { tone: 'yellow', tag: 'Medium Risk', title: 'Sprint window pressure', detail: '7 days remaining with current workload requiring full team capacity', impact: '-6%' },
        { tone: 'yellow', tag: 'Medium Risk', title: 'Unresolved scope', detail: 'TM-112 scope not aligned between estimate and actual complexity', impact: '-5%' },
        { tone: 'yellow', tag: 'Medium Risk', title: 'Owner availability - mitigated', detail: 'TM-112 coverage addressed, logged action - "Reassign to Gali"', impact: '-4%' },
        { tone: 'yellow', tag: 'Medium Risk', title: 'Task over AI estimate', detail: 'TM-112 is 125% over its AI estimate with 3 steps remaining', impact: '-3%' },
        { tone: 'green', tag: 'Positive', title: 'Developer availability', detail: '3 of 5 team members have available bandwidth today', impact: '+4%' },
        { tone: 'green', tag: 'Positive', title: 'Review pipeline moving', detail: 'No tasks stuck in review or QA, TM-115 on track to merge today', impact: '+3%' },
    ],
    complete: [
        { tone: 'orange', tag: 'High Risk', title: 'Blocked dependency - mitigated', detail: 'TM-119 cannot begin until TM-107 (Platform Team) is started', impact: '-10%' },
        { tone: 'yellow', tag: 'Medium Risk', title: 'Sprint window pressure', detail: '7 days remaining with current workload requiring full team capacity', impact: '-6%' },
        { tone: 'yellow', tag: 'Medium Risk', title: 'Unresolved scope', detail: 'TM-112 scope not aligned between estimate and actual complexity', impact: '-5%' },
        { tone: 'yellow', tag: 'Medium Risk', title: 'Owner availability - mitigated', detail: 'TM-112 coverage addressed, logged action - "Reassign to Gali"', impact: '-4%' },
        { tone: 'yellow', tag: 'Medium Risk', title: 'Task over AI estimate', detail: 'TM-112 is 125% over its AI estimate with 3 steps remaining', impact: '-3%' },
        { tone: 'green', tag: 'Positive', title: 'Developer availability', detail: '3 of 5 team members have available bandwidth today', impact: '+4%' },
        { tone: 'green', tag: 'Positive', title: 'Review pipeline moving', detail: 'No tasks stuck in review or QA, TM-115 on track to merge today', impact: '+3%' },
    ],
};

const REASONING_LABEL_COLOR = { entry: '#7163ff', 'in-progress': '#5a4fcf', complete: '#5a4fcf' };

export const DeliveryWidget = forwardRef(function DeliveryWidget(_props, ref) {
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
    const reasoningItems = REASONING[sessionPhase] || REASONING.entry;

    return (
        <div ref={ref} className="delivery-widget" style={{ boxShadow: data ? `0 0 0 1px ${scoreColor}10, 0 4px 20px ${scoreColor}06` : 'none' }}>
            <div className="delivery-widget__header">
                <span className="title-sm text-ter" style={{ letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                    Sprint Delivery Confidence
                </span>
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
                        <div className="delivery-widget__caption">
                            <img src={lampIcon} alt="" className="delivery-widget__caption-icon" />
                            Calculated from {reasoningItems.length} operational factors across team capacity, dependencies, and task health
                        </div>
                    </div>
                </div>
            )}

            {data && (
                <button
                    type="button"
                    className={`delivery-widget__reasoning-toggle${reasoningOpen ? ' delivery-widget__reasoning-toggle--open' : ''}`}
                    onClick={() => setReasoningOpen((open) => !open)}
                    aria-expanded={reasoningOpen}
                >
                    <img src={sparkleIcon} alt="" className="delivery-widget__reasoning-icon" />
                    <span style={{ color: REASONING_LABEL_COLOR[sessionPhase] || REASONING_LABEL_COLOR.entry }}>Delivery Confidence Reasoning</span>
                    <img
                        src={chevronIcon}
                        alt=""
                        className={`delivery-widget__reasoning-chevron${reasoningOpen ? ' delivery-widget__reasoning-chevron--open' : ''}`}
                    />
                </button>
            )}

            {data && reasoningOpen && (
                <div className="delivery-widget__reasoning-body">
                    {reasoningItems.map((item) => (
                        <div key={item.title} className="delivery-widget__reasoning-row">
                            <Badge label={item.tag} tone={item.tone} size="sm" />
                            <div className="delivery-widget__reasoning-text">
                                <p className="delivery-widget__reasoning-title">{item.title}</p>
                                <p className="delivery-widget__reasoning-detail">{item.detail}</p>
                            </div>
                            <span className="delivery-widget__reasoning-impact" style={{ color: item.impact.startsWith('+') ? C.green : item.tone === 'yellow' ? C.yellow : item.tone === 'orange' ? C.orange : C.red }}>
                                {item.impact}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});
