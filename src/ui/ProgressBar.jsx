/**
 * Single-color progress bar (renamed/extended GlowBar). `segments`
 * optionally renders a multi-color "confidence" style bar (as seen in the
 * Figma Sprint Delivery Confidence redesign) instead of a single fill —
 * pass an array of { pct, color } that sum to <= 100.
 */
export function ProgressBar({ pct, color, height = 5, segments }) {
    if (segments && segments.length) {
        return (
            <div className="glow-bar glow-bar--segmented" style={{ height, borderRadius: height }}>
                {segments.map((seg, i) => (
                    <div
                        key={i}
                        style={{
                            width: `${Math.min(Math.max(seg.pct, 0), 100)}%`,
                            background: seg.color,
                            height: '100%',
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="glow-bar" style={{ height, borderRadius: height }}>
            <div
                className="glow-bar__fill"
                style={{
                    width: `${Math.min(Math.max(pct, 0), 100)}%`,
                    background: color,
                    borderRadius: height,
                    boxShadow: `0 0 7px ${color}55`,
                }}
            />
        </div>
    );
}
