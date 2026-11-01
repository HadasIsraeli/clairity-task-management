import { StatCard } from './StatCard';
import { C } from '../styles/tokens';

export default {
    title: 'UI Kit/StatCard',
    component: StatCard,
    tags: ['autodocs'],
};

export const Default = {
    args: { label: 'Total tasks', value: 14, color: C.textPri, icon: 'list-check' },
};

export const AtRisk = {
    args: { label: 'At risk', value: 2, color: C.red, icon: 'alert-triangle' },
};
