import PropTypes from 'prop-types';
import { C } from '../../styles/tokens';

/**
 * Hand-rolled SVG donut/ring chart (no charting library). Renders `segments`
 * ({ label, value, color }) as proportional arcs starting at 12 o'clock and
 * running clockwise, with a centered label. Legends are composed by the caller
 * (see StatusDonut) so each screen can match its own Figma legend.
 *
 * `segmentGap` (px along the ring) and `opacity` match the Figma "Doughnut Chart"
 * asset (0.7 opacity, small gaps between segments).
 */
export function DonutChart({
    segments = [],
    centerLabel,
    centerColor = C.textPri,
    centerFontSize,
    size = 120,
    thickness = 14,
    segmentGap = 0,
    opacity = 1,
    ariaLabel = 'Chart',
}) {
    const total = segments.reduce((sum, seg) => sum + seg.value, 0) || 1;
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;

    const arcs = segments.reduce((acc, seg) => {
        const prevRunning = acc.length ? acc[acc.length - 1].running : 0;
        const portion = seg.value / total;
        const dash = Math.max(portion * circumference - segmentGap, 0.01);
        const offset = -(prevRunning * circumference + segmentGap / 2);
        acc.push({ ...seg, dash, offset, running: prevRunning + portion });
        return acc;
    }, []);

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={ariaLabel}>
            <g opacity={opacity}>
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
                    />
                ))}
            </g>
            {centerLabel != null && (
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={centerFontSize ?? size * 0.18}
                    fontWeight={700}
                    fill={centerColor}
                >
                    {centerLabel}
                </text>
            )}
        </svg>
    );
}

DonutChart.propTypes = {
    segments: PropTypes.arrayOf(
        PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.number.isRequired, color: PropTypes.string.isRequired }),
    ),
    centerLabel: PropTypes.node,
    centerColor: PropTypes.string,
    centerFontSize: PropTypes.number,
    size: PropTypes.number,
    thickness: PropTypes.number,
    segmentGap: PropTypes.number,
    opacity: PropTypes.number,
    ariaLabel: PropTypes.string,
};
