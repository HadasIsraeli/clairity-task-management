import { fn } from 'storybook/test';
import { Button } from './Button';
import { C } from '../../styles/tokens';

export default {
    title: 'UI Kit/Button',
    component: Button,
    tags: ['autodocs'],
};

export const Ghost = {
    args: { label: 'Action', onClick: fn() },
};

export const Recommended = {
    args: { label: 'Primary action', variant: 'recommended', tone: C.teal, arrow: true, onClick: fn() },
};

export const Solid = {
    args: { label: 'Confirm', variant: 'solid', tone: C.indigo, onClick: fn() },
};

export const Small = {
    args: { label: 'Reduce scope', variant: 'ghost', size: 'sm', arrow: true, onClick: fn() },
};
