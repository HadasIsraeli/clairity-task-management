// DEPRECATED JS mirror of src/styles/tokens.css, kept only for call sites that
// still build inline styles from raw values (string-concatenated alpha, etc).
// tokens.css is the source of truth; `npm run check:tokens` fails if the two
// drift. This file is deleted once components finish moving to CSS Modules.
export const C = {
    bg: '#070d19',
    bgNav: '#0a1120',
    card: '#0d1729',
    cardAlt: '#132038',
    border: 'rgba(255,255,255,0.08)',
    borderMid: 'rgba(255,255,255,0.12)',
    shadow: '0 4px 4px rgba(0,0,0,0.05)',
    teal: '#2bb0e6',
    tealDim: 'rgba(43,176,230,0.1)',
    indigo: '#5a4fcf',
    indigoDim: 'rgba(90,79,207,0.12)',
    violet: '#7163ff',
    green: '#27c99a',
    greenDim: 'rgba(39,201,154,0.1)',
    red: '#f0506a',
    redDim: 'rgba(240,80,106,0.1)',
    yellow: '#f0c040',
    yellowDim: 'rgba(240,192,64,0.1)',
    orange: '#f07b3c',
    orangeDim: 'rgba(240,123,60,0.1)',
    greenSoft: '#1fa17b',
    yellowSoft: '#c09a33',
    tealSoft: '#228db8',
    redSoft: '#c04055',
    orangeSoft: '#c06230',
    textPri: '#f4f6f8',
    textSec: '#96afcc',
    textTer: '#587090',
};

export const F = `'Afacad','Inter',system-ui,sans-serif`;

export const RADIUS = { sm: 6, md: 8, lg: 10, xl: 12, tag: 20, pill: 999 };

export const SPACE = { 1: 4, 2: 6, 3: 8, 4: 10, 5: 12, 6: 14, 7: 16, 8: 18, 9: 22 };

// Semantic tones. `fill`/`stroke` are the tag fill (9%) and stroke (16%) from Figma.
export const TONE = {
    teal: { color: C.teal, dim: C.tealDim, fill: 'rgba(43,176,230,0.09)', stroke: 'rgba(43,176,230,0.16)' },
    indigo: { color: C.indigo, dim: C.indigoDim, fill: 'rgba(90,79,207,0.09)', stroke: 'rgba(90,79,207,0.16)' },
    green: { color: C.green, dim: C.greenDim, fill: 'rgba(39,201,154,0.09)', stroke: 'rgba(39,201,154,0.16)' },
    red: { color: C.red, dim: C.redDim, fill: 'rgba(240,80,106,0.09)', stroke: 'rgba(240,80,106,0.16)' },
    yellow: { color: C.yellow, dim: C.yellowDim, fill: 'rgba(240,192,64,0.09)', stroke: 'rgba(240,192,64,0.16)' },
    orange: { color: C.orange, dim: C.orangeDim, fill: 'rgba(240,123,60,0.09)', stroke: 'rgba(240,123,60,0.16)' },
    neutral: { color: C.textSec, dim: 'rgba(255,255,255,0.06)', fill: 'rgba(150,175,204,0.09)', stroke: 'rgba(150,175,204,0.16)' },
};
