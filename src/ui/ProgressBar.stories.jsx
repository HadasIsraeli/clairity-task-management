import { ProgressBar } from './ProgressBar';
import { C } from '../styles/tokens';

export default {
    title: 'UI Kit/ProgressBar',
    component: ProgressBar,
    tags: ['autodocs'],
};

export const Default = {
    args: { pct: 68, color: C.teal, height: 8 },
};

export const LowProgress = {
    args: { pct: 32, color: C.red, height: 8 },
};

export const Segmented = {
    args: {
        height: 8,
        segments: [
            { pct: 25, color: C.red },
            { pct: 25, color: C.orange },
            { pct: 25, color: C.yellow },
            { pct: 25, color: C.green },
        ],
    },
};
