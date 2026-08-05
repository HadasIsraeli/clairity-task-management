// Thin compatibility shim over the shared UI kit Button component.
import { Button } from '../ui/Button';
import { C } from '../ui/tokens';

export function CtaButton({ label, recommended, className = '', ...props }) {
    return (
        <Button
            {...props}
            label={label}
            arrow
            variant={recommended ? 'recommended' : 'ghost'}
            tone={C.teal}
            className={className}
        />
    );
}
