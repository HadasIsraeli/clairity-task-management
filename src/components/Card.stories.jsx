import { Card } from './Card';
import { C } from '../constants/theme';

export default {
    title: 'Components/Card',
    component: Card,
};

export const Default = {
    args: {
        children: <div style={{ padding: 20, color: '#fff' }}>Card Content</div>,
        style: { width: 300 }
    },
};

export const Glowing = {
    args: {
        children: <div style={{ padding: 20, color: '#fff' }}>Glowing card</div>,
        style: { width: 300 },
        glow: C.indigo
    },
};