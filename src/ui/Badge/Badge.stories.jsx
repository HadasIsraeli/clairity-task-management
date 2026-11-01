import { Badge } from './Badge';

const design = (node) => ({ design: { type: 'figma', url: `https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=${node}` } });

export default {
    title: 'UI Kit/Badge',
    component: Badge,
    tags: ['autodocs'],
    parameters: design('275-4329'),
};

export const Neutral = { args: { label: 'Infra', tone: 'neutral' } };
export const Teal = { args: { label: 'In Progress', tone: 'teal' } };
export const Indigo = { args: { label: 'Backend', tone: 'indigo' } };
export const Green = { args: { label: 'Active sprint', tone: 'green' } };
export const Red = { args: { label: 'Needs attention', tone: 'red' } };
export const Yellow = { args: { label: '7d left', tone: 'yellow' } };
export const Orange = { args: { label: 'DevOps', tone: 'orange' } };
export const CustomColor = { args: { label: 'Data', color: '#5a4fcf' } };

export const HighImpactSoft = {
    args: { label: 'High impact', tone: 'green', soft: true },
    parameters: design('706-10893'),
};
export const MediumImpactSoft = {
    args: { label: 'Medium impact', tone: 'yellow', soft: true },
    parameters: design('706-10893'),
};
export const Recommended = {
    args: { label: '✓ Recommended', tone: 'green', soft: true },
    parameters: design('706-18580'),
};
