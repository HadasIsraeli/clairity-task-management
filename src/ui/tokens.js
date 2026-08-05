// JS mirror of src/ui/tokens.css for call sites that still need raw values
// for inline styles (canvas-like gradients, dynamic box-shadows, etc).
// The CSS custom properties in tokens.css remain the source of truth —
// keep these in sync if a token changes.
export const C = {
    bg: '#070D19',
    bgNav: '#0A1120',
    card: '#0F1D36',
    cardAlt: '#132038',
    border: 'rgba(255,255,255,0.08)',
    borderMid: 'rgba(255,255,255,0.12)',
    shadow: '0 1px 3px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)',
    teal: '#2BB0E6',
    tealDim: 'rgba(43,176,230,0.10)',
    indigo: '#5A4FCF',
    indigoDim: 'rgba(90,79,207,0.12)',
    green: '#27C99A',
    greenDim: 'rgba(39,201,154,0.10)',
    red: '#F0506A',
    redDim: 'rgba(240,80,106,0.10)',
    yellow: '#F0C040',
    yellowDim: 'rgba(240,192,64,0.10)',
    orange: '#F07B3C',
    orangeDim: 'rgba(240,123,60,0.10)',
    textPri: '#E4EDFF',
    textSec: '#96AFCC',
    textTer: '#587090',
};

export const F = `'Afacad','Inter',system-ui,sans-serif`;

export const RADIUS = { sm: 6, md: 8, lg: 10, xl: 12, pill: 999 };

export const SPACE = { 1: 4, 2: 6, 3: 8, 4: 10, 5: 12, 6: 14, 7: 16, 8: 18, 9: 22 };

// Named semantic colors, useful when a component needs to look a color
// up by name (e.g. from data) rather than importing C directly.
export const TONE = {
    teal: { color: C.teal, dim: C.tealDim },
    indigo: { color: C.indigo, dim: C.indigoDim },
    green: { color: C.green, dim: C.greenDim },
    red: { color: C.red, dim: C.redDim },
    yellow: { color: C.yellow, dim: C.yellowDim },
    orange: { color: C.orange, dim: C.orangeDim },
    neutral: { color: C.textSec, dim: 'rgba(255,255,255,0.06)' },
};
