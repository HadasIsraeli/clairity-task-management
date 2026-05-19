export function GlowBar({ pct, color, height = 5 }) {
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