import { GlowBar } from './GlowBar';
import { C } from '../constants/theme';

export default {
    title: 'Components/GlowBar',
    component: GlowBar,
    tags: ['autodocs'],
};

export const Default = {
    args: {
        pct: 68,
        color: C.teal,
        height: 8,
    },
};

export const LowProgress = {
    args: {
        pct: 32,
        color: C.red,
        height: 8,
    },
};
