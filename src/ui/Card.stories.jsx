import { Card } from './Card';
import { C } from './tokens';

export default {
    title: 'UI Kit/Card',
    component: Card,
    tags: ['autodocs'],
};

export const Default = {
    args: {
        children: <div style={{ padding: 20, color: '#fff' }}>Card Content</div>,
        style: { width: 300 },
    },
};

export const Padded = {
    args: {
        padding: 'lg',
        children: <div style={{ color: '#fff' }}>Uses the card-padding utility</div>,
        style: { width: 300 },
    },
};

export const Glowing = {
    args: {
        children: <div style={{ padding: 20, color: '#fff' }}>Glowing card</div>,
        style: { width: 300 },
        glow: C.indigo,
    },
};
