export function Avatar({ initials, color, size = 28 }) {
    return (
        <div
            className="avatar"
            style={{
                width: size,
                height: size,
                background: color + '22',
                border: `1.5px solid ${color}44`,
                fontSize: size * 0.32,
                color,
            }}
        >
            {initials}
        </div>
    );
}