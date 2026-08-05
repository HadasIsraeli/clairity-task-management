// Kept for backward compatibility — the UI kit tokens (src/ui/tokens.js /
// src/ui/tokens.css) are now the single source of truth for color and
// typography values. This file just re-exports them so existing imports
// of `C` / `F` from `constants/theme` keep working.
export { C, F } from '../ui/tokens';
