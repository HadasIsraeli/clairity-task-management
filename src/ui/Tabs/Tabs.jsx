/**
 * Segmented tab control — extracted from the inline tab markup in TaskView.
 * `items` is [{ value, icon, label }]; `value`/`onChange` are controlled.
 */
export function Tabs({ items, value, onChange }) {
    return (
        <div className="task-tabs">
            {items.map((item) => (
                <button
                    key={item.value}
                    onClick={() => onChange(item.value)}
                    className={`task-tab${value === item.value ? ' task-tab--active' : ''}`}
                >
                    {item.icon && <i className={`ti ti-${item.icon}`} aria-hidden="true" />}
                    {item.label}
                </button>
            ))}
        </div>
    );
}
