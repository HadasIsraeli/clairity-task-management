import { Card } from '../Card';

/** Small metric tile — extracted from the inline markup in Dashboard's stat row. */
export function StatCard({ label, value, color, icon }) {
    return (
        <Card padding="lg">
            <div className="flex-center" style={{ gap: 7, marginBottom: 8 }}>
                {icon && <i className={`ti ti-${icon}`} style={{ fontSize: 14, color }} aria-hidden="true" />}
                <span className="title-sm text-ter" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {label}
                </span>
            </div>
            <span style={{ fontSize: 30, fontWeight: 700, color }}>{value}</span>
        </Card>
    );
}
