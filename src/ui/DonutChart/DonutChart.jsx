import { C } from '../../styles/tokens';

/**
 * Hand-rolled SVG donut/ring chart — consistent with the rest of the design
 * system (no charting library). Renders `segments` ({ label, value, color })
 * as proportional arcs around the ring, a bold center label, and an optional
 * legend with per-segment counts.
 */
export function DonutChart({ segments = [], centerLabel, size = 120, thickness = 14, legend = true }) {
    const total = segments.reduce((sum, seg) => sum + seg.value, 0) || 1;
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;

    const arcs = segments.reduce((acc, seg) => {
        const prevRunning = acc.length ? acc[acc.length - 1].running : 0;
        const portion = seg.value / total;
        const dash = portion * circumference;
        const offset = -prevRunning * circumference;
        acc.push({ ...seg, dash, offset, running: prevRunning + portion });
        return acc;
    }, []);

    return (
        <div className="flex-center" style={{ gap: 20 }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Task status breakdown">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={thickness}
                />
                {arcs.map((seg) => (
                    <circle
                        key={seg.label}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth={thickness}
                        strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
                        strokeDashoffset={seg.offset}
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                        strokeLinecap="butt"
                    />
                ))}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={size * 0.18}
                    fontWeight={700}
                    fill={C.textPri}
                >
                    {centerLabel}
                </text>
            </svg>

            {legend && (
                <div className="flex-column stack-gap-8">
                    {segments.map((seg) => (
                        <div key={seg.label} className="flex-center" style={{ gap: 8 }}>
                            <span
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: seg.color,
                                    flexShrink: 0,
                                }}
                            />
                            <span style={{ fontSize: 13, color: C.textSec, flex: 1 }}>{seg.label}</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: C.textPri, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '1px 8px' }}>
                                {seg.value}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
