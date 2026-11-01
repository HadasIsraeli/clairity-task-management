import { Badge } from './Badge';
import { C } from '../../styles/tokens';

export default {
    title: 'UI Kit/Badge',
    component: Badge,
    tags: ['autodocs'],
};

export const Tone = {
    args: { label: 'In Progress', tone: 'teal' },
};

export const Small = {
    args: { label: 'High', tone: 'red', size: 'sm' },
};

export const CustomColor = {
    args: { label: 'Backend', color: C.indigo, size: 'sm' },
};
