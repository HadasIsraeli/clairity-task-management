// Thin compatibility shim over the shared UI kit Badge component, kept so
// existing `<Pill label color small />` call sites keep working.
import { Badge } from '../ui/Badge';

export function Pill({ label, color, dim, small }) {
    return <Badge label={label} color={color} dim={dim} size={small ? 'sm' : 'md'} />;
}
