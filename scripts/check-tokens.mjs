// Fails if src/styles/tokens.js (deprecated JS mirror) drifts from tokens.css.
import { readFileSync } from 'node:fs';
import { C } from '../src/styles/tokens.js';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const norm = (v) => v.trim().toLowerCase().replace(/\s+/g, '');

// JS key -> CSS custom property
const map = {
    bg: 'clr-bg', bgNav: 'clr-bg-nav', card: 'clr-card', cardAlt: 'clr-card-alt',
    border: 'clr-border', borderMid: 'clr-border-mid', shadow: 'shadow-card',
    teal: 'clr-teal', tealDim: 'clr-teal-dim', indigo: 'clr-indigo', indigoDim: 'clr-indigo-dim',
    violet: 'clr-violet', green: 'clr-green', greenDim: 'clr-green-dim', red: 'clr-red',
    redDim: 'clr-red-dim', yellow: 'clr-yellow', yellowDim: 'clr-yellow-dim', orange: 'clr-orange',
    orangeDim: 'clr-orange-dim', textPri: 'clr-text-pri', textSec: 'clr-text-sec', textTer: 'clr-text-ter',
};

let bad = 0;
for (const [key, prop] of Object.entries(map)) {
    const m = css.match(new RegExp(`--${prop}:\s*([^;]+);`));
    if (!m) { console.error(`missing --${prop} in tokens.css`); bad++; continue; }
    if (norm(m[1]) !== norm(C[key])) { console.error(`drift: C.${key}=${C[key]} vs --${prop}=${m[1].trim()}`); bad++; }
}
if (bad) process.exit(1);
console.log('tokens.css and tokens.js are in sync');
